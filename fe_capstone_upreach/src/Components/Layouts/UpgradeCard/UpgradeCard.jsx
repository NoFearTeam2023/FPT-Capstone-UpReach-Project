import React from "react";
import { Link } from "react-router-dom";
import "./UpgradeCard.css";
import { ReactComponent as Facebook } from "../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Question } from "../../../Assets/Icon/QuestionIcon.svg";
import { Button } from "antd";
const UpgradeCard = ({ upgradeCards }) => {
  return (
    <>
      <div className="upgrade-card-bg">
        <div className="upgrade-card-header">
          <div className="upgrade-card-tag-socials">
            <div className="upgrade-card-tag">{upgradeCards?.tag}</div>
            <div className="upgrade-card-socials">
              <div className="upgrade-card-social">
                <Facebook />
              </div>
              <div className="upgrade-card-social">
                <Instagram />
              </div>
              <div className="upgrade-card-social">
                <Youtube />
              </div>
              <div className="upgrade-card-social">
                <Tiktok />
              </div>
            </div>
          </div>
          <div className="upgrade-card-cost">
            <p style={{ fontSize: "26px", fontWeight: "600" }}>
              {upgradeCards?.cost}
            </p>
            <p style={{ fontSize: "14px", fontWeight: "600" }}>VND/month</p>
          </div>

          <Button
            className="upgrade-card-btn"
            type="primary"
            shape="round"
            size="large"
          >
            <Link to={upgradeCards?.link}>{upgradeCards?.btnTag}</Link>
          </Button>
        </div>
        <div className="upgrade-card-content">
          <p
            className="upgrade-card-content-title"
            style={{ fontWeight: "600", fontSize: "16px" }}
          >
            INCLUDED FEATURES:
          </p>
          <div className="upgrade-card-content-sub-title">
            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub1[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub1[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub2[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub2[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub3[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub3[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub4[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub4[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub5[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub5[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub6[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub6[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub7[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub7[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub8[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub8[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub9[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub9[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub10[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub10[1]}
                </span>
              </div>
              <Question />
            </div>

            <div className="upgrade-card-content-line-item">
              <div className="line-item-check-title">
                <img src={upgradeCards?.sub11[0]} alt="" />
                <span style={{ marginLeft: "5px" }}>
                  {upgradeCards?.sub11[1]}
                </span>
              </div>
              <Question />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpgradeCard;
