import React from "react";
import "./InfluencerReportLayout.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import InfluencerProfileCard from "../../../../Components/InfluencerProfileCard/InfluencerProfileCard";
import InfluUpdateProfileModal from "../../../../Components/InfluUpdateProfileModal/InfluUpdateProfileModal";
import { ReactComponent as IconArrow } from "../../../../Assets/Icon/IconArrow.svg";
import { List, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Buttons from "../../../../Components/UI/Buttons";
import { VERSION_PROFILE_INFLU } from "../../../HomePage/ConstHomePage";
import { useInfluStore } from "../../../../Stores/influencer";

const InfluencerReportLayout = () => {
  const [influ] = useInfluStore((state) => [state.influ]);
  const [previewInflu, setPreviewInflu] = React.useState(influ);
  const [isChange, setIsChange] = React.useState(false);
  // const [isClose, setIsClose] = React.useState(false);
  const [openConfirmForm, setOpenConfirmForm] = React.useState(false);
  const [isOpenProfileInflu, setIsOpenProfileInflu] = React.useState(false);

  const [versionProfile, setVersionProfile] = React.useState(
    VERSION_PROFILE_INFLU
  );

  const handleOpenModal = () => {
    setIsOpenProfileInflu(true);
  };

  // React.useEffect(() => {
  //   setIsOpenProfileInflu(false);
  // }, [influInfo]);

  const [sortOption, setSortOption] = React.useState("Choose Option");
  const items = [
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Monthly
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Yearly
        </p>
      ),
      key: "1",
    },
  ];
  console.log("change", isChange);
  const handleClose = () => {
    // setIsClose(true);
    if (isChange) {
      setOpenConfirmForm(true);
    } else {
      setIsOpenProfileInflu(false);
      // setIsClose(false);
    }
  };

  const handleeCloseConfirmForm = () => {
    setOpenConfirmForm(false);
    setIsChange(false);
    setIsOpenProfileInflu(false);
    setPreviewInflu(influ);
  };
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
        onOk={handleeCloseConfirmForm}
        onCancel={() => setOpenConfirmForm(false)}
        okText="Ok"
        cancelText="Cancel"
        width="400px"
      >
        <div style={{ padding: "10px 40px" }}>
          <p>You sure??????</p>
        </div>
      </Modal>
      <Modal
        className="custom-modal"
        centered
        open={isOpenProfileInflu}
        footer={null}
        afterClose={handleClose}
        onCancel={handleClose}
        width={1400}
        bodyStyle={{ borderRadius: "30px" }}
      >
        <InfluUpdateProfileModal
          setIsChange={setIsChange}
          influ={influ}
          previewInflu={previewInflu}
          setPreviewInflu={setPreviewInflu}
        />
      </Modal>
      <div className="influencer-report-layout">
        <div className="influencer-report-title">
          <p>VERSION REPORT</p>
          <div className="report-filter">
            <div className="report-sort-by">
              <Dropdown menu={{ items }} trigger={"click"}>
                <a>
                  <Space>Monthly</Space>
                </a>
              </Dropdown>
              <DownOutlined />
            </div>
          </div>
        </div>
        <div className="col-12 mt-3">
          <div className="button-block mt-5">
            <Buttons
              className="update-btn"
              text="Update Now"
              icon={<IconArrow />}
              onClick={() => handleOpenModal()}
            />
          </div>
        </div>
        <div className="influencer-report-list">
          <List
            grid={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },

              pageSize: 6,
              position: "bottom",
              align: "center",
            }}
            dataSource={versionProfile}
            renderItem={(item, index) => (
              <List.Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "423px",
                  height: "270px",
                }}
              >
                <div>
                  {index === 0 ? (
                    <InfluencerProfileCard profileInflu={influ} />
                  ) : (
                    <InfluencerProfileCard profileInflu={item} />
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};
export default InfluencerReportLayout;
