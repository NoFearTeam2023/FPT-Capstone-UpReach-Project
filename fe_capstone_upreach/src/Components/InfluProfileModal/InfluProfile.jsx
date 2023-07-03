import "./InfluProfile.css";
import InfluSideBar from "./InfluSideBar/InfluSideBar";
import InfluImage from "./InfluImage/InfluImage";
import React from "react";
const InfluProfile = () => {
  const [influInfo, setInfluInfo] = React.useState({
    fullName: "Le Quang Hieu",
    email: "hieupro123@gmail.com",
    age: 22,
    phone: "0398357123",
    gender: "Male",
    bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
    address: "Da Nang",
    relationship: "Married",
    topics: [
      "Baby",
      "Beauty",
      "Business",
      "Travel",
      "Game",
      "Film",
      "Personal perception",
      "Film",
      "Film",
      "Film",
    ],
    type: "Citizen",
  });

  return (
    <>
      <div className="influ-profile">
        <div className="influ-side-bar">
          <InfluSideBar influInfo={influInfo} />
        </div>
        <div className="influ-image">
          <InfluImage />
        </div>
      </div>
    </>
  );
};

export default InfluProfile;
