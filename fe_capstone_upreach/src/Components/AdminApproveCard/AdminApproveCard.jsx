import "./AdminApproveCard.css";
import default_img from "../../Assets/Image/Default/DefaultImg.jpg";
import { ReactComponent as Facebook } from "../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Location } from "../../Assets/Icon/Location.svg";
import { Tooltip, Avatar } from "antd";
import roundNumber from "../../Components/InfluUpdateProfileModal/roundNumber";

const AdminApproveCard = ({ reportApprove }) => {
  return (
    <>
      <div className="profile-layout">
        <div className="profile-content-layout">
          <div className="approve-profile-avatar-content">
            <Avatar
              src={
                <img
                  src={reportApprove?.profile?.Avatar || default_img}
                  alt="avatar"
                  onError={(e) => {
                    e.target.src = default_img;
                  }}
                />
              }
              className="profile-avatar"
            />

            <div className="profile-content">
              <p className="profile-name">{reportApprove?.profile?.fullName}</p>
              <div className="profile-location">
                <Location style={{ marginRight: "8px" }} />
                <p>{reportApprove?.profile?.Address}</p>
              </div>
              {/* <div className="profile-topics">
                {reportApprove?.topics?.slice(0, 3)?.map((topic, index) => (
                  <div key={index} className="profile-topic">
                    <Tooltip placement="top" title={topic}>
                      <div>
                        {topic?.length > 8 ? `${topic?.slice(0, 8)}...` : topic}
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
        <div className="profile-socials">
          <div className="profile-social">
            <Facebook />
            <p>{roundNumber(reportApprove?.platform?.Follow_FB) || 0}</p>
          </div>
          <div className="profile-social">
            <Instagram />
            <p>{roundNumber(reportApprove?.platform?.Follow_Insta) || 0}</p>
          </div>
          <div className="profile-social">
            <Youtube />
            <p>{roundNumber(reportApprove?.platform?.Follow_TikTok) || 0}</p>
          </div>
          <div className="profile-social">
            <Tiktok />
            <p>{roundNumber(reportApprove?.platform?.Follow_Youtube) || 0}</p>
          </div>
        </div>
        <div className="profile-images">
          <img
            className="profile-image"
            src={reportApprove?.image?.at(0)?.Image || default_img}
            alt=""
            onError={(e) => {
              e.target.src = default_img;
            }}
          />
          <img
            className="profile-image"
            src={reportApprove?.image?.at(1)?.Image || default_img}
            alt=""
            onError={(e) => {
              e.target.src = default_img;
            }}
          />
          <img
            className="profile-image"
            src={reportApprove?.image?.at(2)?.Image || default_img}
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
export default AdminApproveCard;
