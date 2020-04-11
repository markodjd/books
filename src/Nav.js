import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Nav() {
  return (
    <div className="Nav">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand btn btn-link">Books</button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/">
              <li className="nav-item active">Home</li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
