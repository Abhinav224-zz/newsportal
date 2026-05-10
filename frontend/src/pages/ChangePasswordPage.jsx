import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import api from "../services/api";

const ChangePasswordPage = () => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const { data } = await api.put("/user/change-password", form);
      setMessage(data.message);
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed");
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="container page-space">
        <h1>Change Password</h1>
        <form className="password-form" onSubmit={onSubmit}>
          <input
            type="password"
            placeholder="Current password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="New password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
          <button type="submit">Update Password</button>
          {message && <p>{message}</p>}
        </form>
      </main>
    </>
  );
};

export default ChangePasswordPage;
