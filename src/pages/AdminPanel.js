import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    } else {
      fetchPosts();
    }
  }, [user, navigate]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await api.get(`/comments/${postId}`); // Fetch comments by post ID
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${postId}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      }
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await api.delete(`/comments/${commentId}`);
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: prevComments[postId].filter((comment) => comment._id !== commentId),
        }));
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel - Manage Posts and Comments</h2>

      <h3 className="mt-4">All Posts</h3>
      <ul className="list-group">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id} className="list-group-item">
              <strong>{post.title}</strong> - By: {post.author?.username || "Unknown"}
              <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeletePost(post._id)}>
                Delete Post
              </button>
              <button className="btn btn-info btn-sm ms-2" onClick={() => fetchComments(post._id)}>
                View Comments
              </button>

              {comments[post._id] && (
                <ul className="list-group mt-2">
                  {comments[post._id].map((comment) => (
                    <li key={comment._id} className="list-group-item d-flex justify-content-between">
                      <span><strong>{comment.author?.username || "Anonymous"}:</strong> {comment.text}</span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteComment(comment._id, post._id)}
                      >
                        Delete Comment
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;

