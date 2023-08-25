import React from "react";
import "./InfluencerSidebar.css";
import { ReactComponent as MyReportIcon } from "../../Assets/Icon/MyReport.svg";
import { ReactComponent as MyBookingIcon } from "../../Assets/Icon/MyBooking.svg";
import { ReactComponent as MailBoxIcon } from "../../Assets/Icon/MailBox.svg";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";
const InfluencerSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/influencer/my-report"
      >
        <p>My report</p>
      </Link>,
      "my report",
      <MyReportIcon />
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/influencer/my-booking"
      >
        <p>My booking</p>
      </Link>,
      "my booking",
      <MyBookingIcon />
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/influencer/my-booking"
      >
        <p>Mail box</p>
      </Link>,
      "mail box",
      <MailBoxIcon />
    ),
  ];
  return (
    <>
      <Menu
        style={{ gap: "15px", display: "grid", alignContent: "flex-start" }}
        className="influ-sidebar-bg"
        defaultSelectedKeys={
          currentPath?.includes("my-report")
            ? "my report"
            : currentPath?.includes("my-booking")
            ? "my booking"
            : currentPath?.includes("mail-box")
            ? "mail box"
            : "my-report"
        }
        mode={"inline"}
        theme={"light"}
        items={items}
      />
    </>
  );
};

export default InfluencerSidebar;
