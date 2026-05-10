import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import api from "../services/api";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await api.get("/user/me");
      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <>
      <AdminNavbar />
      <main className="container page-space">
        <h1>My Profile</h1>
        {profile && (
          <div className="profile-card">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default ProfilePage;
