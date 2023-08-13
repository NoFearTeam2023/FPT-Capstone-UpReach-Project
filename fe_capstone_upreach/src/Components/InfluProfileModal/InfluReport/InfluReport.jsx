import React, { useState } from "react";
import "./InfluReport.css";
import { Tabs } from "antd";
import ReportSocial from "./ReportSocial/ReportSocial";
import ReportAudience from "./ReportAudience/ReportAudience";
import ReportPost from "./ReportPost/ReportPost";

const InfluReport = () => {
  const items = [
    { title: "SOCIAL", children: <ReportSocial /> },
    { title: "AUDIENCE", children: <ReportAudience /> },
    { title: "POST", children: <ReportPost /> },
  ];

  return (
    <>
      <div className="influ-report-layout">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={"large"}
          items={items.map((item, i) => {
            return {
              label: item.title,
              key: i,
              children: item.children,
            };
          })}
        />
      </div>
    </>
  );
};
export default InfluReport;
