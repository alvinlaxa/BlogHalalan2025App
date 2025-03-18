// src/components/PostCard.js
import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ post, onPostDeleted }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        await api.delete(`/posts/${post._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (onPostDeleted) onPostDeleted(); // Refresh posts dynamically
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content.substring(0, 100)}...</p>
        <p className="text-muted">By: {post.author?.username || "Anonymous"}</p>
        <Link to={`/post/${post._id}`} className="btn btn-primary">Read More</Link>
        {user && user._id === post.author._id && (
          <button onClick={handleDelete} className="btn btn-danger ms-2">Delete</button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
