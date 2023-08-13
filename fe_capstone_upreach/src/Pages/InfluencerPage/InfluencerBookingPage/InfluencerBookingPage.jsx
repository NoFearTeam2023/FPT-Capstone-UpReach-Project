import React from "react";
import "./InfluencerBookingPage.css";
import InfluencerSidebar from "../../../Components/InfluencerSidebar/InfluencerSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";

import InfluencerBookingLayout from "./InfluencerBookingLayout/InfluencerBookingLayout";

const InfluencerBookingPage = () => {
  return (
    <>
      <div className="booking-page-bg">
        <HeaderHomePage />
        <div className="booking-page-sidebar">
          <InfluencerSidebar />
        </div>
        <div className="booking-page-content">
          <InfluencerBookingLayout />
        </div>
      </div>
    </>
  );
};
export default InfluencerBookingPage;
