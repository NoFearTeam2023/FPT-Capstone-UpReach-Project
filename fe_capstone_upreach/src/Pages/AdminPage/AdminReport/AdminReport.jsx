import React from "react";
import "./AdminReport.css";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import AdminReportLayout from "./AdminReportLayout/AdminReportLayout";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";

const AdminReport = () => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/report-management");
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
      <div className="report-management-page-bg">
        <HeaderHomePage />
        <div className="report-management-page-sidebar">
          <AdminSidebar />
        </div>
        <div className="report-management-page-content">
          <AdminReportLayout />
        </div>
      </div>
    </>
  );
};
export default AdminReport;
