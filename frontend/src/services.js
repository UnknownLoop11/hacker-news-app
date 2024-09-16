// VITE_API_ENDPOINT is an environment variable that is set in the .env file (for production)
// http://localhost:8000 is the default endpoint for development environment, if VITE_API_ENDPOINT is not set
// Edit the development endpoint to match the port number of your FastAPI server
const apiEndpoint =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:8000";

// Test the connection to the Backend server (for debugging/dev environment)
export const pingServer = async () => {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// Fetch top stories from the Hacker News API
export const fetchTopStories = async () => {
  try {
    const response = await fetch(`${apiEndpoint}/top-stories`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Error fetching data" + error);
  }
};
