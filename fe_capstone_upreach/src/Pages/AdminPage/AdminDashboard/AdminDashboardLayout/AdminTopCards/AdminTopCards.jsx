import React from "react";
import "./AdminTopCards.css";
import AdminTopCard from "../../../../../Components/AdminTopCard/AdminTopCard";
import { Badge } from "antd";

const AdminTopCards = ({ listInfluTop }) => {
  return (
    <>
      <div className="admin-top-cards-bg">
        <div className="admin-top-card2">
          <Badge.Ribbon text="Top 2" color="cyan" className="admin-top2-badge">
            <AdminTopCard
              name={listInfluTop?.at(1)?.influencerfullName}
              follower={listInfluTop?.at(1)?.influencerFollowers}
              gender={listInfluTop?.at(1)?.influencerGender}
              age={listInfluTop?.at(1)?.influencerAge}
              image={listInfluTop?.at(1)?.Avatar}
            />
          </Badge.Ribbon>
        </div>
        <div className="admin-top-card1">
          <Badge.Ribbon text="Top 1" color="red" className="admin-top1-badge">
            <AdminTopCard
              name={listInfluTop?.at(0)?.influencerfullName}
              follower={listInfluTop?.at(0)?.influencerFollowers}
              gender={listInfluTop?.at(0)?.influencerGender}
              age={listInfluTop?.at(0)?.influencerAge}
              image={listInfluTop?.at(0)?.Avatar}
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
              name={listInfluTop?.at(2)?.influencerfullName}
              follower={listInfluTop?.at(2)?.influencerFollowers}
              gender={listInfluTop?.at(2)?.influencerGender}
              age={listInfluTop?.at(2)?.influencerAge}
              image={listInfluTop?.at(2)?.Avatar}
            />
          </Badge.Ribbon>
        </div>
      </div>
    </>
  );
};

export default AdminTopCards;
