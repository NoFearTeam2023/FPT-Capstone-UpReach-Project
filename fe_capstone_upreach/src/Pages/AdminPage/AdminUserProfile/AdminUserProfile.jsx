import React from "react";
import "./AdminUserProfile.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminUserProfileLayout from "./AdminUserProfileLayout/AdminUserProfileLayout";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";
const AdminUserProfile = () => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/user-management");
    } else if (user.roleId == 2) {
      navigate("/homepage");
    } else if (user.roleId == 3) {
      navigate("/influencer/my-report");
    } else {
      navigate("/");
    }
  }, []);
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
