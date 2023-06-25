import React from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE, CONTENT, ITEMSEARCHBTN, ITEMCATEGORYBTN, PLATFORM, DESCRIBE_PLAFORM, CATEGORY, DESCRIBE_CATEGORY } from "./Constant";
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

//render about dropdown
function RenderDropdown({ listItems, title, description }) {
  return (
    <Dropdown
      menu={{ items: listItems }}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <Button type="text" className="searchPlatformBtn">
        <p className="searchTitle">{title}</p>
        <p className="searchDescription">{description}</p>
      </Button>
    </Dropdown>
  )
}

const Index_Homepage = ({ handleClickLogin }) => {

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
                  <RenderDropdown listItems={ITEMSEARCHBTN} title={PLATFORM} description={DESCRIBE_PLAFORM} />
                  <RenderDropdown listItems={ITEMCATEGORYBTN} title={CATEGORY} description={DESCRIBE_CATEGORY} />
                  <div className="iconSearchBtn">
                    <Buttons
                      className="backgroundDark iconSearch"
                      shape="circle"
                      icon={<IconSearch />}
                      onClick={handleClickLogin}
                    />
                  </div>
                </div>
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
                onClick={handleClickLogin}
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
              <CardFilter onClick={handleClickLogin} />
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
          <CardHotList onClick={handleClickLogin} />
        </div>
      </div>
    </div>
  );
};

export default Index_Homepage;
