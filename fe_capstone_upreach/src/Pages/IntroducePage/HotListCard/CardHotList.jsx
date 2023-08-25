import React from "react";
import HotListCardComponents from "../../../Components/Layouts/HotListCardComponent/HotListCardComponents";
import "./CardHotList.css";
import {
  RightCircleTwoTone,
  LeftCircleTwoTone,
  RightOutlined,
} from "@ant-design/icons";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { LIST_HOTLIST } from "./ConstCardHotList";
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

  function RenderHotList({ image, name, topics }) {
    return (
      <div className="hotCard">
        <HotListCardComponents
          className="hotListCard"
          image={image}
          name={name}
          topics={topics}
        />
      </div>
    );
  }

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
          {LIST_HOTLIST.map((item, index) => (
            <RenderHotList
              key={index}
              image={item?.image}
              name={item?.name}
              topics={item?.topics}
            />
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default CardHotList;
