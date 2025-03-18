// src/components/CreatePost.js
import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/posts", { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTitle("");
      setContent("");
      if (onPostCreated) onPostCreated(); // Refresh posts dynamically
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
