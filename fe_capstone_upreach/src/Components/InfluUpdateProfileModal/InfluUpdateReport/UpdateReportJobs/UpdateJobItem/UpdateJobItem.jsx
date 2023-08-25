import React from "react";
import "./UpdateJobItem.css";
import { ReactComponent as Facebook } from "../../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Tiktok } from "../../../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Youtube } from "../../../../../Assets/Icon/Youtube.svg";
import { Tooltip } from "antd";

const UpdateJobItem = ({ bookingItem }) => {
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
      <div className="update-report-post-item">
        <div className="post-item-title">
          {getPlatformIcon(bookingItem?.platform)}
          <div className="post-item-sub-title">
            <p>{bookingItem?.jobName || ""}</p>
            <div style={{ display: "flex" }}>
              {getFormatContent(bookingItem?.formatContent)}
            </div>
            <Tooltip placement="top" title={bookingItem?.jobLink}>
              <a>
                {bookingItem?.jobLink?.length > 29
                  ? `${bookingItem?.jobLink?.slice(0, 29)}...`
                  : bookingItem?.jobLink}
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="cover-quantity-cost">
          <p>Quantity: {bookingItem?.quantity || 0}</p>
          <p>
            Cost Estimate:{" "}
            <Tooltip
              placement="top"
              title={Number(bookingItem?.costEstimateFrom).toLocaleString(
                "vi-VN"
              )}
            >
              {bookingItem?.costEstimateFrom?.length > 8
                ? `${Number(bookingItem?.costEstimateFrom)
                    ?.toLocaleString("vi-VN")
                    ?.slice(0, 8)}...`
                : Number(bookingItem?.costEstimateFrom)?.toLocaleString(
                    "vi-VN"
                  )}
            </Tooltip>{" "}
            ~{" "}
            <Tooltip
              placement="top"
              title={Number(bookingItem?.costEstimateTo)?.toLocaleString(
                "vi-VN"
              )}
            >
              {bookingItem?.costEstimateTo?.length > 8
                ? `${Number(bookingItem?.costEstimateTo)
                    ?.toLocaleString("vi-VN")
                    ?.slice(0, 8)}...`
                : Number(bookingItem?.costEstimateTo)?.toLocaleString("vi-VN")}
            </Tooltip>{" "}
            VND
          </p>
        </div>
      </div>
    </>
  );
};
export default UpdateJobItem;
