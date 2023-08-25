import React from "react";
import "./AdminDashboard.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminDashboardLayout from "./AdminDashboardLayout/AdminDashboardLayout";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/dashboard");
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
