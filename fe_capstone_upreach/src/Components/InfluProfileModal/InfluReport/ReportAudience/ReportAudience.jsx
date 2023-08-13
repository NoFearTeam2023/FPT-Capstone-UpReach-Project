import "./ReportAudience.css";
import { Row, Col } from "antd";
import { Line, Pie, Bar } from "@ant-design/plots";

const ReportAudience = () => {
  const dataFollower = [
    {
      year: "2018",
      value: 3,
    },
    {
      year: "2019",
      value: 4,
    },
    {
      year: "2020",
      value: 5,
    },
    {
      year: "2021",
      value: 4,
    },
    {
      year: "2022",
      value: 6,
    },
    {
      year: "2023",
      value: 18,
    },
  ];
  const configFollower = {
    data: dataFollower,
    xField: "year",
    yField: "value",
  };

  const dataGender = [
    {
      sex: "Male",
      value: 45,
    },
    {
      sex: "Female",
      value: 55,
    },
  ];
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

  const dataAge = [
    {
      type: "18-",
      sales: 38,
    },
    {
      type: "18-24",
      sales: 52,
    },
    {
      type: "25-34",
      sales: 61,
    },
    {
      type: "35-44",
      sales: 145,
    },
    {
      type: "45-54",
      sales: 48,
    },
    {
      type: "55+",
      sales: 38,
    },
  ];
  const configAge = {
    data: dataAge,
    xField: "sales",
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

  const dataLocation = [
    {
      type: "TP.HCM",
      sales: 38,
    },
    {
      type: "Ha Noi",
      sales: 52,
    },
    {
      type: "Da Nang",
      sales: 61,
    },
    {
      type: "Hue",
      sales: 14,
    },
    {
      type: "Can Tho",
      sales: 48,
    },
    {
      type: "Quang Binh",
      sales: 38,
    },
  ];
  const configLocation = {
    data: dataLocation,
    xField: "sales",
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
