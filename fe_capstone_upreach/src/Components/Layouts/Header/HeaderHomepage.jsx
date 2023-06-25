import React from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { Button } from "antd";

import "./HeaderHomepage.css";

const HeaderHomepage = () => {
  return (
    <div className="HeaderHomepage">
      <div className="headerContent">
        <div className="logoText">UpReach</div>
        <div className="navBar">
          <Link className="nav" to="/HomePage">
            Home
          </Link>
          <div className="nav" href="#####">
            Explore
          </div>
          <div className="nav">How it work</div>
          <div className="nav">Blogs</div>
        </div>
      </div>
      <div className="authBtn">
        <Link to="/login">
          <Button className="loginBtn" type="link">
            <p style={{ fontWeight: "700", marginTop: "-2px" }}>Login</p>
          </Button>
        </Link>
        <Button
          style={{ height: "35px" }}
          className="joinBtn"
          shape="round"
          type="primary"
        >
          Join as brand
        </Button>
      </div>
    </div>
  );
};

export default HeaderHomepage;
{
  /* <Space>
        <div className="h3 fw-bold ms-4 me-5 mt-2 logoText">UpReach</div>
        <div className="Menu">
          <Space align="center">
            <Typography.Text className="navHeader mx-3">Home</Typography.Text>
            <Typography.Text className="navHeader mx-3">
              Explore
            </Typography.Text>
            <Typography.Text className="navHeader mx-3">
              How it work
            </Typography.Text>
            <Typography.Text className="navHeader mx-3">Blog</Typography.Text>
          </Space>
        </div>
        <div className="SingUp">
          <Space>
            <Buttons text="Login" type="link" />
            <Buttons text="Join as brand" shape="round" type="primary" />
          </Space>
        </div>
      </Space> */
}
