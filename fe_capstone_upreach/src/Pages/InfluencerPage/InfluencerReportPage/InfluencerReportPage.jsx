import React from "react";
import "./InfluencerReportPage.css";
import InfluencerSidebar from "../../../Components/InfluencerSidebar/InfluencerSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import InfluencerReportLayout from "./InfluencerReportLayout/InfluencerReportLayout";
const InfluencerReportPage = () => {
  return (
    <>
      <div className="report-page-bg">
        <HeaderHomePage />
        <div className="report-page-sidebar">
          <InfluencerSidebar />
        </div>
        <div className="report-page-content">
          <InfluencerReportLayout />
        </div>
      </div>
    </>
  );
};

export default InfluencerReportPage;
