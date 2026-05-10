import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PublicNavbar from "../components/PublicNavbar";
import NewsCard from "../components/NewsCard";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get("/news/public");
        setNews(data);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const hero = news[0];
  const general = news.slice(1, 7);

  return (
    <>
      <PublicNavbar />
      <main className="container page-space">
        <section className="hero">
          <p className="muted">Trusted updates, clear reporting</p>
          <h1>Today&apos;s Top Headlines</h1>
          <p className="lead">Stay informed with curated stories across politics, technology, health, sports and business.</p>

          {loading && <p className="panel">Loading latest stories...</p>}

          {!loading && hero ? (
            <div className="hero-card">
              <img src={hero.coverImage} alt={hero.title} />
              <div>
                <span className="badge">{hero.category}</span>
                <h2>{hero.title}</h2>
                <p>{hero.summary}</p>
                <Link to={`/news/${hero.slug}`} className="link-btn">Read Hero Story</Link>
              </div>
            </div>
          ) : null}

          {!loading && !hero ? <p className="panel">No published news yet. Publish a post from admin panel.</p> : null}
        </section>

        <section>
          <div className="section-head">
            <h2>General Section</h2>
            <Link to="/category/world" className="text-link">Explore all categories</Link>
          </div>

          <div className="grid">
            {general.map((item) => (
              <NewsCard key={item._id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
