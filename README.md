# Hacker-News-app

#### Displays top 10 new live stories from Hacker News API.

### Features
- Interactive and Informative UI elements.
- Users can visit the official story page by clicking the story title.
- Users can view the author and the time the story is published.
- By refreshing the page the stories feed will be updated and fetches the latest top new stories.

#### Technologies Used: 
- **Frontend** - React.js and 'moment'(for formatting time)
- **Backend** - FastAPI with external API service 'Hacker News API'
- **Hacker News API** - `https://hacker-news.firebaseio.com/v0/`

<hr />

### To Run the app locally -

Requirements:
- Install the following programs before proceeding with the next steps (ignore if already installed)
- python v3.11 ([Installation guide](https://realpython.com/installing-python/))
- node v20.10.0 ([Installation guide](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/))

#### Steps -
- open `cmd` or `terminal`.
- clone the repository - `git clone https://github.com/UnknownLoop11/hacker-news-app.git`
- navigate to the project root folder `cd hacker-news-app`

**Set up backend -** 

Run these commands -
```
cd backend
```
- In Windows:
  ```
  python -m venv .venv
  .venv\Scripts\activate
  pip install -r requirements.txt
  ```
- In MacOS
  ```
  python3 -m venv .venv
  source ./venv/bin/activate
  pip install -r requirements.txt
  ```
Once all the requirements are installed now it's time to run the server.
- Run the backend server - `uvicorn main:app`
- You can see the following - `INFO: Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)` in your terminal.
- Copy the exact URL with port (ex.8000) and open it in the browser.
- You should see the following response in the browser -
  ```
  {"message": "Backend is up and running"}
  ```
- You can also test the backend API by visiting the `<your_localhost_url>/docs` endpoint.

Now, let the server run in the background.

**Set up frontend -**
- open a new Terminal window and navigate to project root folder `hacker-news-app`

Run these commands - 
```
cd frontend
npm install
```
Once all the dependencies are installed, create a `.env` file in the `frontend/` directory.
- So, if the backend server is running on `port:8000`, you can skip the next steps and go ahead to run the frontend development server.
- Open the `.env` file, and create a new variable named `VITE_API_ENDPOINT=<backend_url>`
- Replace the `<backend_url>` with the backend server URL running in the background.

**Run the frontend server -**

```
npm run dev
```
You shall see something like this:
```
 VITE v5.4.5  ready in 548 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Just Copy/Paste the Local URL into the browser. And the webpage will be visible to you.

<hr />

<p style="text-align:end;">Clean code always looks like it was written by someone who cares. — Robert C. Martin</p>








