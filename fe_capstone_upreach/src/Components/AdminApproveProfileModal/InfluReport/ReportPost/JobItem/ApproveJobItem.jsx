import React from "react";
import "./ApproveJobItem.css";
import { ReactComponent as Facebook } from "../../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Tiktok } from "../../../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Youtube } from "../../../../../Assets/Icon/Youtube.svg";
import { Tooltip } from "antd";

const ApproveJobItem = ({ jobInfo }) => {
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
  const getFormatContent = (id) => {
    switch (id) {
      case "CF01":
        return "Text";
      case "CF02":
        return "Picture";
      case "CF03":
        return "Video";
      default:
        return "";
    }
  };
  return (
    <>
      <div className="approve-report-post-item">
        <div className="post-item-title">
          {getPlatformIcon(jobInfo?.Platform_Job)}
          <div className="post-item-sub-title">
            <p>{jobInfo?.Name_Job || ""}</p>
            <div style={{ display: "flex" }}>
              {getFormatContent(jobInfo?.Format_Id)}
            </div>
            <Tooltip placement="top" title={jobInfo?.Link}>
              <a>
                {jobInfo?.Link?.length > 29
                  ? `${jobInfo?.Link?.slice(0, 29)}...`
                  : jobInfo?.Link}
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="cover-quantity-cost">
          <p>Quantity: {jobInfo?.Quantity || 0}</p>
          <p>
            Cost Estimate:{" "}
            <Tooltip
              placement="top"
              title={Number(jobInfo?.CostEstimate_From_Job)?.toLocaleString(
                "vi-VN"
              )}
            >
              {jobInfo?.CostEstimate_From_Job?.length > 8
                ? `${Number(jobInfo?.CostEstimate_From_Job)
                    ?.toLocaleString("vi-VN")
                    ?.slice(0, 8)}...`
                : Number(jobInfo?.CostEstimate_From_Job)?.toLocaleString(
                    "vi-VN"
                  )}
            </Tooltip>{" "}
            ~{" "}
            <Tooltip
              placement="top"
              title={Number(jobInfo?.CostEstimate_To_Job)?.toLocaleString(
                "vi-VN"
              )}
            >
              {jobInfo?.CostEstimate_To_Job?.length > 8
                ? `${Number(jobInfo?.CostEstimate_To_Job)
                    ?.toLocaleString("vi-VN")
                    ?.slice(0, 8)}...`
                : Number(jobInfo?.CostEstimate_To_Job)?.toLocaleString("vi-VN")}
            </Tooltip>{" "}
            VND
          </p>
        </div>
      </div>
    </>
  );
};
export default ApproveJobItem;
