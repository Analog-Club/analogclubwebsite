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
        <div className="nav-container">
          <NavLink to ="/about" className="nav-links" >GALLERY</NavLink>
        </div>
        <div className="nav-container">
          <NavLink to ="/about" className="nav-links" >EVENTS</NavLink>
        </div>
        <div className="nav-container">
          <NavLink to ="/about" className="nav-links" >RESOURCES</NavLink>
        </div>
        <div className="nav-container">
          <NavLink to ="/about" className="nav-links" >ABOUT US</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
