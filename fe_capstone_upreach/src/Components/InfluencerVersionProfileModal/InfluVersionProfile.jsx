import "./InfluVersionProfile.css";
import InfluSideBar from "./InfluSideBar/VersionInfluSideBar";
import InfluImage from "./InfluImage/VersionInfluImage";
import InfluReport from "./InfluReport/VersionInfluReport";
import React from "react";
import axios from "axios";
import { Spin } from "antd";

const InfluVersionProfile = ({ profileInflu, profileSideBar }) => {
  const [dataReportVersion, setDataReportVersion] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .post("http://139.180.155.253/api/influ/data-version", {
        influencerId: profileInflu?.influencerId,
      })
      .then((response) => {
        const info = response?.data?.data?.at(0);
        setDataReportVersion(info);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      })
      .finally(() => {
        setIsLoading(false);
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
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluVersionProfile;
