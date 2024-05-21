import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link to="/" className="navLink">
            Home
          </Link>
        </li>
        <li>
          <Link to="/upload" className="navLink">
            upload
          </Link>
        </li>
        <li>
          <Link to="/download" className="navLink">
            Download
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
