import React, { useState, useEffect } from "react";
import "./ReportPost.css";
import JobItem from "./JobItem/JobItem";
import ApiAudienceAndJobInfluencer from "../../../../Api/ApiAudienceAndJobInfluencer";
import { Spin } from "antd";

const ReportPost = ({ influInfo }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  //====================== Get Data Back End Of Audience Chart ======================
  const fetchDataForChart = async (IdInflu) => {
    try {
      const response = await ApiAudienceAndJobInfluencer.getDataForChart(
        IdInflu
      );
      setLoading(false);
      setData(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  //=================================================================================
  useEffect(() => {
    fetchDataForChart(influInfo);
  }, []);

  return (
    <>
      <div className="report-post-layout">
        <Spin
          size="large"
          style={{ position: "fixed", top: "45%", marginLeft: "190px" }}
          spinning={loading}
        >
          {console.log(data?.data[0]?.dataJob)}
          {data?.data[0]?.dataJob === undefined ? (
            <></>
          ) : (
            data?.data[0]?.dataJob.map((item) =>
              item.jobId != null && item.isPublish === true ? (
                <JobItem data={item} />
              ) : (
                <></>
              )
            )
          )}
        </Spin>
      </div>
    </>
  );
};

export default ReportPost;
