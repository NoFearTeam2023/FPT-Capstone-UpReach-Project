import React from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE, CONTENT } from "./Constant";
import { Button, Dropdown, Space } from "antd";
import { ReactComponent as IconSearch } from "../../../src/Assets/Icon/Search_icon.svg";
import { ReactComponent as IconApplication } from "../../../src/Assets/Icon/IconApplication.svg";
import { ReactComponent as SonTungBackground } from "../../../src/Assets/Icon/SonTungBackground.svg";
import { ReactComponent as IconArrow } from "../../../src/Assets/Icon/IconArrow.svg";
import { ReactComponent as IconDoubleCheck } from "../../../src/Assets/Icon/IconDoubleCheck.svg";
import Buttons from "../../Components/UI/Buttons";
import "./HomePage.css";
import CardFilter from "./CardFilter/CardFilter";
import RecommendCard from "./RecommendCard/RecommendCard";
import TotalUserCard from "./TotalUserCard/TotalUserCard";
import CardHotList from "./HotListCard/CardHotList";

const Index_Homepage = () => {
  const itemSearchBtn = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Any
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Facebook
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Instagram
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Youtube
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Tiktok
        </a>
      ),
    },
  ];

  const itemCategoryBtn = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          All
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Sport/Fitness
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Beauty
        </a>
      ),
    },
  ];

  return (
    <div className="contentHomePage backgroundPage">
      <div className="row pt-5">
        <div className="col-1"></div>
        <div className="col-10 container">
          <div className="row">
            <div className="col-7 mt-4">
              <div className="row mt-5">
                <div className="col-12 ">
                  <p className="homePageTextTitle">Find and Hire</p>
                  <div>
                    <p className="homePageTextTitleHighlight">Influencer</p>
                    <p className="homePageTextTitle">in Seconds.</p>
                  </div>
                </div>
                <div className="col-9 contentSubTitle my-4">{SUB_TITLE}</div>
                <div className="searchBtns">
                  <Dropdown
                    menu={{ items: itemSearchBtn }}
                    placement="bottomLeft"
                    trigger={["click"]}
                  >
                    <Button type="text" className="searchPlatformBtn">
                      <p className="searchTitle">Platform</p>
                      <p className="searchDescription">Choose a platform</p>
                    </Button>
                  </Dropdown>
                  <Dropdown
                    menu={{ items: itemCategoryBtn }}
                    placement="bottomLeft"
                    trigger={["click"]}
                  >
                    <Button type="text" className="searchCategoryBtn">
                      <p className="searchTitle">Category</p>
                      <p className="searchDescription">
                        Search for categories, keywords, hashtags or influencers
                      </p>
                    </Button>
                  </Dropdown>
                  <div className="iconSearchBtn">
                    <Button
                      className="backgroundDark iconSearch"
                      shape="circle"
                      icon={<IconSearch />}
                    ></Button>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="col-5 pb-5">
              <div className="imageSVG ms-5 p-0">
                <div className="imageIconApplication">
                  <IconApplication />
                </div>
                <div className="imageSonTungBackground">
                  <SonTungBackground />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-5">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4 ms-5 text-center">
              <Buttons
                className="discoverBtn"
                text="Discover Now"
                icon={<IconArrow />}
              />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </div>
      {/*================================================================ TAB 2 =========================================================*/}
      <div className="row ms-5">
        <div className="col-12 pt-5">
          <div className="row pt-5">
            <div style={{ position: "relative" }} className="col-5 pt-4">
              <CardFilter />
              <div className="recommendCard">
                <RecommendCard />
              </div>
            </div>
            <div className="col-7 mt-4 pt-5">
              <div className="homePageTextTitleHighlight text-center pt-2 ">
                {CONTENT[0]}
              </div>
              <div className="subTitle font-Volkhov margin-left-110 my-4">
                {CONTENT[1]}
              </div>
              <div className="font-size-16 font-Poppins margin-left-110 my-4">
                {<IconDoubleCheck />} {CONTENT[2]}
              </div>
              <div className="font-size-16 font-Poppins margin-left-110 my-4">
                {<IconDoubleCheck />} {CONTENT[3]}
              </div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>

      {/*================================================================ TAB 3 =========================================================*/}
      <div className="pt-5">
        <div>
          <TotalUserCard />
        </div>
      </div>
      <div className="pt-5">
        <div>
          <CardHotList />
        </div>
      </div>
    </div>
  );
};

export default Index_Homepage;
