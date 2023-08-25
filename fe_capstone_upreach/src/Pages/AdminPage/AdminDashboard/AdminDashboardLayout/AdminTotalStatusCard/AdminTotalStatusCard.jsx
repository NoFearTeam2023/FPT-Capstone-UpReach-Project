import React from "react";
import "./AdminTotalStatusCard.css";
import AdminStatusCard from "../../../../../Components/AdminStatusCard/AdminStatusCard";
import { Row, Col, Spin } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";

const AdminTotalStatusCard = ({ listClient, listInflu }) => {
  const [listUser, setListUser] = React.useState([]);
  const [listBooking, setListBooking] = React.useState([]);
  const [listKOL, setListKOL] = React.useState([]);
  const [force, setForce] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const totalUsers = listInflu.length + listClient.length;
    setListUser(totalUsers);
  }, [listInflu, listClient]);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/get-total-booking", {
        params: {
          // email: user.influencerEmail,
        },
      })
      .then((response) => {
        const booking = response?.data?.data;
        setListBooking(booking);
      })
      .catch((error) => {
        console.error("Error while fetching list booking information:", error);
      });
  }, [force]);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/get-total-list", {
        params: {
          // email: user.influencerEmail,
        },
      })
      .then((response) => {
        const kolList = response?.data?.data;
        setListKOL(kolList);
      })
      .catch((error) => {
        console.error("Error while fetching list booking information:", error);
      });
  }, [force]);
  // console.log(listBooking);
  return (
    <>
      <div className="admin-total-status-card-bg">
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <AdminStatusCard
              title={"Influencers"}
              value={listInflu?.length}
              className="totalUserCard"
              icon={
                <Icon
                  icon="vaadin:user-star"
                  color="white"
                  width="28"
                  height="26"
                />
              }
            />
          </Col>
          <Col span={6}>
            <AdminStatusCard
              title={"Lists"}
              value={listKOL?.length}
              className="totalUserCard"
              icon={
                <Icon icon="ion:list" color="white" width="32" height="32" />
              }
            />
          </Col>
          <Col span={6}>
            <AdminStatusCard
              title={"Booking"}
              value={listBooking?.length}
              className="totalUserCard"
              icon={
                <Icon
                  icon="fluent-mdl2:activate-orders"
                  color="white"
                  width="32"
                  height="32"
                />
              }
            />
          </Col>
          <Col span={6}>
            <AdminStatusCard
              title={"Users"}
              value={listUser}
              className="totalUserCard"
              icon={
                <Icon
                  icon="majesticons:user"
                  color="white"
                  width="32"
                  height="32"
                />
              }
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminTotalStatusCard;
