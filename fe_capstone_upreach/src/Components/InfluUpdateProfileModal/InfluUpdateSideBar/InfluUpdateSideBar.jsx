import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";
import "./InfluUpdateSideBar.css";
import { Tooltip } from "antd";
import { ReactComponent as Facebook } from "../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Location } from "../../../Assets/Icon/Location.svg";
import { ReactComponent as Diamond } from "../../../Assets/Icon/Diamond.svg";
import React from "react";
import roundNumber from "../roundNumber";
import { HeartOutlined, MailFilled, PhoneFilled } from "@ant-design/icons";
import { useUserStore } from "../../../Stores/user";

const InfluSideBar = ({ oldVerInflu, influInfo }) => {
  const [user] = useUserStore((state) => [state.user]);

  const [badgeColor, setBadgeColor] = React.useState("");
  React.useEffect(() => {
    if (oldVerInflu?.influencerTypeName?.at(0)) {
      switch (oldVerInflu?.influencerTypeName?.at(0)) {
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
    }
  }, [oldVerInflu?.influencerTypeName]);

  return (
    <>
      <div className="influ-update-side-bar-container">
        <div className="side-bar-header-body">
          <div className="influ-side-bar-header">
            <img
              className="profile-avatar"
              src={user?.avatar || default_img}
              alt=""
              onError={(e) => {
                e.target.src = default_img;
              }}
            />
            <p className="profile-name">{oldVerInflu?.influencerfullName}</p>
            <div className="badge-block">
              {oldVerInflu?.influencerTypeName &&
                oldVerInflu?.influencerTypeName?.at(0) !== null && (
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
                    {oldVerInflu?.influencerTypeName?.at(0)}
                  </div>
                )}
            </div>
            <div className="profile-socials-wrapper">
              <div className="profile-socials">
                <div className="profile-social">
                  <Facebook className="profile-social-icon" />
                  <p>{roundNumber(influInfo?.influencerFollowFb || 0)}</p>
                </div>
                <div className="profile-social">
                  <Instagram className="profile-social-icon" />
                  <p>{roundNumber(influInfo?.influencerFollowInsta || 0)}</p>
                </div>
                <div className="profile-social">
                  <Youtube className="profile-social-icon" />
                  <p>{roundNumber(influInfo?.influencerFollowYoutube || 0)}</p>
                </div>
                <div className="profile-social">
                  <Tiktok className="profile-social-icon" />
                  <p>{roundNumber(influInfo?.influencerFollowTikTok || 0)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="influ-side-bar-body">
            <p className="profile-description">Description & Content type</p>
            <div className="profile-contents">
              <div className="profile-content">
                <div className="profile-topics">
                  {Array.isArray(oldVerInflu?.influencerContentTopicName)
                    ? oldVerInflu?.influencerContentTopicName
                        ?.filter((topic) => topic !== null)
                        ?.map((topic, index) => (
                          <div key={index} className="profile-topic">
                            <Tooltip placement="top" title={topic}>
                              <div>
                                {topic?.length > 8
                                  ? `${topic?.slice(0, 8)}...`
                                  : topic}
                              </div>
                            </Tooltip>
                          </div>
                        ))
                    : oldVerInflu?.influencerContentTopicName !== null && (
                        <div className="profile-topic">
                          <Tooltip
                            placement="top"
                            title={oldVerInflu?.influencerContentTopicName}
                          >
                            <div>
                              {oldVerInflu?.influencerContentTopicName?.length >
                              8
                                ? `${oldVerInflu?.influencerContentTopicName?.slice(
                                    0,
                                    8
                                  )}...`
                                : oldVerInflu?.influencerContentTopicName}
                            </div>
                          </Tooltip>
                        </div>
                      )}
                </div>
                <div className="profile-location">
                  <Location style={{ marginRight: "8px" }} />
                  <p>{oldVerInflu?.influencerAddress}</p>
                </div>
                <div className="profile-gender">
                  <p style={{ marginRight: "5px" }}>Gender:</p>
                  <p>{oldVerInflu?.influencerGender}</p>
                </div>
                <div className="profile-age">
                  <p style={{ marginRight: "5px" }}>Age:</p>
                  <p>{oldVerInflu?.influencerAge}</p>
                </div>
                <div className="profile-marriage-status">
                  <HeartOutlined style={{ marginRight: "8px" }} />

                  <p>{oldVerInflu?.influencerRelationship}</p>
                </div>
              </div>
              <div className="profile-biography">
                <p className="profile-biography-title">Biography</p>
                <p className="profile-biography-content">
                  {oldVerInflu?.influencerBio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="influ-side-bar-footer">
          <div className="footer-content">
            <p className="profile-contact">Contact information</p>
            <div className="contact-info ">
              <div className={"contact-email"}>
                <MailFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{oldVerInflu?.influencerEmail}</p>
              </div>
              <div className={"contact-phone"}>
                <PhoneFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{oldVerInflu?.influencerPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluSideBar;
