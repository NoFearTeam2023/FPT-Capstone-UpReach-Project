import React from "react";
import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";
import "./ApproveInfluImage.css";
const ApproveInfluImage = ({ influInfo }) => {
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    setImages(influInfo?.image);
  }, [influInfo?.image]);
  return (
    <>
      <div className="approve-influ-images">
        {images?.map((imageObj, index) => (
          <img
            key={index}
            className="influ-image"
            src={imageObj?.Image}
            alt=""
          />
        ))}
      </div>
    </>
  );
};
export default ApproveInfluImage;
