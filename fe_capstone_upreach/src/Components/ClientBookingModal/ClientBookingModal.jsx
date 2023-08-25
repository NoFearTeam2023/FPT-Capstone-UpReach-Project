import "./ClientBookingModal.css";
import React from "react";
import { Button, Input, DatePicker } from "antd";
import axios from "axios";
import { useUserStore } from "../../Stores/user";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ClientBookingModal = ({ data, setIsOpenBooking }) => {
  const [user] = useUserStore((state) => [state.user]);
  const [bookingJob, setBookingJob] = React.useState(data);
  const [isSending, setIsSending] = React.useState(false);
  const [describes, setDescribes] = React.useState("");
  const [dates, setDates] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const isSubmitDisabled = !describes || !value;

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const handleSend = () => {
    var startDay = value[0]?.$D;
    var startMonth = value[0]?.$M + 1;
    var startYear = value[0]?.$y;
    var formatStartDate = startDay + "/" + startMonth + "/" + startYear;

    var endDay = value[1]?.$D;
    var endMonth = value[1]?.$M + 1;
    var endYear = value[1]?.$y;
    var formatEndDate = endDay + "/" + endMonth + "/" + endYear;

    const updatedBookingJob = {
      ...bookingJob,
      describes: describes,
      startDate: formatStartDate,
      endDate: formatEndDate,
      clientId: user?.Client_ID,
      clientName: user?.fullNameClient,
    };
    setIsSending(true);
    const formData = new FormData();
    formData.append("bookingJob", JSON.stringify(updatedBookingJob));
    axios
      .put("http://localhost:4000/api/client/bookingJob", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setIsSending(false);
        setIsOpenBooking(false);
        // setForce((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      });
  };

  return (
    <>
      <div className="client-booking-modal">
        <div className="booking-modal-title">Detail Booking</div>
        <div className="booking-modal-content">
          <div className="content-body">
            Job Information
            <div className="content-line">
              <p className="line-title">Platform</p>
              <p className="line-content">{bookingJob?.jobPlatform}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Job Name</p>
              <p className="line-content">{bookingJob?.jobName}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Content</p>
              <p className="line-content">{bookingJob?.formatid}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Link</p>
              <p className="line-content">{bookingJob?.linkJob}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Quantities</p>
              <p className="line-content">{bookingJob?.quantityNumberWork}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Cost Estimate From</p>
              <p className="line-content">{bookingJob?.costForm}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Cost Estimate To</p>
              <p className="line-content">{bookingJob?.costTo}</p>
            </div>
            <div className="content-line">
              <p className="line-title">Describes</p>
              <TextArea
                onChange={(e) => setDescribes(e.target.value)}
                value={describes}
                // onBlur={handleSubmit}
                // onPressEnter={handleSubmit}
                // status={isError ? "error" : ""}
                autoFocus
                rows={4}
                placeholder="Describes your booking detail"
              />
            </div>
            <div className="content-line">
              <p className="line-title">Start date - End date</p>

              <RangePicker
                bordered={false}
                value={dates || value}
                onCalendarChange={(val) => {
                  setDates(val);
                }}
                onChange={(val) => {
                  setValue(val);
                }}
                onOpenChange={onOpenChange}
                changeOnBlur
                disabledDate={disabledDate}
              />
            </div>
          </div>
          <div className="content-footer">
            <Button
              className="mail-box-btn"
              type="primary"
              onClick={handleSend}
              disabled={isSubmitDisabled}
            >
              Send detail booking
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientBookingModal;
