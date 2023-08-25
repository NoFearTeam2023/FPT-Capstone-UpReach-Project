import React, { useState, useEffect } from "react";
import "./ReportPost.css";
import JobItem from "./JobItem/ApproveJobItem";

const ReportPost = ({ influInfo }) => {
  const [jobItems, setJobItems] = useState([]);

  useEffect(() => {
    setJobItems(influInfo?.jobs);
  }, [influInfo?.jobs]);
  return (
    <div className="report-post-layout">
      {jobItems?.map((item, index) => (
        <div key={index}>
          <JobItem jobInfo={item} />
        </div>
      ))}
    </div>
  );
};

export default ReportPost;
