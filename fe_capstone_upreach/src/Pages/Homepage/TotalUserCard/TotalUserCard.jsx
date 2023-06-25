import "./TotalUserCard.css";
import { Col, Row } from "antd";
import StatusCardComponents from "../../../Components/Layouts/StatusCardComponent/StatusCardComponents";
import { LIST_TOTAL_USER } from "./ConstTotalUserCard";

function RenderTotalUser({ title, value, icon }) {
  return (
    <Col span={6}>
      <StatusCardComponents
        title={title}
        value={value}
        className="totalUserCard"
        icon={icon}
      />
    </Col>
  )
}

const TotalUserCard = () => {
  return (
    <div className="totalUserCards">
      <Row gutter={150}>
        {LIST_TOTAL_USER.map((item) => (
          <RenderTotalUser title={item.title} value={item.value} icon={item.icon} />
        ))}
      </Row>
    </div>
  );
};

export default TotalUserCard;
