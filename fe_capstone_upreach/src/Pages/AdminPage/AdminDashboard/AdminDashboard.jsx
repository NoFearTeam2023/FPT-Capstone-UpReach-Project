import React from "react";
import "./AdminDashboard.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminDashboardLayout from "./AdminDashboardLayout/AdminDashboardLayout";
const AdminDashboard = () => {
  return (
    <>
      <div className="dashboard-page-bg">
        <HeaderHomePage />
        <div className="dashboard-page-sidebar">
          <AdminSidebar />
        </div>
        <div className="dashboard-page-content">
          <AdminDashboardLayout />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
