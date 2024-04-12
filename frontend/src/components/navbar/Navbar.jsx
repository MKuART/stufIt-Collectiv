import { useState } from "react";
import "./navbar.css";
import { NavLink, Routes, Route } from "react-router-dom";
import Join from "../join/Join.jsx";
import Login from "../login/Login.jsx";
import Profile from "../profile/Profile.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import Registry from "../registry/Registry.jsx";
import Gast from "../gast/Gast.jsx";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./logo/Logo.jsx";
import GoToStart from "../testCookie/goToStart.jsx";

function NavbarCompo() {
  const [userId, setUserId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setUserId(null);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <GoToStart />
      <Navbar expand="lg" className="full-screen-navbar nav-container">
        <Logo></Logo>

        <div onClick={toggleDropdown} className="drop-down-container">
          <div className="white-bar"></div>
          <div className="white-bar"></div>
          <div className="white-bar"></div>
          {showDropdown && (
            <div className="dropdown full-screen-dropdown">
              <ul>
                {userId && (
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                )}
                {userId && (
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                )}
                {userId && (
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                )}
                {!userId && (
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                )}
                {!userId && (
                  <li>
                    <NavLink to="/registry">Registry</NavLink>
                  </li>
                )}
                {!userId && (
                  <li>
                    <NavLink to="/gast">Gast</NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </Navbar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/gast" element={<Gast />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Join />} />
      </Routes>
    </>
  );
}

export default NavbarCompo;
