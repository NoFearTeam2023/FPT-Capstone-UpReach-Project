import React from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE } from "../IntroducePage/Constant";
import "./HomePage.css";
import FilterSearch from "./FilterSearch/FilterSearch";
import ProfileCardLayout from "./ProfileCardLayout/ProfileCardLayout";
import { Link } from "react-router-dom";

const Index_HomePage = () => {
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
        <FilterSearch />
      </div>
      <div className="row text-center">
        <div className="d-inline mt-4 Upgrade pt-2">
          Enjoy full search results with one of our paid plans
          <Link to="/upgrade">
            <button className="bg-dark ms-4 btnUpgrade">Upgrade now</button>
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
                <div className="d-inline numberCount">100</div>
                <div className="d-inline mt-3 ms-3 pt-2">
                  Remaining reports:{" "}
                  <div className="d-inline numberCount">100</div>
                  <button className="ms-3 btnAdd">Add More</button>
                </div>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <ProfileCardLayout />
      </div>
    </div>
  );
};

export default Index_HomePage;
