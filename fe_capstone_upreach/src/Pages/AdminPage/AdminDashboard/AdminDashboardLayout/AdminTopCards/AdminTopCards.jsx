import React from "react";
import "./AdminTopCards.css";
import AdminTopCard from "../../../../../Components/AdminTopCard/AdminTopCard";
import { Badge } from "antd";

const AdminTopCards = () => {
  return (
    <>
      <div className="admin-top-cards-bg">
        <div className="admin-top-card2">
          <Badge.Ribbon text="Top 2" color="cyan" className="admin-top2-badge">
            <AdminTopCard
              name={"Hieu Coder lord"}
              follower={123}
              interactions={456}
              image={
                "https://wallpapers.com/images/hd/anime-profile-picture-jioug7q8n43yhlwn.jpg"
              }
            />
          </Badge.Ribbon>
        </div>
        <div className="admin-top-card1">
          <Badge.Ribbon text="Top 1" color="red" className="admin-top1-badge">
            <AdminTopCard
              name={"Minh Vip Pro"}
              follower={456}
              interactions={789}
              image={
                "https://yt3.googleusercontent.com/ytc/AOPolaT4BroLgWCEQ1MjoLRXof6Tmch14P2MpxK0rWYBmw=s900-c-k-c0x00ffffff-no-rj"
              }
            />
          </Badge.Ribbon>
        </div>
        <div className="admin-top-card3">
          <Badge.Ribbon
            text="Top 3"
            color="volcano"
            className="admin-top3-badge"
          >
            <AdminTopCard
              name={"Huy Designer lord"}
              follower={789}
              interactions={1023}
              image={
                "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/09/avatar-anime-1.jpg?ssl=1"
              }
            />
          </Badge.Ribbon>
        </div>
      </div>
    </>
  );
};

export default AdminTopCards;
