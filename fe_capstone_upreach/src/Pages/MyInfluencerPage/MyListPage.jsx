import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderLoginHompape from "../../Components/Layouts/Header/HeaderLoginHompape";
import React, { useEffect, useState } from "react";
import { ReactComponent as Influencers } from "../../Assets/Icon/InfluencersMyList.svg";
import { ReactComponent as TotalInteractions } from "../../Assets/Icon/Est.TotalInteractions.svg";
import { ReactComponent as Channels } from "../../Assets/Icon/ChannelsMyList.svg";
import { ReactComponent as PricePerAssignment } from "../../Assets/Icon/PricePerAssignment.svg";
import {
  MailOutlined,
  SettingOutlined,
  EditOutlined,
  RestOutlined,
} from "@ant-design/icons";
import { Menu, Space, Table, Tag } from "antd";
import "./MyInfluencer.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MyListPage = () => {
  const options1 = {
    chart: {
      type: "pie",
      height: 250,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },

    series: [
      {
        data: [30, 30, 40, 50, 60, 70],
      },
    ],
  };
  const options2 = {
    chart: {
      type: "bar",
      height: 250,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
    },
    yAxis: {
      gridLineWidth: 0,
    },
    plotOptions: {
      series: {
        pointWidth: 10,
      },
    },

    series: [
      {
        data: [30, 30, 40, 50, 60, 70],
      },
    ],
  };
  const columns = [
    {
      title: "All influencer (3)",
      dataIndex: "influencer",
      key: "influencer",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Interactions",
      dataIndex: "interactions",
      key: "interactions",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Cost estimate",
      key: "costestimate",
      dataIndex: "costestimate",
      render: (_, { costestimate }) => (
        <>
          {costestimate.map((costestimate) => {
            let color = costestimate.length > 5 ? "geekblue" : "green";
            if (costestimate === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={costestimate}>
                {costestimate.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "", //Action
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>...</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      influencer: "John Brown",
      followers: 32,
      interactions: "New York No. 1 Lake Park",
      costestimate: ["nice", "developer"],
    },
    {
      key: "2",
      influencer: "Jim Green",
      followers: 42,
      interactions: "London No. 1 Lake Park",
      costestimate: ["loser"],
    },
    {
      key: "3",
      influencer: "Joe Black",
      followers: 32,
      interactions: "Sydney No. 1 Lake Park",
      costestimate: ["cool", "teacher"],
    },
  ];
  return (
    <>
      <div className="row mt-5">
        <div className="col-12 mt-5 ms-5">
          <div className="row">
            <div className="col-10">
              List Name( 2 profile ){" "}
              <button className="button-edit">
                <EditOutlined className="fs-2" /> Edit
              </button>
            </div>
            <div className="col-1 bg-white">
              <button className="button-delete">
                <RestOutlined className="fs-2" /> Delete
              </button>
            </div>
          </div>
        </div>
        {/* card 1 */}
        <div className="col-7 demographic mt-3 ms-4">
          <div className="title mt-3 ms-3">
            Audience Demographic
            <div className="row">
              <div className="col-4">
                <HighchartsReact highcharts={Highcharts} options={options1} />
              </div>
              <div className="col-7">
                <HighchartsReact highcharts={Highcharts} options={options2} />
              </div>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="col-4 demographic mt-3 ms-4">
          <div className="row">
            <div className="col-6 text-center infomation">INFOMATION</div>
            <div className="col-6 text-center type">TYPE</div>
            <div className="col-12 mt-5">
              <div className="row">
                <div className="col-6">
                  <Influencers /> Influencers
                </div>
                <div className="col-6 value-type">3</div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="row">
                <div className="col-6">
                  <Channels /> Channels
                </div>
                <div className="col-6 value-type">3</div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="row">
                <div className="col-6">
                  <TotalInteractions /> Est. total interactions
                </div>
                <div className="col-6 value-type">3</div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="row">
                <div className="col-6">
                  <PricePerAssignment /> Price Per Assignment
                </div>
                <div className="col-6 value-type">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 group-by mt-5 ms-4">Group By</div>
      <div className="row">
        <div className="col-12 table-my-list mt-4 ms-4 mb-5">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
};
export default MyListPage;
