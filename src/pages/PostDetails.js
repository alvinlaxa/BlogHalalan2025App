import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
      setEditedTitle(response.data.title);
      setEditedContent(response.data.content);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleEditPost = async () => {
    if (!user || post.author._id !== user.id) {
      alert("You are not authorized to edit this post.");
      return;
    }
    try {
      const response = await api.put(`/posts/${id}`, {
        title: editedTitle,
        content: editedContent
      });
      setPost(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${id}`);
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      {post && (
        <>
          {editMode ? (
            <div>
              <input
                type="text"
                className="form-control mb-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleEditPost}>Save Changes</button>
              <button className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <>
              <h2>{post.title}</h2>
              <p className="text-muted">By: {post.author?.username || "Unknown"}</p>
              <p>{post.content}</p>

              {user && post.author._id === user.id && (
                <button className="btn btn-warning me-2" onClick={() => setEditMode(true)}>Edit Post</button>
              )}

              {user && user.isAdmin && (
                <button className="btn btn-danger" onClick={handleDeletePost}>Delete Post</button>
              )}
            </>
          )}
        </>
      )}

      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetails;
