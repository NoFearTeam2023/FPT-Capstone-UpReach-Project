import React, { useState, useEffect } from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE } from "../IntroducePage/Constant";
import "./HomePage.css";
import FilterSearch from "./FilterSearch/FilterSearch";
import ProfileCardLayout from "./ProfileCardLayout/ProfileCardLayout";
import { Link } from "react-router-dom";
import ApiGetInfoAndFilterInfluencer from "../../Api/ApiGetInfoAndFilterInfluencer";
import { FireFilled } from "@ant-design/icons";
import { Spin, Space } from "antd";

const Index_HomePage = ({ setLoadingFullPage }) => {
  const [allInfluencer, setAllInfluencer] = useState();
  const [loading, setLoading] = useState(true);
  const [pointReport, setpointReport] = useState();
  const [pointSearch, setPointSearch] = useState();
  const [isShowPopupUpgrade, setIsShowPopupUpgrade] = useState(false);

  // BE get Influencer
  const fetchDataGetList = async () => {
    try {
      const User = await JSON.parse(localStorage.getItem("user-draw-storage"))
        .state.user;
      const response = await ApiGetInfoAndFilterInfluencer.getAllInfluencer(
        User.email,
        User.roleId
      );
      console.log("res", response);
      for (var i = response.data.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = response.data[i];
        response.data[i] = response.data[j];
        response.data[j] = temp;
      }
      setAllInfluencer(response);
      setpointReport(response.Client.pointReport);
      setPointSearch(response.Client.pointSearch);
      console.log("++++++++++");
      console.log(response);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  // ======================================================
  useEffect(() => {
    setAllInfluencer({});
    fetchDataGetList();
  }, []);

  useEffect(() => {
    // console.log(allInfluencer);
  }, [allInfluencer]);

  return (
    <div className="contentHomePage backgroundMainPage">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 text-center mt-3">
          <p className="homePageTextTitle d-inline">Find and Hire</p>
          <p className="homePageTextTitleHighlight d-inline"> Influencers </p>
          <p className="homePageTextTitle d-inline">in Seconds.</p>
        </div>
        <div className="col-2"></div>
        <div className="col-2"></div>
        <div className="col-8 contentSubTitle text-dark my-4 text-center">
          {SUB_TITLE}
        </div>
        <div className="col-2"></div>
        <FilterSearch
          setAllInfluencer={setAllInfluencer}
          setLoading={setLoading}
          loading={loading}
          pointSearch={pointSearch}
          setPointSearch={setPointSearch}
          isShowPopupUpgrade={isShowPopupUpgrade}
          setIsShowPopupUpgrade={setIsShowPopupUpgrade}
        />
      </div>
      <div className="row text-center">
        <div className="d-inline mt-4 Upgrade pt-2">
          Enjoy full search results with one of our paid plans
          <Link to="/upgrade">
            <button className="bg-dark ms-4 btnUpgrade">
              <FireFilled
                style={{
                  color: "orange",
                  fontSize: "32px",
                }}
              />{" "}
              Upgrade now
            </button>
          </Link>
        </div>
      </div>
      <div className="result-content">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 px-2">
            <div className="row text-center">
              <div className="d-inline mt-3 countTime pt-2">
                Remaining results:{" "}
                {loading ? (
                  <Spin size="small" spinning={loading}></Spin>
                ) : (
                  <div className="d-inline numberCount">{pointSearch}</div>
                )}
                <div className="d-inline mt-3 ms-3 pt-2">
                  Remaining reports:{" "}
                  {loading ? (
                    <Spin size="small" spinning={loading}></Spin>
                  ) : (
                    <div className="d-inline numberCount">{pointReport}</div>
                  )}
                  <Link to="/upgrade">
                    <button className="ms-3 btnAdd">Add More</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <ProfileCardLayout
          allInfluencer={allInfluencer}
          loading={loading}
          setpointReport={setpointReport}
          pointReport={pointReport}
          isShowPopupUpgrade={isShowPopupUpgrade}
          setIsShowPopupUpgrade={setIsShowPopupUpgrade}
          setLoadingFullPage={setLoadingFullPage}
        />
      </div>
    </div>
  );
};

export default Index_HomePage;
