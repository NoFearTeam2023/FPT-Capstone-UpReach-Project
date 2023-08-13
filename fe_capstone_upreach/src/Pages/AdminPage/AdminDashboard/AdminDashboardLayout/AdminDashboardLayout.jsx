import React from "react";
import "./AdminDashboardLayout.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import AdminTotalStatusCard from "./AdminTotalStatusCard/AdminTotalStatusCard";
import AdminTopCards from "./AdminTopCards/AdminTopCards";
import AdminTopIncome from "./AdminTopIncome/AdminTopIncome";

const AdminDashboardLayout = () => {
  const [sortOption, setSortOption] = React.useState("Choose Option");
  const items = [
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Monthly
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Year
        </p>
      ),
      key: "1",
    },
  ];
  return (
    <>
      <div className="admin-dashboard-layout">
        <div className="admin-dashboard-title">
          <p>OVERVIEW</p>
          <div className="dashboard-filter">
            <p>Sort by:</p>
            <div className="dashboard-sort-by">
              <Dropdown menu={{ items }} trigger={"click"}>
                <a>
                  <Space>{sortOption}</Space>
                </a>
              </Dropdown>
              <DownOutlined />
            </div>
          </div>
        </div>
        <div className="admin-total-status">
          <AdminTotalStatusCard />
        </div>
        <div className="admin-top">
          <div className="admin-top-cards">
            <AdminTopCards />
          </div>
          <div className="admin-top-income">
            <AdminTopIncome />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboardLayout;
