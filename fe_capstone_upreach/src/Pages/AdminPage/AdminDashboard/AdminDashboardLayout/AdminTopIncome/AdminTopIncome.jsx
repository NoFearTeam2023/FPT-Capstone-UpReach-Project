import React from "react";
import "./AdminTopIncome.css";

import { Table } from "antd";
const AdminTopIncome = () => {
  const tags = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Package",
      dataIndex: "package",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];
  const data = [
    {
      key: "1",
      name: "Le Quang Hieu",
      package: "Upgrade Business",
      price: "$79",
      date: "02 Day ago",
    },
    {
      key: "2",
      name: "Minh",
      package: "Upgrade Gold",
      price: "$149",
      date: "03 Day ago",
    },
    {
      key: "3",
      name: "Huy",
      package: "Upgrade Starter",
      price: "$49",
      date: "04 Day ago",
    },
    {
      key: "4",
      name: "Huy",
      package: "Upgrade Starter",
      price: "$49",
      date: "04 Day ago",
    },
    {
      key: "5",
      name: "Huy",
      package: "Upgrade Starter",
      price: "$49",
      date: "04 Day ago",
    },
    {
      key: "6",
      name: "Huy",
      package: "Upgrade Starter",
      price: "$49",
      date: "04 Day ago",
    },
    {
      key: "7",
      name: "Huy",
      package: "Upgrade Starter",
      price: "$49",
      date: "04 Day ago",
    },
  ];
  return (
    <>
      <div className="admin-top-income-bg">
        <div className="admin-top-income-title">
          <p className="admin-top-income-sub-title">RECENT INCOME</p>
          <p className="admin-top-income-view-all">View all</p>
        </div>
        <div className="admin-top-income-contents">
          <Table
            columns={tags}
            dataSource={data}
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
