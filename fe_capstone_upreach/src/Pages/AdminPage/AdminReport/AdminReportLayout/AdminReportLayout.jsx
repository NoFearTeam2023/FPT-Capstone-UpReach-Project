import React from "react";
import "./AdminReportLayout.css";
import { List, Modal, Spin } from "antd";
import AdminApproveCard from "../../../../Components/AdminApproveCard/AdminApproveCard";
import ProfileCardComponent from "../../../../Components/Layouts/ProfileCardComponent/ProfileCardComponent";
import InfluProfile from "../../../../Components/InfluProfileModal/InfluProfile";
import AdminApproveProfile from "../../../../Components/AdminApproveProfileModal/AdminApproveProfile";
import axios from "axios";

const AdminReportLayout = () => {
  const [influInfo, setInfluInfo] = React.useState("");
  const [reportInfo, setReportInfo] = React.useState("");
  const [isOpenApproveProfile, setIsOpenApproveProfile] = React.useState(false);
  const [isOpenProfileInflu, setIsOpenProfileInflu] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [approveReport, setApproveReport] = React.useState([]);
  const [force, setForce] = React.useState(0);
  // console.log(approveReport);
  const handleOpenInfluModal = (info) => {
    setInfluInfo(info);
    setIsOpenProfileInflu(true);
  };

  const handleOpenApproveModal = (info) => {
    setReportInfo(info);
    setIsOpenApproveProfile(true);
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

  React.useLayoutEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/api/admin/get-approve-report", {
        params: {
          // email: user.influencerEmail,
        },
      })
      .then((response) => {
        const info = response?.data?.data;
        setApproveReport(info);
        // console.log(info);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [force]);

  return (
    <>
      {/* -----------------Approve Modal---------------------- */}
      <Modal
        className="custom-modal"
        centered
        open={isOpenApproveProfile}
        footer={null}
        onCancel={() => setIsOpenApproveProfile(false)}
        width={1400}
        bodyStyle={{ borderRadius: "30px" }}
      >
        <AdminApproveProfile
          approveReport={reportInfo}
          setForce={setForce}
          setIsOpenApproveProfile={setIsOpenApproveProfile}
        />
      </Modal>

      {/* ------------------------------------------ */}

      {/* -----------------Influ Modal---------------------- */}

      <Modal
        className="custom-modal"
        centered
        open={isOpenProfileInflu}
        footer={null}
        onCancel={() => setIsOpenProfileInflu(false)}
        width={1400}
        bodyStyle={{ borderRadius: "30px" }}
      >
        <InfluProfile profileInflu={influInfo} />
      </Modal>
      {/* ------------------------------------------ */}

      <div className="report-management-layout">
        <div className="report-management-wait">
          Wait to approve
          {/* -----------------Approve List---------------------- */}
          <Spin tip="Loading" size="large" spinning={isLoading}>
            <div className="report-management-wait-items">
              {approveReport?.map((item, index) => (
                <div
                  className="report-management-wait-item"
                  key={index}
                  onClick={() => handleOpenApproveModal(item)}
                >
                  <AdminApproveCard reportApprove={item} />
                </div>
              ))}
            </div>
          </Spin>
          {/* ----------------------------------------------------- */}
        </div>

        <div className="report-management-admin-view">
          {/* -----------------Influ List---------------------- */}

          {/* <div className="admin-view-title">All Influencer</div>
          <List
            grid={{
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },

              pageSize: 9,
              position: "bottom",
              align: "center",
            }}
            dataSource={profileInflus}
            renderItem={(item) => (
              <List.Item
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => handleOpenInfluModal(item)}
              >
                <ProfileCardComponent profileInflu={item} />
              </List.Item>
            )}
          /> */}
          {/* ------------------------------------------------ */}
        </div>
      </div>
    </>
  );
};
export default AdminReportLayout;
