import React from "react";
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faShareNodes } from '@fortawesome/free-solid-svg-icons';
// terminal command to install fonts:
// npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-links">
        </div>
        <div className="social-icons">
        <a href="https://www.instagram.com/analogclubuw/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://discord.com/invite/Nc34eX8DVD" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a href="mailto:analogclub@uw.edu" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="https://linktr.ee/analogclubuw?utm_source=linktree_profile_share&ltsid=38b8cfca-c345-4a4b-a89d-2e6c4d8ef40e" aria-label="Share">
            <FontAwesomeIcon icon={faShareNodes} />
        </a>
        </div>
      </footer>
    );
  }
  
export default Footer;