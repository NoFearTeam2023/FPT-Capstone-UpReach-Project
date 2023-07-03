import React, { useState } from "react";
import "./ProfileCardLayout.css";
import { Col, Row } from "antd";
import ProfileCardComponent from "../../../Components/Layouts/ProfileCardComponent/ProfileCardComponent";
import { Modal } from "antd";
import InfluProfile from "../../../Components/InfluProfileModal/InfluProfile";
import { Pagination } from "antd";

const ProfileCardLayout = () => {
  const [profileCards, setProfileCards] = useState(Array(12).fill(false));

  const handleOpenModal = (index) => {
    const updatedModals = [...profileCards];
    updatedModals[index] = true;
    setProfileCards(updatedModals);
  };

  const handleCloseModal = (index) => {
    const updatedModals = [...profileCards];
    updatedModals[index] = false;
    setProfileCards(updatedModals);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <>
      {profileCards.map((isOpen, index) => (
        <Modal
          key={index}
          style={{ backgroundColor: "#ccc", borderRadius: "30px" }}
          centered
          open={isOpen}
          footer={null}
          onCancel={() => handleCloseModal(index)}
          width={1400}
          bodyStyle={{ borderRadius: "30px" }}
        >
          <InfluProfile />
        </Modal>
      ))}
      <div className="profile-card-layout">
        <Row gutter={[16, 16]}>
          {profileCards.map((isClosed, index) => (
            <Col
              key={index}
              span={5.5}
              className="profile-card"
              onClick={() => handleOpenModal(index)}
            >
              <ProfileCardComponent />
            </Col>
          ))}
        </Row>
        <Pagination
          itemRender={itemRender}
          total={108}
          pageSize={12}
          showSizeChanger={false}
          className="profile-pagination"
        />
      </div>
    </>
  );
};

export default ProfileCardLayout;
