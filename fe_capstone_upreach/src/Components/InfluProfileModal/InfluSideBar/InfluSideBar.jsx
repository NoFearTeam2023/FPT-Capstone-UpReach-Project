import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";
import "./InfluSideBar.css";
import "../../../CSS/Theme.css";
import {
  Button,
  Tooltip,
  Dropdown,
  Checkbox,
  Row,
  Col,
  Modal,
  Rate,
} from "antd";
import { ReactComponent as Facebook } from "../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Location } from "../../../Assets/Icon/Location.svg";
import { ReactComponent as Diamond } from "../../../Assets/Icon/Diamond.svg";
import { Link } from "react-router-dom";
import { LIST_TYPE_SEARCH } from "../../../Pages/HomePage/ConstHomePage";
import React, { useState, useEffect } from "react";
import ApiListInfluecer from "../../../Api/ApiListInfluecer";
import { v4 as uuid } from "uuid";
import {
  HeartOutlined,
  MailFilled,
  PhoneFilled,
  LockFilled,
} from "@ant-design/icons";
import { useUserStore } from "../../../Stores/user";
import { useNavigate } from "react-router-dom";
import ApiGetInfoAndFilterInfluencer from "../../../Api/ApiGetInfoAndFilterInfluencer";

function RenderListCheckbox({
  valueCheckbox,
  titleCheckbox,
  status,
  roleClient,
}) {
  return (
    <Col span={24}>
      <Checkbox disabled={status == 1 ? true : false} value={valueCheckbox}>
        {titleCheckbox}
      </Checkbox>
    </Col>
  );
}

const InfluSideBar = ({ influInfo }) => {
  const [user] = useUserStore((state) => [state.user]);
  const [isUpgraded, setIsUpGraded] = useState(false);
  const [badgeColor, setBadgeColor] = useState("");
  const [listSelected, setListSelected] = useState();
  const [listInfluencer, setListInfluencer] = useState([]);
  const [idAccClient, setIdAccClient] = useState("");
  const navigate = useNavigate();
  const [roleClient, setRoleClient] = useState("Free");
  const [isEnableAddBtn, setIsEnableAddBtn] = useState(true);
  const [valueRate, setValueRate] = React.useState(0);

  // coundown popup success
  const countDownSuccess = () => {
    let secondsToGo = 2;

    const instance = Modal.success({
      style: { top: "75vh", marginLeft: "2%" },
      title: "Success",
      closable: "true",
      destroyOnClose: "true",
      footer: "",
      zIndex: "1001",
      width: "600px",
      content: "Added to a list successful ",
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  function SaveToListOnClick() {
    fetchDataGetList(influInfo?.influencerId);
  }

  //====================== Get Data Back End Of List ======================
  const fetchDataGetList = async (kOLsID) => {
    try {
      const dataLocalStorge = await JSON.parse(
        localStorage.getItem("user-draw-storage")
      ).state?.user?.Client_ID;
      setIdAccClient(dataLocalStorge);
      const response = (
        await ApiListInfluecer.getStatusListOfKOLs(dataLocalStorge, kOLsID)
      ).data;
      setListInfluencer(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const fetchGetRoleClient = async () => {
    try {
      const EmailUser = await JSON.parse(
        localStorage.getItem("user-draw-storage")
      ).state.user.email;
      console.log(EmailUser);
      const response = await ApiGetInfoAndFilterInfluencer.getDataClient(
        EmailUser
      );
      setRoleClient(response.Client.plan);
      console.log(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const fetchAddTableKOLs = async (listKOLsID, kOLsID, idList) => {
    try {
      const dataLocalStorge = await JSON.parse(
        localStorage.getItem("user-draw-storage")
      ).state?.user?.Client_ID;
      setIdAccClient(dataLocalStorge);
      const response = await ApiListInfluecer.addTableKOLs(
        listKOLsID,
        kOLsID,
        idList
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  //========================================================================
  const OnChange = (checkedValues) => {
    setListSelected(checkedValues);

    console.log(checkedValues);
    setIsEnableAddBtn(false);
    if (checkedValues.length == 0) {
      setIsEnableAddBtn(true);
    }
  };
  //click add to list
  const AddTableKOLs = (e) => {
    listSelected.forEach((idListSelected) => {
      const listKOLsID = uuid()?.slice(0, 8);
      fetchAddTableKOLs(listKOLsID, influInfo?.influencerId, idListSelected);
    });

    fetchDataGetList(influInfo.influencerId);
    countDownSuccess();
  };
  useEffect(() => {
    switch (influInfo?.influencerTypeName?.at(0)) {
      case "Professional":
        setBadgeColor("#C837AB");
        break;
      case "Talent":
        setBadgeColor("#FFDD55");
        break;
      case "Celebrity":
        setBadgeColor("#218DE8");
        break;
      case "Community":
        setBadgeColor("#FF004F");
        break;
      case "Citizen":
        setBadgeColor("#96F0AF");
        break;
      default:
        return;
    }
  }, [influInfo?.influencerTypeName]);

  useEffect(() => {
    fetchGetRoleClient();
  }, []);

  useEffect(() => {
    fetchDataGetList(influInfo?.influencerId);
  }, [influInfo?.influencerId]);

  useEffect(() => {
    if (user?.planId !== "P04") {
      setIsUpGraded(true);
    } else {
      setIsUpGraded(false);
    }
  }, [user?.planId]);
  return (
    <>
      <div className="influ-side-bar-container">
        <div className="side-bar-header-body">
          <div className="influ-side-bar-header">
            <img
              className="profile-avatar"
              src={influInfo?.Avatar === null ? default_img : influInfo?.Avatar}
              alt=""
            />
            <p className="profile-name">{influInfo?.influencerfullName}</p>
            <div className="badge-block">
              <div
                style={{
                  border: `2px solid ${badgeColor}`,
                }}
                className="badge-text"
              >
                <Diamond
                  style={{
                    height: "15px",
                    fill: `${badgeColor}`,
                    marginRight: "8px",
                  }}
                />

                {/* {influInfo?.influencerContentTopicName} */}

                <p>{influInfo?.influencerTypeName?.at(0)}</p>
              </div>
            </div>
            {/* <Button
              className="profile-btn"
              type="primary"
              shape="round"
              size="large"
            >
              <p
                style={{ fontWeight: "700", marginTop: "-1px", color: "#000" }}
              >
                Add to list
              </p>
            </Button> */}
            <Dropdown
              dropdownRender={() => (
                <div className={"popupFilter shadowBox"}>
                  <div className="titleAddToList">
                    Save in one or more lists
                  </div>
                  <div className="mb-2">List move this influencer to:</div>
                  <Checkbox.Group
                    style={{
                      width: "700px",
                    }}
                    onChange={OnChange}
                    value={listSelected}
                  >
                    <Row>
                      {roleClient === "Free" && listInfluencer?.length > 0 ? (
                        <RenderListCheckbox
                          valueCheckbox={listInfluencer[0].ClientLists_ID}
                          titleCheckbox={listInfluencer[0].Name_list}
                          status={listInfluencer[0].Status}
                          influInfo={influInfo}
                          roleClient={roleClient}
                        />
                      ) : (
                        listInfluencer?.map((item, index) => (
                          <RenderListCheckbox
                            key={index}
                            valueCheckbox={item.ClientLists_ID}
                            titleCheckbox={item.Name_list}
                            status={item.Status}
                            influInfo={influInfo}
                            roleClient={roleClient}
                          />
                        ))
                      )}
                    </Row>
                  </Checkbox.Group>
                  <Button
                    className="add-list-btn"
                    type="default"
                    shape="round"
                    size="large"
                    onClick={AddTableKOLs}
                    disabled={isEnableAddBtn}
                  >
                    <p
                      style={{
                        fontWeight: "700",
                        marginTop: "-1px",
                        color: "#000",
                      }}
                    >
                      Add
                    </p>
                  </Button>
                </div>
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button
                  className="profile-btn"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={SaveToListOnClick}
                >
                  <p
                    style={{
                      fontWeight: "700",
                      marginTop: "-1px",
                      color: "#000",
                    }}
                  >
                    Add to list
                  </p>
                </Button>
              </a>
            </Dropdown>
            <div className="profile-feedback">
              <Rate value={valueRate} disabled allowHalf />
              <p>(0)</p>
            </div>
          </div>
          <div className="influ-side-bar-body">
            <p className="profile-description">Description & Content type</p>
            <div className="profile-contents">
              <div className="profile-content">
                <div className="d-flex w-100">
                  {influInfo?.influencerContentTopicName
                    ?.slice(0, 3)
                    .map((topic, index) => (
                      <div key={index} className="profile-topic">
                        <Tooltip placement="top" title={topic}>
                          {/* <div className="profile-topic"> */}
                          {topic?.length > 7
                            ? `${topic?.slice(0, 7)}...`
                            : topic}
                          {/* </div> */}
                        </Tooltip>
                      </div>
                    ))}
                </div>
                <div className="profile-location">
                  <Location style={{ marginRight: "8px" }} />
                  <p>{influInfo?.influencerAddress}</p>
                </div>
                <div className="profile-gender">
                  <p style={{ marginRight: "5px" }}>Gender:</p>
                  <p>{influInfo?.influencerGender}</p>
                </div>
                <div className="profile-age">
                  <p style={{ marginRight: "5px" }}>Age:</p>
                  <p>{influInfo?.influencerAge}</p>
                </div>
                <div className="profile-marriage-status">
                  <HeartOutlined style={{ marginRight: "8px" }} />

                  <p>{influInfo?.influencerRelationship}</p>
                </div>
              </div>
              <div className="profile-biography">
                <p className="profile-biography-title">Biography</p>
                <p className="profile-biography-content">
                  {influInfo?.influencerBio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="influ-side-bar-footer">
          <div className="footer-content">
            <p className="profile-contact">Contact information</p>
            <div className={`contact-info`}>
              {roleClient !== "Free" ? (
                ""
              ) : (
                <div className="upgrade-btn">
                  <Button
                    type="primary"
                    shape="round"
                    icon={<LockFilled />}
                    size={"large"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#000",
                    }}
                    onClick={() => {
                      navigate("/upgrade");
                    }}
                  >
                    Upgrade
                  </Button>
                </div>
              )}

              <div
                className={`contact-email ${
                  roleClient === "Free" ? "blur-data-to-payment" : ""
                }`}
              >
                <MailFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{influInfo?.influencerEmail}</p>
              </div>
              <div
                className={`contact-phone ${
                  roleClient === "Free" ? "blur-data-to-payment" : ""
                }`}
              >
                <PhoneFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{influInfo?.influencerPhone}</p>
              </div>
            </div>
          </div>
          <div className="feedback-btn"></div>
        </div>
      </div>
    </>
  );
};

export default InfluSideBar;
