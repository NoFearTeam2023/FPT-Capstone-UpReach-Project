import "./AdminTopCard.css";

const AdminTopCard = ({ image, name, follower, interactions }) => {
  return (
    <>
      <div className="admin-top-card-cover admin-top-card-param">
        {/* <div className=".admin-top-card-circle"> */}
        <img className="admin-top-card-avatar" src={image} alt="avatar" />
        {/* </div> */}

        <div className="admin-top-card">
          <div className="admin-top-card-contents">
            <p>{name}</p>
            <div className="admin-top-card-content">
              <div className="admin-top-card-number">
                <p>Followers</p>
                <p>{follower}</p>
              </div>
              <div className="admin-top-card-number">
                <p>Interactions</p>
                <p>{interactions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminTopCard;
