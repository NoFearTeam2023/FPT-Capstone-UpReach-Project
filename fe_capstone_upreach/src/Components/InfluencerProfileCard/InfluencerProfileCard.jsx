import "./InfluencerProfileCard.css";
import default_img from "../../Assets/Image/Default/DefaultImg.jpg";
import { ReactComponent as Facebook } from "../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Location } from "../../Assets/Icon/Location.svg";
import { Tooltip, Avatar } from "antd";
import roundNumber from "../../Components/InfluUpdateProfileModal/roundNumber";
import { EyeOutlined } from "@ant-design/icons";
import { useUserStore } from "../../Stores/user";

const InfluencerProfileCard = ({ profileInflu, oldVerInflu }) => {
  const [user] = useUserStore((state) => [state.user]);

  const currentDate = new Date();
  const currentMonth = currentDate?.getMonth();
  const currentYear = currentDate?.getFullYear();

  let profileInfluMonth = currentMonth;
  let profileInfluYear = currentYear;

  if (profileInflu?.date) {
    const [month, year] = profileInflu?.date?.split("/");

    profileInfluMonth = parseInt(month, 10) - 1;
    profileInfluYear = parseInt(year, 10);
  }

  const isLatestDate =
    profileInfluYear > currentYear ||
    (profileInfluYear === currentYear && profileInfluMonth >= currentMonth);

  return (
    <>
      <div className={`profile-layout ${isLatestDate ? "new-background" : ""}`}>
        {/* <div className="profile-layout"> */}
        <div className="profile-content-layout">
          <div className="profile-avatar-content">
            <Avatar
              src={
                <img
                  src={user?.avatar || default_img}
                  alt="avatar"
                  onError={(e) => {
                    e.target.src = default_img;
                  }}
                />
              }
              className="profile-avatar"
              size={80}
            />
            <div className="profile-content">
              <p className="profile-name">{oldVerInflu?.influencerfullName}</p>
              <div className="profile-location">
                <Location style={{ marginRight: "8px" }} />
                <p>{oldVerInflu?.influencerAddress}</p>
              </div>
              <div className="profile-topics">
                {oldVerInflu?.influencerContentTopicName
                  ?.filter((topic) => topic)
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
                  ))}
              </div>
            </div>
          </div>
          <div className="profile-date-view">
            <div className="profile-date">
              {profileInflu?.isPublish ? "Available" : "Waiting"}
            </div>
            {/* <div className="profile-view">
              <Tooltip
                placement="top"
                title={profileInflu.view.toLocaleString("vi-VN")}
              >
                <EyeOutlined />
              </Tooltip>
            </div> */}
          </div>
        </div>
        <div className="profile-socials">
          <div className="profile-social">
            <Facebook />

            <p> {roundNumber(profileInflu?.influencerFollowFb || 0)}</p>
          </div>
          <div className="profile-social">
            <Instagram />

            <p> {roundNumber(profileInflu?.influencerFollowInsta || 0)}</p>
          </div>
          <div className="profile-social">
            <Youtube />

            <p>{roundNumber(profileInflu?.influencerFollowYoutube || 0)}</p>
          </div>
          <div className="profile-social">
            <Tiktok />

            <p>{roundNumber(profileInflu?.influencerFollowTikTok || 0)}</p>
          </div>
        </div>
        <div className="profile-images">
          <img
            className="profile-image"
            src={profileInflu?.dataImage?.at(0)?.url || default_img}
            alt=""
            onError={(e) => {
              e.target.src = default_img;
            }}
          />
          <img
            className="profile-image"
            src={profileInflu?.dataImage?.at(1)?.url || default_img}
            alt=""
            onError={(e) => {
              e.target.src = default_img;
            }}
          />
          <img
            className="profile-image"
            src={profileInflu?.dataImage?.at(2)?.url || default_img}
            alt=""
            onError={(e) => {
              e.target.src = default_img;
            }}
          />
        </div>
      </div>
    </>
  );
};
export default InfluencerProfileCard;
