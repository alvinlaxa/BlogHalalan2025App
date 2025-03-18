// src/pages/Home.js
import React, { useEffect, useState } from "react";
import api from "../api";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts(); // Refresh posts when a new one is created
  };

  return (
    <div>
      <Hero onPostCreated={handlePostCreated} />
      <div className="container mt-4">
        <h1>Latest Posts</h1>
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <PostCard post={post} onPostDeleted={fetchPosts} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
