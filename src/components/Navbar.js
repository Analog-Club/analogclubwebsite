import React from "react";
import "../App.css";
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <div className="title-container">
        <NavLink to ="/home" style={{ textDecoration: 'none' }} ><h1 className="title-text">ANALOG CLUB</h1></NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to ="/gallery" className="nav-links nav-container" >GALLERY</NavLink>
        <NavLink to="/magazine" className="nav-links nav-container" >MAGAZINE</NavLink>
        <NavLink to ="/events" className="nav-links nav-container" >EVENTS</NavLink>
        <NavLink to ="/resources" className="nav-links nav-container" >RESOURCES</NavLink>
        <NavLink to ="/about" className="nav-links nav-container" >ABOUT US</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
