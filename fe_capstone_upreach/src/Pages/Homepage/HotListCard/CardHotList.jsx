import { Col, Row } from "antd";
import React from "react";
import HotListCardComponents from "../../../Components/Layouts/HotListCardComponent/HotListCardComponents";
import HotListCard1 from "../../../Assets/Image/Hot_list/HotListCard1.jpg";
import HotListCard2 from "../../../Assets/Image/Hot_list/HotListCard2.jpg";
import HotListCard3 from "../../../Assets/Image/Hot_list/HotListCard3.jpg";
import HotListCard4 from "../../../Assets/Image/Hot_list/HotListCard4.jpg";
import "./CardHotList.css";

const CardHotList = () => {
  return (
    <div className="hotListLayout">
      <div className="hotListContent">
        <p className="hotListTitle font-Volkhov">Hot Influencer Lists</p>
        <p className="hotListTitle">View more</p>
      </div>

      <div className="hotListCards">
        <Row gutter={80}>
          <Col span={6}>
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard1}
              name={"Giang Ơi"}
              topics={"Instagram, Youtube"}
            />
          </Col>
          <Col span={6}>
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard2}
              name={"Chao Đây"}
              topics={"Facebook, Instagram, Tiktok"}
            />
          </Col>
          <Col span={6}>
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard3}
              name={"Vũ Dino"}
              topics={"Facebook, Tiktok"}
            />
          </Col>
          <Col span={6}>
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard4}
              name={"DEC AO"}
              topics={"Instagram , Facebook"}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardHotList;
