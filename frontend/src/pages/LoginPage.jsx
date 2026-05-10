import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "admin@example.com", password: "admin123" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="auth-wrap">
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Admin Login</h1>
        <p>Access your editorial desk and manage posts.</p>
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login to Dashboard</button>
      </form>
    </main>
  );
};

export default LoginPage;
