import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import NewsCard from "../components/NewsCard";
import api from "../services/api";

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formatted = category.charAt(0).toUpperCase() + category.slice(1);
        const { data } = await api.get(`/news/public?category=${formatted}`);
        setItems(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      <PublicNavbar />
      <main className="container page-space">
        <div className="section-head">
          <h1>{category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
          <p className="muted">Latest stories in this category</p>
        </div>

        {loading ? <p className="panel">Loading category news...</p> : null}
        {!loading && items.length === 0 ? <p className="panel">No published stories in this category yet.</p> : null}

        <div className="grid">
          {items.map((item) => (
            <NewsCard key={item._id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
