import "./InfluVersionProfile.css";
import InfluSideBar from "./InfluSideBar/VersionInfluSideBar";
import InfluImage from "./InfluImage/VersionInfluImage";
import InfluReport from "./InfluReport/VersionInfluReport";
import React from "react";
import axios from "axios";
const InfluVersionProfile = ({ profileInflu, profileSideBar }) => {
  const [dataReportVersion, setDataReportVersion] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("http://localhost:4000/api/influ/data-version", {
        influencerId: profileInflu?.influencerId,
      })
      .then((response) => {
        const info = response?.data?.data[0];
        console.log(info);
        setDataReportVersion(info);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      });
  }, [profileInflu]);

  return (
    <>
      <div className="influ-version-profile">
        <div className="influ-side-bar">
          <InfluSideBar
            influInfo={profileInflu}
            profileSideBar={profileSideBar}
          />
        </div>
        <div className="cover-influ-image-report">
          <div className="influ-image">
            <InfluImage influInfo={profileInflu} />
          </div>
          <div className="influ-report">
            <InfluReport
              influInfo={profileInflu}
              dataReportVersion={dataReportVersion}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluVersionProfile;
