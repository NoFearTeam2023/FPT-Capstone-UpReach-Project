import React from "react";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_ClientProfile from "./Index_ClientProfile";

const ClientProfilePage = () => {
  return (
    <div className="coverMain-client-profile">
      <HeaderHomepage />
      <Index_ClientProfile />
    </div>
  );
};

export default ClientProfilePage;
