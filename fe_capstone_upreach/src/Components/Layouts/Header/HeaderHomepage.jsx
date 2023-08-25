import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Dropdown, Space, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";

import "./HeaderHomepage.css";
import { UPREACH } from "../../Constant/Const";
import { useUserStore } from "../../../Stores/user";

function RenderLogo({ onClickIntroduce, onClickHomeMain }) {
  const [user] = useUserStore((state) => [state?.user]);
  return (
    <div className="headerContent">
      {user.roleId == 2 ? (
        <div className="logoText" onClick={onClickHomeMain}>
          {UPREACH}
        </div>
      ) : user.roleId == 3 ? (
        <div className="logoText" onClick={onClickHomeMain}>
          {UPREACH}
        </div>
      ) : (
        <div className="logoText" onClick={onClickIntroduce}>
          {UPREACH}
        </div>
      )}
    </div>
  );
}

function RenderContent({ onClickHomeMain, onClickMyInfluencer }) {
  return (
    <div className="headerContent">
      <div className="navBar">
        <div className="nav" onClick={onClickHomeMain}>
          Home
        </div>
        <div className="nav" onClick={onClickMyInfluencer}>
          Explore
        </div>
        <div className="nav" onClick={onClickHomeMain}>
          How it work
        </div>
        <div className="nav" onClick={onClickHomeMain}>
          Blogs
        </div>
      </div>
    </div>
  );
}

const HeaderHomepage = (onClickIntroduce) => {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUserInfo] = useUserStore((state) => [
    state?.user,
    state?.setUserInfo,
  ]);

  //click button will go to home page not logged in yet
  const navigateIntroduce = () => {
    navigate("/");
  };

  //click button will go to home page have token
  const navigateHomeMain = () => {
    navigate("/homepage");
  };

  const navigateMyInfluencer = () => {
    navigate("/myinfluencer");
  };

  const navigateProfileInfluencer = () => {
    if (user.roleId == 3) {
      navigate("/influencer/profile");
    }
    if (user.roleId == 2) {
      navigate("/client-profile");
    }
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setUserInfo({});
    localStorage.removeItem("user-draw-storage");
    navigate("/");
  };
  const items = [
    {
      label: <p onClick={navigateProfileInfluencer}>Profile</p>,
      key: "0",
    },
    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "1",
    },
  ];

  return (
    <div className="HeaderHomepage">
      {user?.roleId == 2 ? (
        <RenderLogo onClickHomeMain={navigateHomeMain} />
      ) : user?.roleId == 3 ? (
        <RenderLogo onClickHomeMain={navigateHomeMain} />
      ) : (
        <RenderLogo onClickIntroduce={navigateIntroduce} />
      )}
      <div className="authBtn">
        {user?.roleId == 3 ? (
          <div className="influencer-btn">
            <Avatar
              src={
                <img
                  src={user?.avatar || default_img}
                  alt="avatar"
                  onError={(e) => {
                    e.target.src = default_img;
                  }}
                />
              }
              size={45}
            />

            <div className="influencer-dropdown-block">
              <Dropdown menu={{ items }} trigger={"click"}>
                <p style={{ height: "45px" }}>
                  <Space>
                    <div>
                      {user?.fullNameInfluencer?.length > 13
                        ? `${user?.fullNameInfluencer?.slice(0, 13)}...`
                        : user?.fullNameInfluencer}
                    </div>
                  </Space>
                  <DownOutlined />
                </p>
              </Dropdown>
            </div>
          </div>
        ) : user.roleId == 2 ? (
          <div className="cover-client-login">
            <Link to="/myinfluencer">
              <Button className="my-list-btn" type="primary">
                My Influencer
              </Button>
            </Link>

            <div className="influencer-btn">
              <div>
                <Avatar
                  src={
                    <img
                      src={user?.avatar || default_img}
                      alt="avatar"
                      onError={(e) => {
                        e.target.src = default_img;
                      }}
                    />
                  }
                  size={45}
                />
              </div>
              <div className="influencer-dropdown-block">
                <Dropdown menu={{ items }} trigger={"click"}>
                  <p style={{ height: "45px" }}>
                    <Space>
                      <div>
                        {user?.fullNameClient?.length > 13
                          ? `${user?.fullNameClient?.slice(0, 13)}...`
                          : user?.fullNameClient}
                      </div>
                    </Space>
                    <DownOutlined />
                  </p>
                </Dropdown>
              </div>
            </div>
          </div>
        ) : user.roleId == 1 ? (
          <div className="influencer-btn">
            <Avatar
              src={
                <img
                  src={
                    "https://i.pinimg.com/originals/79/15/86/79158634d9858285c963946015f44acf.jpg" ||
                    default_img
                  }
                  alt="avatar"
                  onError={(e) => {
                    e.target.src = default_img;
                  }}
                />
              }
              size={45}
            />

            <div className="influencer-dropdown-block">
              <Dropdown menu={{ items }} trigger={"click"}>
                <p style={{ height: "45px" }}>
                  <Space>admin</Space>
                  <DownOutlined />
                </p>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="landing-page-header">
            <RenderContent onClickHomeMain={navigateHomeMain} />
            <div className="cover-login-sign-up">
              <Link to="/login">
                <Button className="loginBtn" type="link">
                  <p style={{ fontWeight: "700", marginTop: "-2px" }}>Login</p>
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button
                  style={{ height: "35px" }}
                  className="joinBtn"
                  shape="round"
                  type="primary"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderHomepage;
