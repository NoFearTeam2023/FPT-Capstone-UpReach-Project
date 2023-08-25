import React, { useState, useEffect } from "react";
import "./ProfileCardLayout.css";
import ProfileCardComponent from "../../../Components/Layouts/ProfileCardComponent/ProfileCardComponent";
import InfluProfile from "../../../Components/InfluProfileModal/InfluProfile";
import { Modal, Spin, List } from "antd";
import { PROFILE_INFLUS } from "../ConstHomePage";
import ApiInfluencer from "../../../Api/ApiInfluencer";
import { FireFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PointAndHistoryReport from "../../../Api/ApiPointAndHistoryReport";

const ProfileCardLayout = ({
  allInfluencer,
  loading,
  setpointReport,
  pointReport,
  isShowPopupUpgrade,
  setIsShowPopupUpgrade,
  setLoadingFullPage,
}) => {
  const [influInfo, setInfluInfo] = useState("");
  const [isOpenProfileInflu, setIsOpenProfileInflu] = useState(false);
  const [idInfluMongoDB, setIdInfluMongoDB] = useState();
  const [profileInflus, setProfileInflus] = useState(PROFILE_INFLUS);
  // const [isShowPopupUpgrade, setIsShowPopupUpgrade] = useState(false);
  const [isExitsHistoryReport, setIsExitsHistoryReport] = useState(false);
  const [user, setUser] = useState();

  // Time out popup
  const countDownPopupSubPoint = () => {
    let secondsToGo = 2;

    const instance = Modal.info({
      style: { top: "75vh", marginLeft: "2%" },
      title: "Info",
      closable: "true",
      destroyOnClose: "true",
      footer: "",
      zIndex: "1001",
      width: "600px",
      content: "Your remaining balance will be: " + (pointReport - 1) + ".",
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };
  // ============================================================

  // BE addDataToHistoryReport updatePointReport
  // const addDataToHistoryReport = async (InfluencerId) => {
  //   try {
  //     const User = await JSON.parse(localStorage.getItem("user-draw-storage"))
  //       .state.user;
  //     const response = await PointAndHistoryReport.insertDataToHistory(
  //       InfluencerId,
  //       User.Client_ID
  //     );
  //     if (response.status === "True") {
  //       setIsExitsHistoryReport(false);
  //     } else {
  //       setIsExitsHistoryReport(true);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  const updatePointReport = async (PointReport) => {
    try {
      // const User = await JSON.parse(localStorage.getItem("user-draw-storage"))
      //   .state.user;
      const response = await PointAndHistoryReport.updatePointReport(
        user.Client_ID,
        PointReport
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const influencerEmail = async (info) => {
    try {
      const influencerEmail = info?.influencerEmail;
      const idInfluencerInMongoDB = await ApiInfluencer.getIDInfluencer(
        influencerEmail
      );
      setIdInfluMongoDB(idInfluencerInMongoDB.data._id);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const handleOpenModal = async (info) => {
    try {
      setLoadingFullPage(true);
      const response = await PointAndHistoryReport.insertDataToHistory(
        info.influencerId,
        user.Client_ID
      );
      setInfluInfo(info);
      // open popup client
      setIsOpenProfileInflu(true);
      // check and add point
      if (pointReport - 1 > 0) {
        if (response.status === "True") {
          countDownPopupSubPoint();
          updatePointReport(pointReport - 1);
          setpointReport(pointReport - 1);
        }
      } else {
        setIsOpenProfileInflu(false);
        setIsShowPopupUpgrade(true);
      }
      setLoadingFullPage(false);
      influencerEmail(info);
    } catch (error) {
      console.log(error);
    }
  };
  //=============================================================
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user-draw-storage")).state
      .user;
    setUser(User);
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
        s
        bodyStyle={{ borderRadius: "30px" }}
      >
        <InfluProfile profileInflu={influInfo} />
      </Modal>

      <div className="profile-card-layout">
        <Spin size="large" spinning={loading}>
          <List
            grid={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            pagination={{
              onChange: (page) => {
                // fetchDataGetList(page);
              },
              pageSize: 12,
              position: "bottom",
              align: "center",
            }}
            dataSource={allInfluencer?.data}
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
      <Modal
        title="Upgrade to unlock more reports"
        className="popup-add-new"
        open={isShowPopupUpgrade}
        onCancel={() => {
          setIsShowPopupUpgrade(false);
        }}
        destroyOnClose={true}
        footer={null}
      >
        <div className="row">
          <div className="col-1 bg-white"></div>
          <div className="col-10">
            You’ve used all of your available influencer reports.
            <div></div>
            To unlock more reports, go to your pricing page to upgrade your
            plan.
            <div></div>
            <Link to="/upgrade">
              <button className="bg-dark margin-46-per btnUpgrade">
                <FireFilled
                  style={{
                    color: "orange",
                    fontSize: "32px",
                  }}
                />{" "}
                Upgrade now
              </button>
            </Link>
          </div>
          <div className="col-1 bg-white"></div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileCardLayout;
