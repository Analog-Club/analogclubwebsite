import React from "react";
import "../App.css";
import { NavLink } from 'react-router-dom';

function Header({ title, isLink }) { // Destructure title and isLink from props
  return (
    <div className="Header">
      <div className="nav-container navbar-links">
        {isLink ? (
          <NavLink to={`/${title.toLowerCase()}`} className="nav-links">
            {title}
          </NavLink>
        ) : (
          <span className="nav-links">{title}</span>
        )}
      </div>
    </div>
  );
}

export default Header;

