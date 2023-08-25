import React from "react";
import "./AdminUpgrade.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminUpgradeLayout from "./AdminUpgradeLayout/AdminUpgradeLayout";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";
const AdminUpgrade = () => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/upgrade-management");
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
