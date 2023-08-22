import React from "react";
import "./ClientHistoryBookingCard.css";
import { Icon } from "@iconify/react";
import { Modal, message, Button, Drawer, theme, Rate } from "antd";
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import ClientHistoryBookingModal from "../ClientHistoryBookingModal/ClientHistoryBookingModal";
// import { useUserStore } from "../../Stores/user";
import axios from "axios";

const ClientHistoryBookingCard = ({ bookingList }) => {
  console.log(bookingList);
  // const [user] = useUserStore((state) => [state.user]);
  const { token } = theme.useToken();
  const [open, setOpen] = React.useState(false);
  const [bookingDetail, setBookingDetail] = React.useState("");
  const [isOpenBooking, setIsOpenBooking] = React.useState(false);
  const [openConfirmForm, setOpenConfirmForm] = React.useState(false);

  const [status, setStatus] = React.useState(bookingList?.status);
  const [valueRate, setValueRate] = React.useState("");
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const handleOpenModal = (info) => {
    setBookingDetail(info);
    setIsOpenBooking(true);
  };

  const handleDone = (info) => {
    setStatus((info.status = "Done"));
    const formData = new FormData();
    formData.append("booking", JSON.stringify(info));

    axios
      .put("http://localhost:4000/api/client/check-done", formData, {
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
        disabled: info?.status !== "Processing",
      },
      cancelText: "No",
      onOk() {
        if (action === "Done") {
          handleDone(info);
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const containerStyle = {
    position: "relative",
    height: "100%",
    overflow: "hidden",
    textAlign: "center",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleSendFeedback = () => {
    setOpenConfirmForm(false);
    setOpen(false);
    // console.log(valueRate);
    bookingList.feedback = valueRate;
    const formData = new FormData();
    formData.append("booking", JSON.stringify(bookingList));

    axios
      .put("http://localhost:4000/api/client/send-feedback", formData, {
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
  return (
    <>
      <div style={containerStyle}>
        <Modal
          centered
          icon={ExclamationCircleOutlined}
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <ExclamationCircleOutlined
                style={{ marginRight: "5px", color: "#faad14" }}
              />
              <p>Sure to send feedback?</p>
            </div>
          }
          open={openConfirmForm}
          onOk={handleSendFeedback}
          onCancel={() => {
            setOpenConfirmForm(false);
            setValueRate(0);
          }}
          okText="Ok"
          cancelText="Cancel"
          width="450px"
        >
          <div style={{ padding: "10px 40px" }}>
            <p>You can only send feedback once!</p>
          </div>
        </Modal>
        {/* ----------------------Modal booking---------------------- */}
        <Modal
          className="custom-modal"
          centered
          open={isOpenBooking}
          footer={null}
          onCancel={() => setIsOpenBooking(false)}
          width={900}
          bodyStyle={{ borderRadius: "30px" }}
        >
          <ClientHistoryBookingModal bookingItem={bookingDetail} />
        </Modal>

        <div className="client-history-card">
          <div className="client-history-card-content">
            <p style={{ width: "18.8%" }}>{bookingList?.kolName}</p>
            <p style={{ width: "12.1%" }}>{bookingList?.platform}</p>
            <p style={{ width: "17.1%" }}>
              {getFormatContent(bookingList?.formatContent)}
            </p>

            <p style={{ width: "10%" }}>{bookingList?.quantity}</p>
            <p style={{ width: "12%" }}>{bookingList?.status}</p>
            <p style={{ width: "15%" }}>{bookingList?.startDate}</p>
            <p style={{ width: "15%" }}>{bookingList?.endDate}</p>
          </div>
          <div className="client-history-card-icons">
            <div className="client-history-card-icon">
              <Icon
                icon="majesticons:open"
                width="26"
                height="26"
                onClick={() => handleOpenModal(bookingList)}
              />
            </div>

            <Button
              className="client-history-card-icon"
              onClick={() => showConfirm(bookingList, "Done")}
              disabled={
                bookingList?.status === "Done" ||
                bookingList?.status === "Pending" ||
                bookingList?.status === "Rejected"
              }
              icon={
                <Icon
                  icon="iconoir:check"
                  color={
                    bookingList?.status === "Done" ||
                    bookingList?.status === "Pending" ||
                    bookingList?.status === "Rejected"
                      ? "#ccc"
                      : "#0bfa00"
                  }
                  width="30"
                  height="30"
                />
              }
            ></Button>
            <Button
              className="client-history-card-feedback"
              type="link"
              onClick={showDrawer}
              disabled={
                bookingList?.status === "Pending" ||
                bookingList?.status === "Processing" ||
                bookingList?.status === "Rejected" ||
                bookingList?.feedback == 1 ||
                bookingList?.feedback == 2 ||
                bookingList?.feedback == 3 ||
                bookingList?.feedback == 4 ||
                bookingList?.feedback == 5
              }
            >
              Send feedback
            </Button>
          </div>
          <Drawer
            placement="right"
            closable={false}
            open={open}
            getContainer={false}
          >
            <div style={{ position: "relative" }}>
              <CloseOutlined
                className="close-feedback-icon"
                onClick={onClose}
              />
              <div>
                <Rate
                  tooltips={desc}
                  onChange={(e) => {
                    setValueRate(e);
                    setOpenConfirmForm(true);
                  }}
                  value={valueRate}
                />
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default ClientHistoryBookingCard;
