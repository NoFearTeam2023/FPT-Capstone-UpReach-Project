import React from "react";
import "./AdminSidebar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { Icon } from "@iconify/react";

const AdminSidebar = () => {
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
        style={{ textDecoration: "none", color: "#FFF", paddingLeft: "0" }}
        to="/admin/dashboard"
      >
        <p>Dashboard</p>
      </Link>,
      "dashboard",
      <div style={{ width: "20px", height: "20px" }}>
        <Icon
          icon="material-symbols:dashboard"
          color="white"
          width="20"
          height="20"
        />
      </div>
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/user-management"
      >
        <p>Client Management</p>
      </Link>,
      "user-management",

      <div style={{ width: "20px", height: "20px" }}>
        <Icon
          icon="fa6-solid:user-group"
          color="white"
          width="20"
          height="20"
        />
      </div>
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/influencer-management"
      >
        <p>Influencer Management</p>
      </Link>,
      "influencer-management",
      <div style={{ width: "20px", height: "20px" }}>
        <Icon icon="mdi:user-star" color="white" width="20" height="20" />
      </div>
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/report-management"
      >
        <p>Report Management</p>
      </Link>,
      "report-management",
      <div style={{ width: "20px", height: "20px" }}>
        <Icon
          icon="tabler:report-search"
          color="white"
          width="20"
          height="20"
        />
      </div>
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/upgrade-management"
      >
        <p>Upgrade Management</p>
      </Link>,
      "upgrade-management",
      <div style={{ width: "20px", height: "20px" }}>
        <Icon
          icon="game-icons:armor-upgrade"
          color="white"
          width="20"
          height="20"
        />
      </div>
    ),
  ];
  return (
    <>
      <Menu
        style={{
          gap: "15px",
          display: "grid",
          alignContent: "flex-start",
        }}
        className="admin-sidebar-bg"
        defaultSelectedKeys={
          currentPath?.includes("dashboard")
            ? "dashboard"
            : currentPath?.includes("user-management")
            ? "user-management"
            : currentPath?.includes("influencer-management")
            ? "influencer-management"
            : currentPath?.includes("report-management")
            ? "report-management"
            : currentPath?.includes("upgrade-management")
            ? "upgrade-management"
            : "dashboard"
        }
        mode={"inline"}
        theme={"light"}
        items={items}
      />
    </>
  );
};

export default AdminSidebar;
