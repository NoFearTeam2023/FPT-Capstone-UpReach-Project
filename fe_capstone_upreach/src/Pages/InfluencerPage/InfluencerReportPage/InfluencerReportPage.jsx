import React from "react";
import "./InfluencerReportPage.css";
import InfluencerSidebar from "../../../Components/InfluencerSidebar/InfluencerSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import InfluencerReportLayout from "./InfluencerReportLayout/InfluencerReportLayout";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";
const InfluencerReportPage = () => {
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
      {user?.roleId == 3 ? (
        <div className="report-page-bg">
          <HeaderHomePage />
          <div className="report-page-sidebar">
            <InfluencerSidebar />
          </div>
          <div className="report-page-content">
            <InfluencerReportLayout />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default InfluencerReportPage;
