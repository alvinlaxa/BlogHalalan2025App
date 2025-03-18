import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" className="form-control mb-2" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
        <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
