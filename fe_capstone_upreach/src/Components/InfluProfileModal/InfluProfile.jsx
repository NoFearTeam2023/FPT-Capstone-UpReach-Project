import "./InfluProfile.css";
import InfluSideBar from "./InfluSideBar/InfluSideBar";
import InfluImage from "./InfluImage/InfluImage";
import InfluReport from "./InfluReport/InfluReport";
import React from "react";
const InfluProfile = ({ profileInflu }) => {
  return (
    <>
      <div className="influ-profile">
        <div className="influ-side-bar">
          <InfluSideBar influInfo={profileInflu} />
        </div>
        <div className="cover-influ-image-report">
          <div className="influ-image">
            <InfluImage />
          </div>
          <div className="influ-report">
            <InfluReport influInfo={profileInflu} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluProfile;
