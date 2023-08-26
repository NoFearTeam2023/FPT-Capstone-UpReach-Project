import "./InfluUpdateProfileModal.css";
import InfluUpdateSideBar from "./InfluUpdateSideBar/InfluUpdateSideBar";
import InfluUpdateImage from "./InfluUpdateImage/InfluUpdateImage";
import InfluUpdateReport from "./InfluUpdateReport/InfluUpdateReport";
import React from "react";
import axios from "axios";
import { Button, Spin, notification } from "antd";
const InfluUpdateProfileModal = ({
  setForce,
  oldVerInflu,
  setWaitedDate,
  setIsAllowEdit,
  isChange,
  setIsChange,
  previewInflu,
  mokPreviewInflu,
  setPreviewInflu,
  previewBooking,
  setPreviewBooking,
  idJobsRemove,
  setIdJobsRemove,
  previewChart,
  setPreviewChart,
  setIsOpenProfileInflu,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Notification about booking`,
      description:
        "This is UpReach's notice, please check the booking job of client send to you in My Booking!!!",
      placement,
    });
  };
  const [isSaving, setIsSaving] = React.useState(false);
  const [isNotCheck, setIsNotCheck] = React.useState(false);
  const handleSave = () => {
    setIsSaving(true);
    var dateUTC = new Date();

    const formData = new FormData();
    formData.append("influ", JSON.stringify(previewInflu));
    formData.append("chart", JSON.stringify(previewChart));
    formData.append("booking", JSON.stringify(previewBooking));
    formData.append("idRemove", JSON.stringify(idJobsRemove));
    formData.append("editDate", JSON.stringify(dateUTC));

    axios
      .put("http://localhost:4000/api/influ/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setWaitedDate(0);
        setIsAllowEdit(false);
        setIsChange(false);
        setIsSaving(false);
        setIsOpenProfileInflu(false);
        setForce((prev) => prev + 1);
        localStorage.setItem("editDate", new Date());
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      });
  };

  React.useEffect(() => {
    // console.log(previewInflu.dateEdit);
    if (previewInflu?.dateEdit !== null) {
      axios
        .get("http://localhost:4000/api/influ/get-jobs-influencer", {
          params: {
            email: previewInflu.influencerEmail,
          },
        })
        .then((response) => {
          const jobDataArray = response.data.data;

          const bookingList = jobDataArray?.map((data) => ({
            jobName: data?.Name_Job,
            platform: data?.Platform_Job,
            jobLink: data?.Link,
            quantity: data?.Quantity,
            costEstimateFrom: data?.CostEstimate_From_Job,
            costEstimateTo: data?.CostEstimate_To_Job,
            formatContent: data?.Format_Id,
            jobId: data?.Job_ID,
            JobList_ID: data?.JobList_ID,
            status: data?.status,
          }));
          setPreviewBooking(bookingList);
        })
        .catch((error) => {
          console.error("Error while fetching job information:", error);
        });
    }
  }, []);

  React.useEffect(() => {
    if (previewBooking == undefined) {
      setPreviewBooking([]);
    }
    const hasPendingJob = previewBooking?.some(
      (job) => job?.status === "Pending"
    );
    setIsNotCheck(hasPendingJob);
  }, [previewBooking]);
  // console.log(isChange);
  return (
    <>
      {contextHolder}
      <div className="influ-update-profile">
        <div className="influ-update-side-bar">
          <InfluUpdateSideBar
            influInfo={previewInflu}
            oldVerInflu={oldVerInflu}
          />
        </div>
        <div className="cover-influ-update-image-report">
          <Spin tip="Saving" size="large" spinning={isSaving}>
            <div className="influ-update-image">
              <InfluUpdateImage
                setIsChange={setIsChange}
                influInfo={previewInflu}
                setInfluInfo={setPreviewInflu}
                mokPreviewInflu={mokPreviewInflu}
              />
            </div>
            <div className="influ-update-report">
              <InfluUpdateReport
                mokPreviewInflu={mokPreviewInflu}
                setIsChange={setIsChange}
                influInfo={previewInflu}
                setInfluInfo={setPreviewInflu}
                bookingInfo={previewBooking}
                setBookingInfo={setPreviewBooking}
                idJobsRemove={idJobsRemove}
                setIdJobsRemove={setIdJobsRemove}
                chartInfo={previewChart}
                setChartInfo={setPreviewChart}
                isNotCheck={isNotCheck}
              />
              {/* {console.log(isNotCheck)} */}
              <Button
                disabled={!isChange}
                style={{ background: isNotCheck ? "#cccccc" : "##1677ff" }}
                type="primary"
                size={18}
                className="influ-update-report-btn"
                // onClick={handleSave}
                onClick={() => {
                  isNotCheck ? openNotification("topRight") : handleSave();
                }}
              >
                SAVE
              </Button>
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default InfluUpdateProfileModal;
