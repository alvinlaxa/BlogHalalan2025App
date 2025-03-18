// src/components/CommentSection.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/comments/${postId}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const addedComment = response.data;
      addedComment.author = { username: user.username }; // Assign user immediately for UI update

      setComments([...comments, addedComment]); // Update state dynamically
      setNewComment(""); // Clear input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul className="list-group">
        {comments.map((comment) => (
          <li key={comment._id} className="list-group-item">
            <strong>{comment.author?.username || "Anonymous"}:</strong> {comment.text}
          </li>
        ))}
      </ul>

      {user && (
        <form onSubmit={handleAddComment} className="mt-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}

      {!user && <p className="text-danger">You must be logged in to comment.</p>}
    </div>
  );
};

export default CommentSection;


