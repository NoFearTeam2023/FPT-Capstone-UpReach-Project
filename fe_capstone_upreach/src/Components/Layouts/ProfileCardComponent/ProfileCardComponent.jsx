import "./ProfileCardComponent.css";
import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";
import { ReactComponent as Facebook } from "../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Location } from "../../../Assets/Icon/Location.svg";
import { ReactComponent as Addlist } from "../../../Assets/Icon/Addlist.svg";
import { Tooltip } from "antd";
import React, { useState, useEffect } from "react";

const ProfileCardComponent = ({ profileInflu }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages(profileInflu?.dataImage);
  }, [profileInflu?.dataImage]);
  console.log(images);
  return (
    <>
      <div className="profile-layout">
        <div className="profile-content-layout">
          <div className="profile-avatar-content">
            <img
              className="profile-avatar"
              src={
                profileInflu?.Avatar === null
                  ? default_img
                  : profileInflu?.Avatar
              }
              alt=""
            />
            <div className="profile-content">
              <p className="profile-name">{profileInflu?.influencerNickName}</p>
              <div className="profile-location">
                <Location style={{ marginRight: "8px" }} />
                <p>{profileInflu?.influencerAddress}</p>
              </div>
              <div className="profile-topics">
                {profileInflu?.influencerContentTopicName?.length === 0 ? (
                  <></>
                ) : (
                  profileInflu?.influencerContentTopicName
                    ?.slice(0, 2)
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
                )}
              </div>
            </div>
          </div>
          <div className="profile-add-list">
            <Addlist />
          </div>
        </div>
        <div className="profile-socials">
          <div className="profile-social">
            <Facebook />
            <p>
              {profileInflu?.influencerFollowFb === 0
                ? "0M"
                : (profileInflu?.influencerFollowFb / 1000000).toFixed(1) + "M"}
            </p>
          </div>
          <div className="profile-social">
            <Instagram />
            <p>
              {profileInflu?.influencerFollowInsta === 0
                ? "0M"
                : (profileInflu?.influencerFollowInsta / 1000000).toFixed(1) +
                  "M"}
            </p>
          </div>
          <div className="profile-social">
            <Youtube />
            <p>
              {profileInflu?.influencerFollowYoutube === 0
                ? "0M"
                : (profileInflu?.influencerFollowYoutube / 1000000).toFixed(1) +
                  "M"}
            </p>
          </div>
          <div className="profile-social">
            <Tiktok />
            <p>
              {profileInflu?.influencerFollowTikTok === 0
                ? "0M"
                : (profileInflu?.influencerFollowTikTok / 1000000).toFixed(1) +
                  "M"}
            </p>
          </div>
        </div>
        <div className="profile-images">
          {/* <img className="profile-image" src={default_img} alt="" />
          <img className="profile-image" src={default_img} alt="" />
          <img className="profile-image" src={default_img} alt="" /> */}
          {images
            ?.filter(
              (imageObj) => imageObj.url !== null && imageObj.uid !== null
            )
            .map((imageObj, index) => (
              <img
                key={index}
                className="profile-image"
                src={imageObj.url}
                alt=""
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default ProfileCardComponent;
