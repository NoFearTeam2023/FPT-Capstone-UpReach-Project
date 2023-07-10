import React, { useState } from "react";
import MyListPage from "./MyListPage";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import "./MyInfluencer.css";
import ProfileCardLayout from "../HomePage/ProfileCardLayout/ProfileCardLayout";
import "../HomePage/HomePage.css";

const MyHistoryReport = () => {
  return (
    <>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 px-2">
          <div className="row text-center">
            <div className="d-inline mt-3 countTime pt-2">
              Remaining results: <div className="d-inline numberCount">100</div>
              <div className="d-inline mt-3 ms-3 pt-2">
                Remaining reports:{" "}
                <div className="d-inline numberCount">100</div>
                <button className="ms-3 btnAdd">Add More</button>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
      <ProfileCardLayout />
    </>
  );
};
export default MyHistoryReport;
