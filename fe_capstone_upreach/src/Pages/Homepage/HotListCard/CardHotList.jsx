import { Col, Row } from "antd";
import React from "react";
import HotListCardComponents from "../../../Components/Layouts/HotListCardComponent/HotListCardComponents";
import HotListCard1 from "../../../Assets/Image/Hot_list/HotListCard1.jpg";
import HotListCard2 from "../../../Assets/Image/Hot_list/HotListCard2.jpg";
import HotListCard3 from "../../../Assets/Image/Hot_list/HotListCard3.jpg";
import HotListCard4 from "../../../Assets/Image/Hot_list/HotListCard4.jpg";
import "./CardHotList.css";
import { LIST_HOTLIST } from "./ConstCardHotList";

function RenderHotList({ image, name, topics }) {
  return (
    <Col span={6}>
      <HotListCardComponents
        className="hotListCard"
        image={image}
        name={name}
        topics={topics}
      />
    </Col>
  )
}

const CardHotList = ({ onClick }) => {
  return (
    <div className="hotListLayout">
      <div className="hotListContent">
        <p className="hotListTitle font-Volkhov">Hot Influencer Lists</p>
        <p className="hotListTitle" onClick={onClick}>View more</p>
      </div>

      <div className="hotListCards">
        <Row gutter={80}>
          {LIST_HOTLIST.map((item) => (
            <RenderHotList image={item.image} name={item.name} topics={item.topics} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CardHotList;
