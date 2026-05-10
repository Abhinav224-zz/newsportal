import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import api from "../services/api";
import { categories, statuses } from "../utils/constants";

const emptyForm = {
  title: "",
  category: "Technology",
  summary: "",
  content: "",
  coverImage: "",
  status: "Draft",
  scheduledAt: "",
};

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const loadPosts = async () => {
    const { data } = await api.get("/news/admin");
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === "All") return posts;
    return posts.filter((item) => item.status === activeTab);
  }, [activeTab, posts]);

  const counts = useMemo(() => {
    return statuses.reduce(
      (acc, status) => ({ ...acc, [status]: posts.filter((item) => item.status === status).length }),
      {}
    );
  }, [posts]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      ...form,
      scheduledAt: form.status === "Scheduled" ? form.scheduledAt : null,
    };

    if (editId) {
      await api.put(`/news/admin/${editId}`, payload);
      setMessage("Post updated successfully");
    } else {
      await api.post("/news/admin", payload);
      setMessage("Post created successfully");
    }

    setForm(emptyForm);
    setEditId(null);
    loadPosts();
  };

  const onEdit = (post) => {
    setEditId(post._id);
    setForm({
      title: post.title,
      category: post.category,
      summary: post.summary,
      content: post.content,
      coverImage: post.coverImage,
      status: post.status,
      scheduledAt: post.scheduledAt ? post.scheduledAt.slice(0, 16) : "",
    });
  };

  const onDelete = async (id) => {
    await api.delete(`/news/admin/${id}`);
    setMessage("Post deleted");
    loadPosts();
  };

  return (
    <>
      <AdminNavbar />
      <main className="container page-space">
        <div className="section-head">
          <h1>News Management</h1>
          <p className="muted">Create and manage your entire publishing workflow.</p>
        </div>

        <section className="stats-grid">
          <div className="stat-card"><h3>Total</h3><p>{posts.length}</p></div>
          {statuses.map((status) => (
            <div key={status} className="stat-card"><h3>{status}</h3><p>{counts[status]}</p></div>
          ))}
        </section>

        <form className="form-grid" onSubmit={onSubmit}>
          <h2>{editId ? "Edit Post" : "Create New Post"}</h2>
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((cat) => <option key={cat}>{cat}</option>)}
          </select>
          <input required placeholder="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          <textarea required placeholder="Full content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <input placeholder="Cover image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {statuses.map((st) => <option key={st}>{st}</option>)}
          </select>
          {form.status === "Scheduled" && (
            <input type="datetime-local" value={form.scheduledAt} onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })} />
          )}
          <div className="inline-actions">
            <button type="submit">{editId ? "Update Post" : "Create Post"}</button>
            {editId ? <button type="button" className="ghost-btn" onClick={() => { setEditId(null); setForm(emptyForm); }}>Cancel Edit</button> : null}
          </div>
          {message ? <p className="success">{message}</p> : null}
        </form>

        <h2>All Posts</h2>
        <div className="tabs">
          {["All", ...statuses].map((tab) => (
            <button key={tab} type="button" className={activeTab === tab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td><span className={`status-pill status-${post.status.toLowerCase()}`}>{post.status}</span></td>
                  <td>{post.category}</td>
                  <td>
                    <button type="button" onClick={() => onEdit(post)}>Edit</button>
                    <button type="button" className="danger" onClick={() => onDelete(post._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="center">No posts in this tab yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
