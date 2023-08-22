import "./ReportAudience.css";
import { Row, Col } from "antd";
import { Line, Pie, Bar } from "@ant-design/plots";
import ApiAudienceAndJobInfluencer from "../../../../Api/ApiAudienceAndJobInfluencer";
import React, { useState, useEffect } from "react";

const ReportAudience = ({ influInfo }) => {
  const [data, setData] = useState();
  //====================== Get Data Back End Of Audience Chart ======================
  const fetchDataForChart = async (IdInflu) => {
    try {
      const response = await ApiAudienceAndJobInfluencer.getDataForChart(
        IdInflu
      );

      setData(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  //=================================================================================
  // console.log(data);
  useEffect(() => {
    fetchDataForChart(influInfo);
  }, []);
  const dataFollower =
    data?.data[0]?.dataFollower === undefined
      ? []
      : data?.data[0]?.dataFollower;
  const configFollower = {
    data: dataFollower,
    xField: "monthFollow",
    yField: "value",
  };

  const dataGender =
    data?.data[0]?.dataGender === undefined ||
    data?.data[0]?.dataGender?.sex === null ||
    data?.data[0]?.dataGender?.value === null
      ? []
      : data?.data[0]?.dataGender;

  const configGender = {
    data: dataGender,
    angleField: "value",
    colorField: "sex",
    label: {
      type: "inner",
      offset: "-35%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 13,
        textAlign: "center",
      },
    },
  };

  const dataAge =
    data?.data[0]?.dataAge === undefined ? [] : data?.data[0]?.dataAge;

  const configAge = {
    data: dataAge,
    xField: "value",
    yField: "type",
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "People",
      },
    },
    minBarWidth: 16,
    maxBarWidth: 16,
  };

  const dataLocation =
    data?.data[0]?.dataLocation === undefined
      ? []
      : data?.data[0]?.dataLocation;
  const configLocation = {
    data: dataLocation,
    xField: "value",
    yField: "type",
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "People",
      },
    },
    minBarWidth: 16,
    maxBarWidth: 16,
  };

  return (
    <div className="report-audience-layout">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="report-audience-bg audience-follower">
            <div className="audience-follower-chart">
              Followers
              <Line {...configFollower} className="follower-chart" />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="report-audience-bg audience-gender">
            <div className="audience-gender-chart">
              Gender
              <Pie {...configGender} className="gender-chart" />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="report-audience-bg audience-age">
            <div className="audience-age-chart">
              Age
              <Bar {...configAge} className="age-chart" />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="report-audience-bg audience-location">
            <div className="audience-location-chart">
              Location
              <Bar {...configLocation} className="location-chart" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReportAudience;
