import React from "react";
import "./AdminSidebar.css";
import { ReactComponent as Dashboard } from "../../Assets/Icon/AdminDashboard.svg";
import { ReactComponent as User } from "../../Assets/Icon/AdminUser.svg";
import { ReactComponent as Influencer } from "../../Assets/Icon/AdminInflu.svg";
import { ReactComponent as Report } from "../../Assets/Icon/AdminReport.svg";
import { ReactComponent as List } from "../../Assets/Icon/AdminList.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu } from "antd";

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
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/dashboard"
      >
        <p>Dashboard</p>
      </Link>,
      "dashboard",
      <div style={{ width: "30px", height: "30px" }}>
        <Dashboard />
      </div>
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/user-profile"
      >
        <p>User Profile</p>
      </Link>,
      "user profile",

      <div style={{ width: "30px", height: "30px" }}>
        <User />
      </div>
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/influencer"
      >
        <p>Influencer</p>
      </Link>,
      "influencer",
      <div style={{ width: "30px", height: "30px" }}>
        <Influencer />
      </div>
    ),
    getItem(
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to="/admin/report"
      >
        <p>Report</p>
      </Link>,
      "report",
      <div style={{ width: "30px", height: "30px" }}>
        <Report />
      </div>
    ),
    getItem(
      <Link style={{ textDecoration: "none", color: "#FFF" }} to="/admin/list">
        <p>List</p>
      </Link>,
      "list",
      <div style={{ width: "30px", height: "30px" }}>
        <List />
      </div>
    ),
  ];
  return (
    <>
      <Menu
        style={{ gap: "15px", display: "grid", alignContent: "flex-start" }}
        className="admin-sidebar-bg"
        defaultSelectedKeys={
          currentPath?.includes("dashboard")
            ? "dashboard"
            : currentPath?.includes("user-profile")
            ? "user profile"
            : currentPath?.includes("influencer")
            ? "influencer"
            : currentPath?.includes("report")
            ? "report"
            : currentPath?.includes("list")
            ? "list"
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
