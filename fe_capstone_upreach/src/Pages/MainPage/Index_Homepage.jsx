import React from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE } from "../../Pages/Homepage/Constant";
import "./HomePage.css";
import CardInfo from "./CardInfo";
import {
  Button,
  Select,
  Dropdown,
  Space,
  Slider,
  Row,
  Col,
  Checkbox,
} from "antd";
import FilterSearch from "../MainPage/FilterSearch";

const Index_HomePage = () => {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleMenuClick = (e) => {
    console.log("click", e);
  };
  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
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
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-1"></div>
        <div className="col-10">
          <div className="searchBtns">
            <Select
              className="searchCategoryBtn leftButton"
              // placeholder="searchTitle"
              mode="multiple"
              options={options}
              placeholder={
                <>
                  <p className="searchTitle">Category</p>
                  <p className="searchDescription">
                    Search for categories, keywords, hashtags or influencers
                  </p>
                </>
              }
            ></Select>
            <Select
              className="searchCategoryBtn rightButton"
              mode="multiple"
              placeholder={
                <>
                  <p className="searchTitle">Category</p>
                  <p className="searchDescription">
                    Search for categories, keywords, hashtags or influencers
                  </p>
                </>
              }
              options={options}
            >
              <p className="searchTitle">Category</p>
              <p className="searchDescription">
                Search for categories, keywords, hashtags or influencers
              </p>
            </Select>
            <Button className="bntSreach ms-3">Search</Button>
          </div>
        </div>
        <div className="col-1"></div>
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
            <div className="d-inline mt-4 countTime pt-2">
              Remaining results: <div className="d-inline numberCount">100</div>
              <div className="d-inline mt-4 ms-5 pt-2">
                Remaining reports:{" "}
                <div className="d-inline numberCount">100</div>
                <button className="ms-4 btnAdd">Add More</button>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
      <CardInfo />
    </div>
  );
};

export default Index_HomePage;
