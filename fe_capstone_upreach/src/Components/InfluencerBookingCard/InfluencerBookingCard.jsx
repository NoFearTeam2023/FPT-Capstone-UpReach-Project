import React from "react";
import "./InfluencerBookingCard.css";
import { Icon } from "@iconify/react";
import { Modal, message, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import InfluencerBookingModal from "../InfluencerBookingModal/InfluencerBookingModal";
// import { useUserStore } from "../../Stores/user";
import axios from "axios";

const InfluencerBookingCard = ({ bookingList }) => {
  // const [user] = useUserStore((state) => [state.user]);
  const [bookingDetail, setBookingDetail] = React.useState("");
  const [isOpenBooking, setIsOpenBooking] = React.useState(false);
  const [status, setStatus] = React.useState(bookingList?.status);

  const handleOpenModal = (info) => {
    setBookingDetail(info);
    setIsOpenBooking(true);
  };

  const handleReject = (info) => {
    setStatus((info.status = "Rejected"));
    const formData = new FormData();
    formData.append("booking", JSON.stringify(info));
    // formData.append("influName", JSON.stringify(user.fullNameInfluencer));

    axios
      .put("http://localhost:4000/api/influ/reject-booking", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // setForce((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      });
  };

  const handleProcessing = (info) => {
    setStatus((info.status = "Processing"));
    const formData = new FormData();
    formData.append("booking", JSON.stringify(info));
    // formData.append("influName", JSON.stringify(user.fullNameInfluencer));

    axios
      .put("http://localhost:4000/api/influ/accept-booking", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // setForce((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      });
  };

  const showConfirm = (info, action) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to ${action} this booking?`,
      okText: "Yes",
      okButtonProps: {
        disabled: info?.status !== "Pending",
      },
      cancelText: "No",
      onOk() {
        if (action === "Rejected") {
          handleReject(info);
        } else if (action === "Processing") {
          handleProcessing(info);
        }
        message.success(`Successful!`);
      },
    });
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
        return null;
    }
  };

  return (
    <>
      <Modal
        className="custom-modal"
        centered
        open={isOpenBooking}
        footer={null}
        onCancel={() => setIsOpenBooking(false)}
        width={900}
        bodyStyle={{ borderRadius: "30px" }}
      >
        <InfluencerBookingModal bookingItem={bookingDetail} />
      </Modal>
      <div className="influ-booking-card">
        <div className="influ-booking-card-content">
          <p style={{ width: "18.8%" }}>{bookingList?.brandName}</p>
          <p style={{ width: "12.1%" }}>{bookingList?.platform}</p>
          <p style={{ width: "17.1%" }}>
            {bookingList?.formatContent
              ?.map((item) => getFormatContent(item))
              ?.join(", ")}
          </p>

          <p style={{ width: "10%" }}>{bookingList?.quantity}</p>
          <p style={{ width: "12%" }}>{bookingList?.status}</p>
          <p style={{ width: "15%" }}>{bookingList?.startDate}</p>
          <p style={{ width: "15%" }}>{bookingList?.endDate}</p>
        </div>
        <div className="influ-booking-card-icons">
          <div className="influ-booking-card-icon">
            <Icon
              icon="majesticons:open"
              width="26"
              height="26"
              onClick={() => handleOpenModal(bookingList)}
            />
          </div>

          <Button
            className="influ-booking-card-icon"
            onClick={() => showConfirm(bookingList, "Rejected")}
            disabled={
              bookingList?.status === "Rejected" ||
              bookingList?.status === "Processing" ||
              bookingList?.status === "Done"
            }
            icon={
              <Icon
                icon="iconoir:cancel"
                color={
                  bookingList?.status === "Rejected" ||
                  bookingList?.status === "Processing" ||
                  bookingList?.status === "Done"
                    ? "#ccc"
                    : "#fa0000"
                }
                width="30"
                height="30"
              />
            }
          ></Button>

          <Button
            className="influ-booking-card-icon"
            onClick={() => showConfirm(bookingList, "Processing")}
            disabled={
              bookingList?.status === "Rejected" ||
              bookingList?.status === "Processing" ||
              bookingList?.status === "Done"
            }
            icon={
              <Icon
                icon="ic:round-check"
                color={
                  bookingList?.status === "Rejected" ||
                  bookingList?.status === "Processing" ||
                  bookingList?.status === "Done"
                    ? "#ccc"
                    : "#00dd1a"
                }
                width="30"
                height="30"
              />
            }
          ></Button>
        </div>
      </div>
    </>
  );
};

export default InfluencerBookingCard;
