import React from "react";
import "./VersionInfluImage.css";
const VersionInfluImage = ({ influInfo }) => {
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    setImages(influInfo?.dataImage);
  }, [influInfo?.dataImage]);
  return (
    <>
      <div className="approve-influ-images">
        {images
          ?.filter(
            (imageObj) => imageObj?.url !== null && imageObj?.imageId !== null
          )
          ?.map((imageObj, index) => (
            <img
              key={index}
              className="influ-image"
              src={imageObj?.url}
              alt=""
            />
          ))}
      </div>
    </>
  );
};
export default VersionInfluImage;
