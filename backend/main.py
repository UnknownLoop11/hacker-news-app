import time
import datetime  # datetime to convert Unix timestamp to human-readable time format
import asyncio  # asyncio to make async requests concurrently
import httpx  # httpx to make async requests
# Importing FastAPI for initializing the app and Request to get the request object
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse  # JSONResponse to return JSON response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

HN_API_URL = "https://hacker-news.firebaseio.com/v0/"


def convert_time(time_stamp):
    """Converts Unix timestamp to human-readable time format."""
    return datetime.datetime.fromtimestamp(time_stamp).strftime('%Y-%m-%d %H:%M:%S')



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Defined a home route to check the status of the Backend API
@app.get("/")
async def root():
    return {"message": "Backend is up and running"}


# Middleware to check the status of the Hacker News API
# If the API is down, it will return a 503 Service Unavailable response
# Else it will call the next route and calculate the processing time of the request
# and added it to the response headers
@app.middleware("http")
async def check_hn_api_status(request: Request, call_next):
    start_time = time.time()

    async with httpx.AsyncClient() as client:
        hn_response = await client.get(HN_API_URL + "topstories.json")

    if hn_response.status_code != 200:
        return JSONResponse(content={"message": "Hacker News API is down"}, status_code=503)

    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# Route to get the top 10 stories from Hacker News API
@app.get("/top-stories")
async def get_top_stories():
    top_stories = []

    # Using httpx to make async requests and asyncio.gather to allow making multiple requests concurrently
    async with httpx.AsyncClient() as client:
        response = await client.get(HN_API_URL + "topstories.json")
        top_stories_ids = response.json()[:10]

        tasks = [client.get(HN_API_URL + f"item/{story_id}.json") for story_id in top_stories_ids]

        responses = await asyncio.gather(*tasks)

        # Extracting the required fields from the response
        # Even added fallback placeholders values if the fields are missing
        for response in responses:
            story = response.json()
            top_stories.append({
                "title": story.get('title', '(Untitled)'),
                "url": story.get('url', ''),
                "by": story.get('by', 'unknown author'),
                "score": story.get('score', 'unavailable'),
                "time": convert_time(story.get('time')) or 'unavailable',
            })

    return JSONResponse(content=top_stories)
