import React, { useState, useEffect } from "react";
import "./ReportPost.css";
import JobItem from "./JobItem/JobItem";
import ApiAudienceAndJobInfluencer from "../../../../Api/ApiAudienceAndJobInfluencer";
import { Spin, Button } from "antd";
import "../../../../CSS/Theme.css";
import { useNavigate } from "react-router-dom";
import { LockFilled } from "@ant-design/icons";

const ReportPost = ({ influInfo, influInfoEmail, roleClient }) => {
  const [data, setData] = useState();
  const [idMonogDB, setIdMonogDB] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  //====================== Get Data Back End Of Audience Chart ======================
  const fetchDataForChart = async (IdInflu) => {
    try {
      const response = await ApiAudienceAndJobInfluencer.getDataForChart(
        IdInflu,
        influInfoEmail
      );
      setLoading(false);
      setData(response);
      setIdMonogDB(response._idInflue);
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
      <div className={`report-post-layout`}>
        {roleClient !== "Free" ? (
          ""
        ) : (
          <div className="upgrade-btn">
            <Button
              type="primary"
              shape="round"
              icon={<LockFilled />}
              size={"large"}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#000",
              }}
              onClick={() => {
                navigate("/upgrade");
              }}
            >
              Upgrade
            </Button>
          </div>
        )}
        <Spin
          size="large"
          style={{ position: "fixed", top: "45%", marginLeft: "190px" }}
          spinning={loading}
        >
          <div className={roleClient === "Free" ? "blur-data-to-payment" : ""}>
            {data?.data[0]?.dataJob === undefined ? (
              <></>
            ) : (
              data?.data[0]?.dataJob.map((item) =>
                item.jobId != null && item.isPublish === true ? (
                  <JobItem data={item} idMonogDB={idMonogDB} />
                ) : (
                  <></>
                )
              )
            )}
          </div>
        </Spin>
      </div>
    </>
  );
};

export default ReportPost;
