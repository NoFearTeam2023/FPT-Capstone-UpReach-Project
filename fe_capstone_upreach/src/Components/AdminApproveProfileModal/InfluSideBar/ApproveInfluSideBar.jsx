import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";
import "./ApproveInfluSideBar.css";
import { Button, Tooltip, Avatar } from "antd";
import { ReactComponent as Facebook } from "../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Location } from "../../../Assets/Icon/Location.svg";
import { ReactComponent as Diamond } from "../../../Assets/Icon/Diamond.svg";
import roundNumber from "../../InfluUpdateProfileModal/roundNumber";
import { Link } from "react-router-dom";
import React from "react";
import {
  HeartOutlined,
  MailFilled,
  PhoneFilled,
  LockFilled,
} from "@ant-design/icons";

const ApproveInfluSideBar = ({ influInfo }) => {
  console.log(influInfo);

  return (
    <>
      <div className="approve-influ-side-bar-container">
        <div className="side-bar-header-body">
          <div className="influ-side-bar-header">
            <Avatar
              src={
                <img
                  src={influInfo?.profile?.Avatar || default_img}
                  alt="avatar"
                  onError={(e) => {
                    e.target.src = default_img;
                  }}
                />
              }
              className="profile-avatar"
            />
            <p className="profile-name">{influInfo?.profile?.fullName}</p>
            <div className="profile-socials">
              <div className="profile-social">
                <Facebook
                  className="profile-social-icon"
                  style={{ marginRight: "2px" }}
                />
                <p> {roundNumber(influInfo?.platform?.Follow_FB)}</p>
              </div>
              <div className="profile-social">
                <Instagram
                  className="profile-social-icon"
                  style={{ marginRight: "2px" }}
                />
                <p> {roundNumber(influInfo?.platform?.Follow_Insta)}</p>
              </div>
              <div className="profile-social">
                <Youtube
                  className="profile-social-icon"
                  style={{ marginRight: "2px" }}
                />
                <p> {roundNumber(influInfo?.platform?.Follow_Youtube)}</p>
              </div>
              <div className="profile-social">
                <Tiktok
                  className="profile-social-icon"
                  style={{ marginRight: "2px" }}
                />
                <p> {roundNumber(influInfo?.platform?.Follow_TikTok)}</p>
              </div>
            </div>
          </div>
          <div className="influ-side-bar-body">
            <p className="profile-description">Description & Content type</p>
            <div className="profile-contents">
              <div className="profile-content">
                <div className="profile-location">
                  <Location style={{ marginRight: "8px" }} />
                  <p>{influInfo?.profile?.Address}</p>
                </div>
                <div className="profile-gender">
                  <p style={{ marginRight: "5px" }}>Gender:</p>
                  <p>{influInfo?.profile?.Gender}</p>
                </div>
                <div className="profile-age">
                  <p style={{ marginRight: "5px" }}>Age:</p>
                  <p>{influInfo?.profile?.Age}</p>
                </div>
                <div className="profile-marriage-status">
                  <HeartOutlined style={{ marginRight: "8px" }} />

                  <p>{influInfo?.profile?.Relationship}</p>
                </div>
              </div>
              <div className="profile-biography">
                <p className="profile-biography-title">Biography</p>
                <p className="profile-biography-content">
                  {influInfo?.profile?.Bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="influ-side-bar-footer">
          <div className="footer-content">
            <p className="profile-contact">Contact information</p>
            <div className="contact-info ">
              <div className={"contact-email lock-info"}>
                <MailFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{influInfo?.profile?.Email}</p>
              </div>
              <div className={"contact-phone lock-info"}>
                <PhoneFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{influInfo?.profile?.Phone}</p>
              </div>
            </div>
          </div>
          <div className="feedback-btn">
            <Link to="/login">
              <Button type="link"></Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApproveInfluSideBar;
