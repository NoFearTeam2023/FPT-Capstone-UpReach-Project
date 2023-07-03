import React from "react";
import "../../CSS/Theme.css";
import "./HomePage.css";
import FilterSearch from "./FilterSearch/FilterSearch";
import ProfileCardLayout from "./ProfileCardLayout/ProfileCardLayout";
import { SUB_TITLE } from "../LandingPage/Constant";

const Index_HomePage = () => {
  return (
    <div className="contentHomePage backgroundMainPage">
      <div className="row">
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-8 text-center mt-3">
          <p className="homePageTextTitle d-inline">Find and Hire</p>
          <p className="homePageTextTitleHighlight d-inline"> Influencers </p>
          <p className="homePageTextTitle d-inline">in Seconds.</p>
        </div>
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-8 contentSubTitle text-dark my-4 text-center">
          {SUB_TITLE}
        </div>
        <FilterSearch />
      </div>
      <div className="row text-center">
        <div className="d-inline mt-4 Upgrade pt-2">
          Enjoy full search results with one of our paid plans
          <button className="bg-dark ms-4 btnUpgrade">Upgrade now</button>
        </div>
      </div>
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
    </div>
  );
};

export default Index_HomePage;
