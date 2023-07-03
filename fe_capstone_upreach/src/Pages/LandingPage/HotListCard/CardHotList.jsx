import React from "react";
import HotListCardComponents from "../../../Components/Layouts/HotListCardComponent/HotListCardComponents";
import HotListCard1 from "../../../Assets/Image/Hot_list/HotListCard1.jpg";
import HotListCard2 from "../../../Assets/Image/Hot_list/HotListCard2.jpg";
import HotListCard3 from "../../../Assets/Image/Hot_list/HotListCard3.jpg";
import HotListCard4 from "../../../Assets/Image/Hot_list/HotListCard4.jpg";
import "./CardHotList.css";
import {
  RightCircleTwoTone,
  LeftCircleTwoTone,
  RightOutlined,
} from "@ant-design/icons";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
const CardHotList = () => {
  const [isHoveredArrow, setIsHoveredArrow] = React.useState("");
  const properties = {
    prevArrow: (
      <button
        onMouseEnter={() => setIsHoveredArrow("left")}
        onMouseLeave={() => setIsHoveredArrow("")}
        className={"scroll-button scroll-left"}
        style={{ marginLeft: "-35px" }}
      >
        <LeftCircleTwoTone
          twoToneColor={isHoveredArrow === "left" ? "#939393" : "#d4d4d4"}
        />
      </button>
    ),
    nextArrow: (
      <button
        onMouseEnter={() => setIsHoveredArrow("right")}
        onMouseLeave={() => setIsHoveredArrow("")}
        className={"scroll-button scroll-right"}
        style={{ marginRight: "-35px" }}
      >
        <span class="anticon anticon-colorful">
          <RightCircleTwoTone
            twoToneColor={isHoveredArrow === "right" ? "#939393" : "#d4d4d4"}
          />
        </span>
      </button>
    ),
  };
  return (
    <div className="hotListLayout">
      <div className="hotListContent">
        <p className="hotListTitle">Hot Influencer Lists</p>
        <div className="viewMoreBlock">
          <p className="hotListViewMore">View more</p>
          <RightOutlined className="viewMoreIcon" />
        </div>
      </div>

      <div className="hotListCards">
        <Slide
          {...properties}
          slidesToScroll={1}
          slidesToShow={4}
          indicators={true}
          duration={2000}
        >
          <div className="hotCard">
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard1}
              name={"Giang Ơi"}
              topics={"Instagram, Youtube"}
            />
          </div>

          <div className="hotCard">
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard2}
              name={"Chao Đây"}
              topics={"Facebook, Instagram, Tiktok"}
            />
          </div>
          <div className="hotCard">
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard1}
              name={"Giang Ơi"}
              topics={"Instagram, Youtube"}
            />
          </div>
          <div className="hotCard">
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard3}
              name={"Vũ Dino"}
              topics={"Facebook, Tiktok"}
            />
          </div>

          <div className="hotCard">
            <HotListCardComponents
              className="hotListCard"
              image={HotListCard4}
              name={"DEC AO"}
              topics={"Instagram , Facebook"}
            />
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default CardHotList;
