import React, { useState, useEffect } from "react";
import ProfileCardComponent from "../../Components/Layouts/ProfileCardComponent/ProfileCardComponent";
import ProfileCardLayout from "../HomePage/ProfileCardLayout/ProfileCardLayout";
import { Link } from "react-router-dom";
import ApiGetInfoAndFilterInfluencer from "../../Api/ApiGetInfoAndFilterInfluencer";
import { FireFilled } from "@ant-design/icons";
import { List, Spin, Space, Modal } from "antd";
import PointAndHistoryReport from "../../Api/ApiPointAndHistoryReport";
import InfluProfile from "../../Components/InfluProfileModal/InfluProfile";

const MyHistoryReportPage = () => {
  const [isOpenProfileInflu, setIsOpenProfileInflu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [influInfo, setinfluInfo] = useState();
  const handleOpenModal = async (info) => {
    try {
      setinfluInfo(info);
      setIsOpenProfileInflu(true);
      // caculator point
    } catch (error) {
      console.log(error);
    }
  };

  const [historyInfluencer, setHistoryInfluencer] = useState();
  //============================= Edit Name List DB BE =============================

  const getAllDataHistory = async () => {
    try {
      const User = await JSON.parse(localStorage.getItem("user-draw-storage"))
        .state.user;
      const response = await PointAndHistoryReport.getAllHistoryReport(
        User.Client_ID
      );
      // if (response.Status == "Success") {
      //   setFlagChangeNameList(!flagChangeNameList);
      // }
      console.log(response);
      setHistoryInfluencer(response);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  console.log(historyInfluencer);
  //===================================================================================
  useEffect(() => {
    getAllDataHistory();
  }, []);
  return (
    <>
      <Modal
        className="custom-modal"
        destroyOnClose={true}
        centered
        open={isOpenProfileInflu}
        footer={null}
        onCancel={() => setIsOpenProfileInflu(false)}
        width={1400}
        bodyStyle={{ borderRadius: "30px" }}
      >
        <InfluProfile profileInflu={influInfo} />
      </Modal>

      <div className="profile-card-layout">
        <Spin size="large" spinning={loading}>
          <List
            grid={{
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 3,
            }}
            pagination={{
              onChange: (page) => {
                // fetchDataGetList(page);
              },
              pageSize: 12,
              position: "bottom",
              align: "center",
            }}
            dataSource={historyInfluencer?.data}
            renderItem={(item) => (
              <List.Item
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => handleOpenModal(item)}
              >
                <ProfileCardComponent profileInflu={item} />
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </>
  );
};

export default MyHistoryReportPage;
