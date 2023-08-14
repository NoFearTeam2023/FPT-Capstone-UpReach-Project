import React from "react";
import "./AdminUpgrade.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminUpgradeLayout from "./AdminUpgradeLayout/AdminUpgradeLayout";

const AdminUpgrade = () => {
  return (
    <>
      <div className="admin-upgrade-page-bg">
        <HeaderHomePage />
        <div className="admin-upgrade-page-sidebar">
          <AdminSidebar />
        </div>
        <div className="admin-upgrade-page-content">
          <AdminUpgradeLayout />
        </div>
      </div>
    </>
  );
};
export default AdminUpgrade;