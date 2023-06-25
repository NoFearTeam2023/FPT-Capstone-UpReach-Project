import React from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { Button } from "antd";

import "./HeaderHomepage.css";

function RenderContent({ onClick }) {
  return (
    <div className="headerContent">
      <div className="logoText" onClick={onClick}>
        UpReach
      </div>
      <div className="navBar">
        <div className="nav" onClick={onClick}>
          Home
        </div>
        <div className="nav" onClick={onClick}>
          Explore
        </div>
        <div className="nav" onClick={onClick}>
          How it work
        </div>
        <div className="nav" onClick={onClick}>
          Blogs
        </div>
      </div>
    </div>
  );
}

const HeaderHomepage = ({ handleClickHomePage }) => {
  return (
    <div className="HeaderHomepage">
      <RenderContent onClick={handleClickHomePage} />
      <div className="authBtn">
        <Link to="/login">
          <Button className="loginBtn" type="link">
            <p style={{ fontWeight: "700", marginTop: "-2px" }}>Login</p>
          </Button>
        </Link>
        <Link to="/join-as-brand">
          <Button
            style={{ height: "35px" }}
            className="joinBtn"
            shape="round"
            type="primary"
          >
            Join as brand
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderHomepage;
