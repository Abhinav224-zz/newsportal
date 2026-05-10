import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import api from "../services/api";

const SingleFeedPage = () => {
  const { slug } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      const { data } = await api.get(`/news/public/${slug}`);
      setItem(data);
    };
    fetchStory();
  }, [slug]);

  if (!item) {
    return (
      <>
        <PublicNavbar />
        <main className="container page-space">
          <p className="panel">Loading full story...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <PublicNavbar />
      <main className="container page-space single">
        <img src={item.coverImage} alt={item.title} className="single-img" />
        <div className="single-meta">
          <span className="badge">{item.category}</span>
          <h1>{item.title}</h1>
          <p className="summary">{item.summary}</p>
        </div>
        <article className="story-content">{item.content}</article>
      </main>
    </>
  );
};

export default SingleFeedPage;
