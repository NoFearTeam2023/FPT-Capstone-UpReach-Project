import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderLoginHompape from "../../Components/Layouts/Header/HeaderLoginHompape";
import React, { useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "./MyInfluencer.css";
import MyListPage from "./MyListPage";
import MyHistoryReport from "./MyHistoryReportPage";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const MyInfluencer = (navigateHome) => {
  const [checkTabListPage, setCheckTabListPage] = useState(true);
  const items = [
    {
      type: "divider",
    },
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("List 1", "1"),
      getItem("List 2", "2"),
      getItem("List 3", "3"),
      getItem("+ Add New", "new"),
    ]),
    getItem(
      "",
      "grp",
      null,
      [getItem("My History Report", "history")],
      "group"
    ),
  ];
  const onClick = (e) => {
    console.log("click ", e);
    if (e.key === "history") {
      setCheckTabListPage(false);
      console.log(items);
    } else {
      setCheckTabListPage(true);
      console.log("true");
    }
  };
  return (
    <div className="coverMain">
      <HeaderLoginHompape />
      <div className="row pt-5">
        <div className="col-2 pt-2">
          <Menu
            onClick={onClick}
            className="menu"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </div>
        <div className="col-10">
          {checkTabListPage ? <MyListPage /> : <MyHistoryReport />}
        </div>
      </div>

      <FooterHome />
    </div>
  );
};
export default MyInfluencer;
