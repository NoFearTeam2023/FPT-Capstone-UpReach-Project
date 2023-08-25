import "./UpdateReportAudience.css";
import { Row, Col, Button } from "antd";
import { Line, Pie, Bar } from "@ant-design/plots";
import React from "react";
import { ExcelRenderer } from "react-excel-renderer";
import axios from "axios";
import getDataFollower from "../../mockFollowerExcel";
import getDataGender from "../../mockGenderExcel";
import getDataAge from "../../mockAgeExcel";
import getDataLocation from "../../mockLocationExcel";
import XLSX from "xlsx";

const UpdateReportAudience = ({ influInfo, setPreviewChart, setIsChange }) => {
  const [dataFollower, setDataFollower] = React.useState([]);
  const [dataGender, setDataGender] = React.useState([]);
  const [dataAge, setDataAge] = React.useState([]);
  const [dataLocation, setDataLocation] = React.useState([]);
  const [sheetDataFollower, setSheetDataFollower] = React.useState(null);
  const [sheetDataGender, setSheetDataGender] = React.useState(null);
  const [sheetDataAge, setSheetDataAge] = React.useState(null);
  const [sheetDataLocation, setSheetDataLocation] = React.useState(null);
  const configFollower = {
    data: dataFollower,
    xField: "date",
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
  function convertExcelDateToNormalDate(excelDate) {
    let baseDate = new Date(1900, 0, 1);
    let milliseconds = excelDate * 86400000;
    let resultDate = new Date(baseDate.getTime() + milliseconds);

    let month = resultDate.getMonth() + 1;
    // let day = resultDate.getDate() - 2;
    let year = resultDate.getFullYear();

    // let formattedDate = month + "/" + day + "/" + year;
    let formattedDate = month + "/" + year;

    return formattedDate;
  }

  const fileHandler = (event, chartName) => {
    if (event?.target?.files[0]) {
      let fileObj = event?.target?.files[0];
      ExcelRenderer(fileObj, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          if (chartName === "follower") {
            const rows = resp?.rows?.slice(2, 8);
            const data = rows.map((row) => {
              return {
                date: row[1],
                // date: row[1],
                value: row[2],
              };
            });
            setDataFollower(data);
            setPreviewChart((prevChart) => ({
              ...prevChart,
              dataFollower: data,
            }));
          } else if (chartName === "gender") {
            const rows = resp?.rows?.slice(2, 4);
            const data = rows?.map((row) => {
              return {
                sex: row[1],
                value: row[2],
              };
            });
            setDataGender(data);
            setPreviewChart((prevChart) => ({
              ...prevChart,
              dataGender: data,
            }));
          } else if (chartName === "age") {
            const rows = resp?.rows?.slice(2, 6);
            const data = rows?.map((row) => {
              return {
                age: row[1],
                value: row[2],
              };
            });
            setDataAge(data);
            setPreviewChart((prevChart) => ({
              ...prevChart,
              dataAge: data,
            }));
          } else if (chartName === "location") {
            const rows = resp?.rows?.slice(2, 8);
            const data = rows?.map((row) => {
              return {
                location: row[1],
                value: row[2],
              };
            });
            setDataLocation(data);
            setPreviewChart((prevChart) => ({
              ...prevChart,
              dataLocation: data,
            }));
          }
        }
      });
    }
  };

  React.useEffect(() => {
    if (
      dataFollower?.length > 0 ||
      dataGender?.length > 0 ||
      dataAge?.length > 0 ||
      dataLocation?.length > 0
    ) {
      setIsChange(true);
    }
  }, [dataFollower, dataGender, dataAge, dataLocation]);

  React.useEffect(() => {
    setSheetDataFollower(getDataFollower());
    setSheetDataGender(getDataGender());
    setSheetDataAge(getDataAge());
    setSheetDataLocation(getDataLocation());
  }, []);

  const handleExportFollower = () => {
    // console.log(sheetData);
    var wb = XLSX.utils.book_new(),
      // ws = XLSX.utils.json_to_sheet(sheetDataFollower);
      ws = XLSX.utils.aoa_to_sheet(sheetDataFollower);
    XLSX.utils.book_append_sheet(wb, ws, "FollowerAudience");
    XLSX.writeFile(wb, "FollowerAudience.xlsx");
  };

  const handleExportGender = () => {
    var wb = XLSX.utils.book_new(),
      // ws = XLSX.utils.json_to_sheet(sheetDataGender);
      ws = XLSX.utils.aoa_to_sheet(sheetDataGender);
    XLSX.utils.book_append_sheet(wb, ws, "GenderAudience");
    XLSX.writeFile(wb, "GenderAudience.xlsx");
  };

  const handleExportAge = () => {
    var wb = XLSX.utils.book_new(),
      // ws = XLSX.utils.json_to_sheet(sheetDataGender);
      ws = XLSX.utils.aoa_to_sheet(sheetDataAge);
    XLSX.utils.book_append_sheet(wb, ws, "AgeAudience");
    XLSX.writeFile(wb, "AgeAudience.xlsx");
  };

  const handleExportLocation = () => {
    var wb = XLSX.utils.book_new(),
      // ws = XLSX.utils.json_to_sheet(sheetDataGender);
      ws = XLSX.utils.aoa_to_sheet(sheetDataLocation);
    XLSX.utils.book_append_sheet(wb, ws, "LocationAudience");
    XLSX.writeFile(wb, "LocationAudience.xlsx");
  };

  return (
    <div className="update-report-audience-layout">
      <Button onClick={handleExportFollower} className="export-follower-btn">
        Export
      </Button>
      <Button onClick={handleExportGender} className="export-gender-btn">
        Export
      </Button>
      <Button onClick={handleExportAge} className="export-age-btn">
        Export
      </Button>
      <Button onClick={handleExportLocation} className="export-location-btn">
        Export
      </Button>
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

export default React.memo(UpdateReportAudience);
