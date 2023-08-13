import "./TotalUserCard.css";
import { Col, Row } from "antd";
import StatusCardComponents from "../../../Components/Layouts/StatusCardComponent/StatusCardComponents";
import { ReactComponent as Influencers } from "../../../Assets/Icon/Influencers.svg";
import { ReactComponent as Lists } from "../../../Assets/Icon/Lists.svg";
import { ReactComponent as Channels } from "../../../Assets/Icon/Channels.svg";
import { ReactComponent as ActivatedUsers } from "../../../Assets/Icon/ActivatedUsers.svg";

const TotalUserCard = () => {
  return (
    <div className="totalUserCards">
      <Row gutter={[64, 32]}>
        <Col span={12}>
          <StatusCardComponents
            title={"Influencers"}
            value={12.001}
            className="totalUserCard"
            icon={<Influencers />}
          />
        </Col>
        <Col span={12}>
          <StatusCardComponents
            title={"Lists"}
            value={2.074}
            className="totalUserCard"
            icon={<Lists />}
          />
        </Col>
        <Col span={12}>
          <StatusCardComponents
            title={"Channels"}
            value={16.701}
            className="totalUserCard"
            icon={<Channels />}
          />
        </Col>
        <Col span={12}>
          <StatusCardComponents
            title={"Activated Users"}
            value={10.121}
            className="totalUserCard"
            icon={<ActivatedUsers />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TotalUserCard;
