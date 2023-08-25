import React from "react";
import "./InfluencerBookingPage.css";
import InfluencerSidebar from "../../../Components/InfluencerSidebar/InfluencerSidebar";
import HeaderHomePage from "../../../Components/Layouts/Header/HeaderHomepage";
import InfluencerBookingLayout from "./InfluencerBookingLayout/InfluencerBookingLayout";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";

const InfluencerBookingPage = () => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/dashboard");
    } else if (user.roleId == 2) {
      navigate("/homepage");
    } else if (user.roleId == 3) {
      navigate("/influencer/my-booking");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {user?.roleId == 3 ? (
        <div className="booking-page-bg">
          <HeaderHomePage />
          <div className="booking-page-sidebar">
            <InfluencerSidebar />
          </div>
          <div className="booking-page-content">
            <InfluencerBookingLayout />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default InfluencerBookingPage;
