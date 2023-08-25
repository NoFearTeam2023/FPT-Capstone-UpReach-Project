import React, { useState, useEffect } from "react";
import "./ReportPost.css";
import JobItem from "./JobItem/ApproveJobItem";

const ReportPost = ({ influInfo, dataReportVersion }) => {
  const [jobItems, setJobItems] = useState([]);
  // console.log(dataReportVersion.dataJob);

  useEffect(() => {
    setJobItems(dataReportVersion?.dataJob);
  }, [dataReportVersion?.dataJob]);

  return (
    <div className="report-post-layout">
      {jobItems
        ?.filter((item) => item?.jobId !== null && item?.isPublish !== false)
        .map((item, index) => (
          <div key={index}>
            <JobItem jobInfo={item} />
          </div>
        ))}
    </div>
  );
};

export default ReportPost;
