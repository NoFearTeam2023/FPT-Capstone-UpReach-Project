import React from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { Button, Avatar, Dropdown } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "./HeaderHomepage.css";
import { UPREACH } from "../../Constant/Const";

const handleMenuClick = (e) => {
  console.log("click", e);
};
const items = [
  {
    label: "Infomation",
    key: "Infomation",
    icon: <UserOutlined />,
  },
  {
    label: "Log Out",
    key: "Logout",
    icon: <UserOutlined />,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
function RenderContent() {
  return (
    <div className="headerContent">
      <div className="logoText">{UPREACH}</div>
    </div>
  );
}

function HeaderLoginHompape() {
  return (
    <div>
      <div className="HeaderHomepage">
        <RenderContent />
        <div className="authBtn">
          <Link to="/myinfluencer">
            <Button className="my-list-btn" type="primary">
              My Influencer
            </Button>
          </Link>
          <Dropdown menu={menuProps} style={{ width: "250px" }} shape="round">
            <Button>
              <Space>
                <Avatar icon={<UserOutlined />} />
                Name
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default HeaderLoginHompape;
