import React from "react";
import "./ApproveJobItem.css";
import { ReactComponent as Facebook } from "../../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Tiktok } from "../../../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Youtube } from "../../../../../Assets/Icon/Youtube.svg";
import { Tooltip } from "antd";

const ApproveJobItem = ({ jobInfo }) => {
  // console.log(jobInfo);
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="social-icon" />;
      case "instagram":
        return <Instagram className="social-icon" />;
      case "tiktok":
        return <Tiktok className="social-icon" />;
      case "youtube":
        return <Youtube className="social-icon" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="aprrove-report-post-item">
        <div className="post-item-title">
          {getPlatformIcon(jobInfo?.jobPlatform)}
          <div className="post-item-sub-title">
            <p>{jobInfo?.jobName || ""}</p>
            <div style={{ display: "flex" }}>
              {/* {Array.isArray(jobInfo?.formatid)
                ? jobInfo.formatid.map((item) => item).join(", ")
                : "No valid data"} */}
              <p>{jobInfo?.formatid || ""}</p>
            </div>
            <Tooltip placement="top" title={jobInfo?.linkJob}>
              <a>
                {jobInfo?.linkJob?.length > 29
                  ? `${jobInfo?.linkJob?.slice(0, 29)}...`
                  : jobInfo?.linkJob}
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="cover-quantity-cost">
          <p>Quantity: {jobInfo?.quantityNumberWork || 0}</p>
          <p>
            Cost Estimate:{" "}
            <Tooltip
              placement="top"
              title={Number(jobInfo?.costForm).toLocaleString("vi-VN")}
            >
              {jobInfo?.costForm?.length > 8
                ? `${Number(jobInfo?.costForm)
                    .toLocaleString("vi-VN")
                    ?.slice(0, 8)}...`
                : Number(jobInfo?.costForm).toLocaleString("vi-VN")}
            </Tooltip>{" "}
            ~{" "}
            <Tooltip
              placement="top"
              title={Number(jobInfo?.costTo).toLocaleString("vi-VN")}
            >
              {jobInfo?.costTo?.length > 8
                ? `${Number(jobInfo?.costTo)
                    .toLocaleString("vi-VN")
                    ?.slice(0, 8)}...`
                : Number(jobInfo?.costTo).toLocaleString("vi-VN")}
            </Tooltip>{" "}
            VND
          </p>
        </div>
      </div>
    </>
  );
};
export default ApproveJobItem;
