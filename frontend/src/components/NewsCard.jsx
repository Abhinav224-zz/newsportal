import { Link } from "react-router-dom";

const NewsCard = ({ item }) => {
  return (
    <article className="card">
      <img src={item.coverImage} alt={item.title} className="card-img" />
      <div className="card-body">
        <span className="badge">{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <Link to={`/news/${item.slug}`} className="link-btn">
          Read full story
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
