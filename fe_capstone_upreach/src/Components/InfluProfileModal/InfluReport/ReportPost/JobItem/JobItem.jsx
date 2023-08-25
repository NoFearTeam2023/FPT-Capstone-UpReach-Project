import React from "react";
import "./JobItem.css";
import { ReactComponent as Facebook } from "../../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../../../Assets/Icon/Youtube.svg";
import { ReactComponent as TikTok } from "../../../../../Assets/Icon/Tiktok.svg";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import ClientBookingModal from "../../../../../Components/ClientBookingModal/ClientBookingModal";
import { useUserStore } from "../../../../../Stores/user";

const JobItem = ({ data }) => {
  // const [user] = useUserStore((state) => [state.user]);

  const [isChange, setIsChange] = React.useState(false);
  const [openConfirmForm, setOpenConfirmForm] = React.useState(false);
  const [isOpenBooking, setIsOpenBooking] = React.useState(false);

  const handleOpenModal = () => {
    setIsOpenBooking(true);
  };

  const handleClose = () => {
    if (isChange) {
      setOpenConfirmForm(true);
    } else {
      setIsOpenBooking(false);
    }
  };

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
    setIsChange(false);
    setIsOpenBooking(false);
  };

  // const check = (user, data) => {
  //   const isClientBooking = data.clientId.includes(user.Client_ID);
  //   console.log(isClientBooking);
  //   return isClientBooking;
  // };
  // console.log(check(user, data));
  return (
    <>
      <Modal
        centered
        icon={ExclamationCircleOutlined}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <ExclamationCircleOutlined
              style={{ marginRight: "5px", color: "#faad14" }}
            />
            <p>Confirm</p>
          </div>
        }
        open={openConfirmForm}
        onOk={handleCloseConfirmForm}
        onCancel={() => setOpenConfirmForm(false)}
        okText="Ok"
        cancelText="Cancel"
        width="400px"
      >
        <div style={{ padding: "10px 40px" }}>
          <p>Sure to cancel?</p>
        </div>
      </Modal>
      <Modal
        className="custom-modal"
        centered
        open={isOpenBooking}
        footer={null}
        onCancel={() => setIsOpenBooking(false)}
        width={900}
        bodyStyle={{ borderRadius: "30px" }}
      >
        <ClientBookingModal
          setIsChange={setIsChange}
          data={data}
          setIsOpenBooking={setIsOpenBooking}
        />
      </Modal>
      <div className="report-post-item">
        <div className="post-item-title">
          {(() => {
            switch (data?.jobPlatform) {
              case "facebook":
                return <Facebook className="social-icon" />;
              case "instagram":
                return <Instagram className="social-icon" />;
              case "youtube":
                return <Youtube className="social-icon" />;
              case "tiktok":
                return <TikTok className="social-icon" />;
              default:
                return "";
            }
          })()}
          <div className="post-item-sub-title">
            <p>{data?.jobName === undefined ? "" : data?.jobName}</p>
            <div>{data?.formatid}</div>
            <a>{data?.linkJob}</a>
          </div>
        </div>
        <div className="cover-quantity-cost">
          <p>Quantity: {data?.quantityNumberWork}</p>
          <p>
            Cost Estimate: {data?.costForm} ~ {data?.costTo} VND
          </p>
        </div>
        <div className="post-item-btn">
          <Button
            className="booking-btn"
            type="primary"
            onClick={handleOpenModal}
            // disabled={data?.clientId?.includes(user?.Client_ID)}
          >
            Booking
          </Button>
        </div>
      </div>
    </>
  );
};
export default JobItem;
