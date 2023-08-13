import React from "react";
import "./AdminUserProfile.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminUserProfileLayout from "./AdminUserProfileLayout/AdminUserProfileLayout";
const AdminUserProfile = () => {
  return (
    <>
      <div className="user-profile-page-bg">
        <HeaderHomePage />
        <div className="user-profile-page-sidebar">
          <AdminSidebar />
        </div>
        <div className="user-profile-page-content">
          <AdminUserProfileLayout />
        </div>
      </div>
    </>
  );
};

export default AdminUserProfile;
