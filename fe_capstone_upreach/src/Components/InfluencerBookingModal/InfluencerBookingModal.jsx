import "./InfluencerBookingModal.css";
import React from "react";
import { Button } from "antd";
const InfluencerBookingModal = ({ bookingItem }) => {
  const getFormatContent = (id) => {
    switch (id) {
      case "CF01":
        return "Text";
      case "CF02":
        return "Picture";
      case "CF03":
        return "Video";
      default:
        return null;
    }
  };
  return (
    <>
      <div className="influ-booking-modal">
        <div className="booking-modal-title">Detail Booking</div>
        <div className="booking-modal-content">
          <div className="content-header">
            Services
            <div className="content-line">
              <p className="line-title">Platform</p>
              <p className="line-content">{bookingItem?.platform}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Job Name</p>
              <p className="line-content">{bookingItem?.jobName}</p>
            </div>
          </div>
          <div className="content-body">
            Customer
            <div className="content-line">
              <p className="line-title">Full Name</p>
              <p className="line-content">{bookingItem?.clientName}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Brand Name</p>
              <p className="line-content">{bookingItem?.brandName}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Content</p>
              <p className="line-content">
                {bookingItem?.formatContent
                  ?.map((item) => getFormatContent(item))
                  ?.join(", ")}
              </p>
            </div>
            <div className="content-line">
              <p className="line-title">Quantities</p>
              <p className="line-content">{bookingItem?.quantity}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Link</p>
              <p className="line-content">{bookingItem?.jobLink}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Cost Estimate From</p>
              <p className="line-content">{bookingItem?.costEstimateFrom}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Cost Estimate To</p>
              <p className="line-content">{bookingItem?.costEstimateTo}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Start Date</p>
              <p className="line-content">{bookingItem?.startDate}</p>
            </div>
            <div className="content-line">
              <p className="line-title">End Date</p>
              <p className="line-content">{bookingItem?.endDate}</p>
            </div>
            <div className="content-line-des">
              <p className="line-title-des">Describes</p>
              <p className="line-content-des">{bookingItem?.describes}</p>
            </div>
          </div>
          <div className="content-footer">
            <Button
              className="mail-box-btn"
              type="primary"
              // htmlType="submit"
            >
              Chat with Client
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerBookingModal;
