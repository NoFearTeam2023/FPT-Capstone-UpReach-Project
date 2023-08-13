import React from "react";
import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";
import "./InfluImage.css";
const InfluImage = () => {
  return (
    <>
      <div className="influ-images">
        <img className="influ-image" src={default_img} alt="" />
        <img className="influ-image" src={default_img} alt="" />
        <img className="influ-image" src={default_img} alt="" />
      </div>
    </>
  );
};
export default InfluImage;
