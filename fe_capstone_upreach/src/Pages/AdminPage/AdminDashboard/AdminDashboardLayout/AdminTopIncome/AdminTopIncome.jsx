import React from "react";
import "./AdminTopIncome.css";
import RecentIncomeCard from "../../../../../Components/RecentIncomeCard/RecentIncomeCard";
import { Table, Tag, Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import default_img from "../../../../../Assets/Image/Default/DefaultImg.jpg";
const AdminTopIncome = ({ listClient }) => {
  const navigate = useNavigate();

  const tags = [
    {
      title: "Avatar",
      dataIndex: "image",
      width: "10%",
      render: (_) => {
        return (
          <Avatar
            src={
              <img
                src={_ || default_img}
                alt="avatar"
                onError={(e) => {
                  e.target.src = default_img;
                }}
              />
            }
            size={45}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
      width: "41%",
    },
    {
      title: "Package",
      dataIndex: "plan",
      width: "15%",
      render: (_) => {
        return (
          <Tag
            color={
              _ === "Gold"
                ? "gold"
                : _ === "Business"
                ? "magenta"
                : _ === "Starter"
                ? "purple"
                : "green"
            }
          >
            {_}
          </Tag>
        );
      },
    },
    {
      title: "Report",
      dataIndex: "pointReport",
      width: "17%",
    },
    {
      title: "Search",
      dataIndex: "pointSearch",
      width: "17%",
    },
  ];

  return (
    <>
      <div className="admin-top-income-bg">
        <div className="admin-top-income-title">
          <p className="admin-top-income-sub-title">Package Plan</p>
          <div className="admin-top-income-view-all">
            <Button
              type="link"
              className="admin-top-income-btn"
              onClick={() => {
                navigate("/admin/upgrade-management");
              }}
            >
              View all
            </Button>
          </div>
        </div>
        <div className="admin-top-income-contents">
          {/* <RecentIncomeCard /> */}
          <Table
            columns={tags}
            dataSource={listClient}
            pagination={{
              pageSize: 3,
            }}
            size="large"
          />
        </div>
      </div>
    </>
  );
};
export default AdminTopIncome;
