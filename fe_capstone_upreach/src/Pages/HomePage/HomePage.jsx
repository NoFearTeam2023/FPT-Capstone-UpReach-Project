import React from "react";
import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderLoginHompape from "../../Components/Layouts/Header/HeaderLoginHompape";
import Index_HomePage from "./Index_HomePage";

const HomePage = () => {
  return (
    <div className="coverMain">
      <HeaderLoginHompape />
      <Index_HomePage />
      <FooterHome />
    </div>
  );
};
export default HomePage;
