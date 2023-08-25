import React from "react";
import "./AdminInfluencer.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminInfluencerLayout from "./AdminInfluencerLayout/AdminInfluencerLayout";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";

const AdminInfluencer = () => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/influencer-management");
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
      <div className="admin-influencer-page-bg">
        <HeaderHomePage />
        <div className="admin-influencer-page-sidebar">
          <AdminSidebar />
        </div>
        <div className="admin-influencer-page-content">
          <AdminInfluencerLayout />
        </div>
      </div>
    </>
  );
};
export default AdminInfluencer;
