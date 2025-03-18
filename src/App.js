import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/post/:id" element={<PostDetails />} />
          {user?.isAdmin && <Route path="/admin" element={<AdminPanel />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
