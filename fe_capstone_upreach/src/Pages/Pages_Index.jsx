import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./LoginPage/Login";
import JoinAsBrand from "./JoinAsBrandPage/JoinAsBrand";
import SignUp from "./SignUpPage/SignUp";
import Introduce from "./IntroducePage/Introduce";
import HomePage from "./HomePage/HomePage";
import Upgrade from "./UpgradePage/Upgrade";

import AdminDashboard from "./AdminPage/AdminDashboard/AdminDashboard";
import AdminUserProfile from "./AdminPage/AdminUserProfile/AdminUserProfile";
import AdminInfluencer from "./AdminPage/AdminInfluencer/AdminInfluencer";
import AdminReport from "./AdminPage/AdminReport/AdminReport";
import AdminUpgrade from "./AdminPage/AdminUpgrade/AdminUpgrade";

import InfluencerBookingPage from "./InfluencerPage/InfluencerBookingPage/InfluencerBookingPage.jsx";
import InfluencerReportPage from "./InfluencerPage/InfluencerReportPage/InfluencerReportPage.jsx";
import InfluencerProfile from "./InfluencerPage/InfluencerProfilePage/influencerProfile";

import ForgotPasswordPage from "./ForgotPassword/ForgotPasswordPage";
import VerifyRegisterPage from "./VerifyRegister/VerifyRegisterPage";
import ClientProfilePage from "./ClientProfilePage/ClientProfilePage";
import SignUpInfluencerPage from "./SignUpInfluencer/SignUpInfluencerPage";
import VerifyInfluencerRegister from "./SignUpInfluencer/VerifyInfluencerRegister";
import CreatInfluencerProfilePage from "./CreateInfluencer/CreatInfluencerProfilePage";
import ResetPasswordPage from "./ForgotPassword/ResetPasswordPage";
import MyInfluencer from "./MyInfluencerPage/MyInfluencer";

function Pages_Index() {
  const navigate = useNavigate();

  //click button will go to login
  const navigateLogin = () => {
    navigate("/login");
  };

  //click button will go to upgrade page
  const navigateUpgrade = () => {
    navigate("/upgrade");
  };

  const navigateAdmin = () => {
    navigate("/admin/dashboard");
  };

  const navigateInfluencer = () => {
    navigate("/influencer/report-page");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Introduce navigateLogin={navigateLogin} />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Login />
          </>
        }
      />
      <Route
        path="/join-as-brand"
        element={
          <>
            <JoinAsBrand />
          </>
        }
      />
      <Route
        path="/sign-up"
        element={
          <>
            <SignUp />
          </>
        }
      />
      <Route
        path="/homepage"
        element={
          <>
            <HomePage />
          </>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <>
            <ForgotPasswordPage />
          </>
        }
      />
      <Route
        path="/verify-register"
        element={
          <>
            <VerifyRegisterPage />
          </>
        }
      />
      <Route
        path="/client-profile"
        element={
          <>
            <ClientProfilePage />
          </>
        }
      />
      <Route
        path="/upgrade"
        element={
          <>
            <Upgrade />
          </>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <>
            <AdminDashboard navigateHome={navigateAdmin} />
          </>
        }
      />
      <Route
        path="/admin/user-management"
        element={
          <>
            <AdminUserProfile navigateHome={navigateAdmin} />
          </>
        }
      />
      <Route
        path="/admin/influencer-management"
        element={
          <>
            <AdminInfluencer navigateHome={navigateAdmin} />
          </>
        }
      />
      <Route
        path="/admin/report-management"
        element={
          <>
            <AdminReport navigateHome={navigateAdmin} />
          </>
        }
      />
      <Route
        path="/admin/upgrade-management"
        element={
          <>
            <AdminUpgrade navigateHome={navigateAdmin} />
          </>
        }
      />
      <Route
        path="/influencer/my-report"
        element={
          <>
            <InfluencerReportPage navigateHome={navigateInfluencer} />
          </>
        }
      />
      <Route
        path="/influencer/my-booking"
        element={
          <>
            <InfluencerBookingPage navigateHome={navigateInfluencer} />
          </>
        }
      />
      <Route
        path="/upgrade"
        element={
          <>
            <Upgrade />
          </>
        }
      />
      <Route
        path="/reset-password"
        element={
          <>
            <ResetPasswordPage />
          </>
        }
      />
      <Route
        path="/join-as-influencer"
        element={
          <>
            <SignUpInfluencerPage />
          </>
        }
      />
      <Route
        path="/verify-influencer-register"
        element={
          <>
            <VerifyInfluencerRegister />
          </>
        }
      />
      <Route
        path="/create-influencer-page"
        element={
          <>
            <CreatInfluencerProfilePage />
          </>
        }
      />
      <Route
        path="influencer/profile"
        element={
          <>
            <InfluencerProfile />
          </>
        }
      />
      <Route
        path="/myinfluencer"
        element={
          <>
            <MyInfluencer />
          </>
        }
      />
      
    </Routes>
  );
}

export default Pages_Index;
