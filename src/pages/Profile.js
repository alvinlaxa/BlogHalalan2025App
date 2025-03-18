import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="container mt-4">User not found or not logged in.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2>User Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.isAdmin ? "Admin" : "Regular User"}</p>
      </div>
    </div>
  );
};

export default Profile;
