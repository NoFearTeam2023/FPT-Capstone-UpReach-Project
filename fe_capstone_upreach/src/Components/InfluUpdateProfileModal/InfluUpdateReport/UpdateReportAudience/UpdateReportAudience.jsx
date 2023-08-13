import "./UpdateReportAudience.css";
import { Row, Col } from "antd";
import { Line, Pie, Bar } from "@ant-design/plots";
import React from "react";
import { ExcelRenderer } from "react-excel-renderer";

const UpdateReportAudience = () => {
  const [dataFollower, setDataFollower] = React.useState([
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
  ]);

  const [dataGender, setDataGender] = React.useState([
    {
      sex: "Male",
      value: 45,
    },
    {
      sex: "Female",
      value: 55,
    },
  ]);

  const [dataAge, setDataAge] = React.useState([
    {
      age: "18-",
      value: 38,
    },
    {
      age: "18-24",
      value: 52,
    },
    {
      age: "25-34",
      value: 61,
    },
    {
      age: "35-44",
      value: 145,
    },
    {
      age: "45-54",
      value: 48,
    },
    {
      age: "55+",
      value: 38,
    },
  ]);
  const [dataLocation, setDataLocation] = React.useState([
    {
      location: "TP.HCM",
      value: 38,
    },
    {
      location: "Ha Noi",
      value: 52,
    },
    {
      location: "Da Nang",
      value: 61,
    },
    {
      location: "Hue",
      value: 14,
    },
    {
      location: "Can Tho",
      value: 48,
    },
    {
      location: "Quang Binh",
      value: 38,
    },
  ]);
  const configFollower = {
    data: dataFollower,
    xField: "year",
    yField: "value",
  };

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

  const configAge = {
    data: dataAge,
    xField: "value",
    yField: "age",
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

  const configLocation = {
    data: dataLocation,
    xField: "value",
    yField: "location",
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
  const fileHandler = (event, chartName) => {
    if (event.target.files[0]) {
      let fileObj = event.target.files[0];

      ExcelRenderer(fileObj, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          if (chartName === "follower") {
            const rows = resp.rows.slice(1);
            const data = rows.map((row) => {
              return {
                year: row[0],
                value: row[1],
              };
            });
            setDataFollower(data);
          } else if (chartName === "gender") {
            const rows = resp.rows.slice(1);

            const data = rows.map((row) => {
              return {
                sex: row[0],
                value: row[1],
              };
            });
            setDataGender(data);
          } else if (chartName === "age") {
            const rows = resp.rows.slice(1);
            const data = rows.map((row) => {
              return {
                age: row[0],
                value: row[1],
              };
            });
            setDataAge(data);
          } else if (chartName === "location") {
            const rows = resp.rows.slice(1);
            const data = rows.map((row) => {
              return {
                location: row[0],
                value: row[1],
              };
            });
            setDataLocation(data);
          }
        }
      });
    }
  };
  return (
    <div className="update-report-audience-layout">
      <Row gutter={[16, 16]}>
        <Col style={{ position: "relative" }} span={12}>
          <input
            type="file"
            id="import-follower"
            className="import-excel-follower"
            onChange={(e) => fileHandler(e, "follower")}
          />
          <label className="file-label" htmlFor="import-follower">
            Import data
          </label>
          <div className="report-audience-bg audience-follower">
            <div className="audience-follower-chart">
              Followers
              <Line {...configFollower} className="follower-chart" />
            </div>
          </div>
        </Col>
        <Col style={{ position: "relative" }} span={12}>
          <input
            type="file"
            id="import-gender"
            className="import-excel-follower"
            onChange={(e) => fileHandler(e, "gender")}
          />
          <label className="file-label" htmlFor="import-gender">
            Import data
          </label>
          <div className="report-audience-bg audience-gender">
            <div className="audience-gender-chart">
              Gender
              <Pie {...configGender} className="gender-chart" />
            </div>
          </div>
        </Col>
        <Col style={{ position: "relative" }} span={12}>
          <input
            type="file"
            id="import-age"
            className="import-excel-follower"
            onChange={(e) => fileHandler(e, "age")}
          />
          <label className="file-label" htmlFor="import-age">
            Import data
          </label>
          <div className="report-audience-bg audience-age">
            <div className="audience-age-chart">
              Age
              <Bar {...configAge} className="age-chart" />
            </div>
          </div>
        </Col>
        <Col style={{ position: "relative" }} span={12}>
          <input
            type="file"
            id="import-location"
            className="import-excel-follower"
            onChange={(e) => fileHandler(e, "location")}
          />
          <label className="file-label" htmlFor="import-location">
            Import data
          </label>
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

export default UpdateReportAudience;
