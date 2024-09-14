import { useEffect, useState } from "react";
import Card from "./components/Card";
import { fetchTopStories } from "./services";
import moment from "moment"; // helper library to format time

const App = () => {
  const [stories, setStories] = useState([]); // state to store news data
  const [loading, setLoading] = useState(false); // state to toggle loading element

  // function to fetch stories data (top stories) and update states
  const fetchStories = async () => {
    setLoading(true);
    await fetchTopStories()
      .then((data) => {
        setStories(data);
      })
      .catch((error) => {
        alert("Error fetching data" + error);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchStories(); // fetch stories data on component mount
  }, []);

  return (
    <div className="container">
      {/* HEADER  */}
      <div className="head-text">
        Top 10 Stories (Live Feed) <br />{" "}
        <span className="helper-text">
          Refresh the page to get the updated list of new stories.
        </span>
      </div>

      {/* LOADING ELEMENT */}
      {loading && <div className="loading">Loading...</div>}

      {/* STORY CARDS */}
      {stories.map((story, idx) => {
        return (
          <Card
            key={idx}
            title={story.title}
            author={story.by}
            url={story.url}
            time={moment(story.time).fromNow()}
            score={story.score}
          />
        );
      })}

      {/* FOOTER */}
      <div className="footer">
        © 2024 | Developed by <span style={{ fontWeight: "bold" }}>Mathew</span>
      </div>
    </div>
  );
};

export default App;
