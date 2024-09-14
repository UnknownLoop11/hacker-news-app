import PropTyes from "prop-types";

const Card = ({ title, author, url, time, score }) => {
  return (
    <div className="card">
      <div className="card-content">
        <a href={url} target="_blank" className="card-title">
          {title}
        </a>
        <div className="card-metadata">
          <div className="card-author">by {author}</div>
          <div className="card-timestamp">- Published {time}</div>
        </div>
      </div>
      <div className="card-scoretab">
        Score <br />
        {score}
      </div>
    </div>
  );
};
Card.propTypes = {
  title: PropTyes.string.isRequired,
  author: PropTyes.string.isRequired,
  url: PropTyes.string.isRequired,
  time: PropTyes.string.isRequired,
  score: PropTyes.number.isRequired,
};

export default Card;
