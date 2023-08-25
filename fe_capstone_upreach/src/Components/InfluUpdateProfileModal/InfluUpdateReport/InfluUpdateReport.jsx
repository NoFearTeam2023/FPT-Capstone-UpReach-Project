import React, { useState } from "react";
import "./InfluUpdateReport.css";
import { Tabs } from "antd";
import UpdateReportSocial from "./UpdateReportSocial/UpdateReportSocial";
import UpdateReportAudience from "./UpdateReportAudience/UpdateReportAudience";
import UpdateReportJobs from "./UpdateReportJobs/UpdateReportJobs";

const InfluUpdateReport = ({
  mokPreviewInflu,
  setIsChange,
  influInfo,
  setInfluInfo,
  bookingInfo,
  setBookingInfo,
  idJobsRemove,
  setIdJobsRemove,
  chartInfo,
  setChartInfo,
  isNotCheck,
}) => {
  const items = [
    {
      title: "SOCIAL",
      children: (
        <UpdateReportSocial
          setIsChange={setIsChange}
          influInfo={influInfo}
          setInfluInfo={setInfluInfo}
          mokPreviewInflu={mokPreviewInflu}
        />
      ),
    },
    {
      title: "AUDIENCE",
      children: (
        <UpdateReportAudience
          influInfo={influInfo}
          previewChart={chartInfo}
          setPreviewChart={setChartInfo}
          setIsChange={setIsChange}
        />
      ),
    },
    {
      title: "JOBS",
      children: (
        <UpdateReportJobs
          influInfo={influInfo}
          bookingInfo={bookingInfo}
          setBookingInfo={setBookingInfo}
          idJobsRemove={idJobsRemove}
          setIdJobsRemove={setIdJobsRemove}
          mokPreviewInflu={mokPreviewInflu}
          setIsChange={setIsChange}
          isNotCheck={isNotCheck}
        />
      ),
    },
  ];

  return (
    <>
      <div className="influ-update-report-layout">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={"large"}
          items={items?.map((item, i) => {
            return {
              label: item?.title,
              key: i,
              children: item?.children,
            };
          })}
        />
      </div>
    </>
  );
};

export default InfluUpdateReport;
