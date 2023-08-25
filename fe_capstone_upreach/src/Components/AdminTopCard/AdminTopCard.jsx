import "./AdminTopCard.css";
import roundNumber from "../../Components/InfluUpdateProfileModal/roundNumber";
import default_img from "../../Assets/Image/Default/DefaultImg.jpg";
import { Avatar } from "antd";
const AdminTopCard = ({ image, name, follower, gender, age }) => {
  return (
    <>
      <div className="admin-top-card-cover admin-top-card-param">
        {/* <div className=".admin-top-card-circle"> */}
        <Avatar
          src={
            <img
              src={image || default_img}
              alt="avatar"
              onError={(e) => {
                e.target.src = default_img;
              }}
            />
          }
          className="admin-top-card-avatar"
        />

        {/* </div> */}

        <div className="admin-top-card">
          <div className="admin-top-card-contents">
            <p>{name}</p>
            <div className="admin-top-card-content">
              <div className="admin-top-card-number">
                <p>Followers</p>
                <p>{roundNumber(follower)}</p>
              </div>
              <div className="admin-top-card-number">
                <p>{gender}</p>
                <p>{age}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminTopCard;
