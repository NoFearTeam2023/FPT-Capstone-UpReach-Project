import React, { useState } from "react";
import "./InfluReport.css";
import { Tabs } from "antd";
import ReportSocial from "./ReportSocial/ReportSocial";
import ReportAudience from "./ReportAudience/ReportAudience";
import ReportPost from "./ReportPost/ReportPost";

const InfluReport = ({ influInfo }) => {
  const items = [
    { title: "SOCIAL", children: <ReportSocial influInfo={influInfo} /> },
    {
      title: "AUDIENCE",
      children: <ReportAudience influInfo={influInfo?.influencerId} />,
    },
    {
      title: "JOB",
      children: <ReportPost influInfo={influInfo?.influencerId} />,
    },
  ];

  return (
    <>
      <div className="influ-report-layout">
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
export default InfluReport;
