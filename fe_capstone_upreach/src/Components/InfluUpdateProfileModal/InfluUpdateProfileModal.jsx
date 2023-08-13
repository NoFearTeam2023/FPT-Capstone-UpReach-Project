import "./InfluUpdateProfileModal.css";
import InfluUpdateSideBar from "./InfluUpdateSideBar/InfluUpdateSideBar";
import InfluUpdateImage from "./InfluUpdateImage/InfluUpdateImage";
import InfluUpdateReport from "./InfluUpdateReport/InfluUpdateReport";
import React from "react";
import axios from "axios";
import { useInfluStore } from "../../Stores/influencer";

const InfluUpdateProfileModal = ({
  setIsChange,
  previewInflu,
  setPreviewInflu,
}) => {
  const [influ, setInfluInfo] = useInfluStore((state) => [
    state.influ,
    state.setInfluInfo,
  ]);
  const handleSave = () => {
    setInfluInfo(previewInflu);
    setIsChange(false);
    console.log(influ);
    const formData = new FormData();
    formData.append("image", JSON.stringify(influ.image));

    axios
      .put("http://localhost:4000/api/influ/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      });
  };
  return (
    <>
      <div className="influ-update-profile">
        <div className="influ-update-side-bar">
          <InfluUpdateSideBar influInfo={influ} />
        </div>
        <div className="cover-influ-update-image-report">
          <div className="influ-update-image">
            <InfluUpdateImage
              setIsChange={setIsChange}
              influInfo={previewInflu}
              setInfluInfo={setPreviewInflu}
            />
          </div>
          <div className="influ-update-report">
            <InfluUpdateReport
              setIsChange={setIsChange}
              influInfo={previewInflu}
              setInfluInfo={setPreviewInflu}
            />
            <button className="influ-update-report-btn" onClick={handleSave}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluUpdateProfileModal;
