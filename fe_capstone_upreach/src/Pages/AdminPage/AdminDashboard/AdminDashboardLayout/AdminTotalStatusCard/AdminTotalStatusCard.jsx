import React from "react";
import "./AdminTotalStatusCard.css";
import AdminStatusCard from "../../../../../Components/AdminStatusCard/AdminStatusCard";
import { Row, Col } from "antd";
import { ReactComponent as StatusInflu } from "../../../../../Assets/Icon/AdminStatusInflu.svg";
import { ReactComponent as StatusList } from "../../../../../Assets/Icon/AdminStatusList.svg";
import { ReactComponent as StatusChannel } from "../../../../../Assets/Icon/AdminStatusChannel.svg";
import { ReactComponent as StatusUser } from "../../../../../Assets/Icon/AdminStatusUser.svg";
const AdminTotalStatusCard = () => {
  return (
    <>
      <div className="admin-total-status-card-bg">
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <AdminStatusCard
              title={"Influencers"}
              value={12.001}
              className="totalUserCard"
              icon={<StatusInflu />}
            />
          </Col>
          <Col span={6}>
            <AdminStatusCard
              title={"Lists"}
              value={2.074}
              className="totalUserCard"
              icon={<StatusList />}
            />
          </Col>
          <Col span={6}>
            <AdminStatusCard
              title={"Channels"}
              value={16.701}
              className="totalUserCard"
              icon={<StatusChannel />}
            />
          </Col>
          <Col span={6}>
            <AdminStatusCard
              title={"Users"}
              value={10.121}
              className="totalUserCard"
              icon={<StatusUser />}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminTotalStatusCard;
