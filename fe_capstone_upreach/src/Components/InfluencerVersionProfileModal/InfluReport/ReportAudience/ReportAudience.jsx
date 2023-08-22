import "./ReportAudience.css";
import { Row, Col } from "antd";
import { Line, Pie, Bar } from "@ant-design/plots";
import React from "react";
const ReportAudience = ({ influInfo, dataReportVersion }) => {
  const [audienceFollower, setAudienceFollower] = React.useState([]);
  const [audienceGender, setAudienceGender] = React.useState([]);
  const [audienceAge, setAudienceAge] = React.useState([]);
  const [audienceLocation, setAudienceLocation] = React.useState([]);
  // console.log(audienceGender);
  // console.log(audienceAge);

  React.useEffect(() => {
    setAudienceFollower(dataReportVersion?.dataFollower);
    setAudienceGender(dataReportVersion?.dataGender);
    setAudienceAge(dataReportVersion?.dataAge);
    setAudienceLocation(dataReportVersion?.dataLocation);
  }, [
    dataReportVersion?.dataFollower,
    dataReportVersion?.dataGender,
    dataReportVersion?.dataAge,
    dataReportVersion?.dataLocation,
  ]);

  const dataFollower =
    audienceFollower[0]?.monthFollow === null ||
    audienceFollower[0]?.value === null
      ? []
      : audienceFollower;
  const configFollower = {
    data: dataFollower,
    xField: "monthFollow",
    yField: "value",
  };

  configFollower?.data?.sort((a, b) => {
    const [aMonth, aYear] = a.monthFollow?.split("/");
    const [bMonth, bYear] = b.monthFollow?.split("/");

    if (parseInt(aYear, 10) !== parseInt(bYear, 10)) {
      return parseInt(aYear, 10) - parseInt(bYear, 10);
    }
    return parseInt(aMonth, 10) - parseInt(bMonth, 10);
  });

  const dataGender =
    audienceGender[0]?.sex === null || audienceGender[0]?.value === null
      ? []
      : audienceGender;
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
    audienceAge[0]?.type === null || audienceAge[0]?.value === null
      ? []
      : audienceAge;

  const configAge = {
    data: dataAge,
    xField: "value",
    yField: "type",
    meta: {
      type: {
        alias: "Age",
      },
      sales: {
        alias: "People",
      },
    },
    minBarWidth: 16,
    maxBarWidth: 16,
  };
  configAge?.data?.sort((a, b) => {
    return a.type.localeCompare(b.type);
  });

  const configLocation = {
    data: audienceLocation,
    xField: "value",
    yField: "type",
    meta: {
      type: {
        alias: "Location",
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
