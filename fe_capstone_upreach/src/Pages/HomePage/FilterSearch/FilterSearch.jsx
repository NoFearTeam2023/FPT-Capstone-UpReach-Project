import React, { useEffect, useState } from "react";
import "./FilterSearch.css";
import "../../../CSS/Theme.css";
import "../HomePage.css";
import { Button } from "antd";
import Selects from "../../../Components/UI/Selects";
import {
  GENDER_OF_AUDIANCE,
  LIST_CONTENT_FORMATS_SEARCH,
  LIST_LEFT_BUTTON_SELECT_SEARCH,
  LIST_RIGHT_BUTTON_SELECT_SEARCH,
  LIST_SELECT_SEARCH,
  LIST_TYPE_SEARCH,
  COST,
  AGE,
  FOLLOWERS,
  ENGAGEMENT,
  PUBLICATION,
} from "../ConstHomePage";
import DropdownOfCheckBox from "./DropdownOfCheckBox";
import DropdownOfSlider from "./DropdownOfSlider";
import ButtonDropdown from "./ButtonDropdown";
import DropdownOfAudience from "./DropdownOfAudience";
import ApiGetInfoAndFilterInfluencer from "../../../Api/ApiGetInfoAndFilterInfluencer";
import PointAndHistoryReport from "../../../Api/ApiPointAndHistoryReport";

function RenderSelectSearch({
  className,
  options,
  title,
  description,
  onChange,
  value,
}) {
  return (
    <Selects
      className={"searchCategoryBtn " + className}
      mode="multiple"
      options={options}
      onChange={onChange}
      value={value}
      allowClears
      placeholder={
        <>
          <p className="searchTitle">{title}</p>
          <p className="searchDescription">{description}</p>
        </>
      }
    />
  );
}
// set button clear all
function RenderFilter({
  isClickSearch,
  setIsClickSearch,
  setLoading,
  setAllInfluencer,
  category,
  setDataSearchToCheck,
  setOldDataSearchToCheck,
  pointSearch,
  setcheckClearAllInputSearch,
}) {
  const dataLocalStorge = JSON.parse(localStorage.getItem("user-draw-storage"))
    .state.user.Client_ID;
  const [checkClearAll, setcheckClearAll] = useState(true);
  const [dataSearch, setDataSearch] = useState({
    // input to filter Influencer
    clientId: dataLocalStorge,
    pointSearch: pointSearch,
    costEstimateFrom: 0,
    costEstimateTo: 5000000,
    followerFrom: 0,
    followerTo: 10000000,
    postsPerWeekFrom: 0,
    postsPerWeekTo: 15,
    engagementFrom: 0,
    engagementTo: 20,
    ageFrom: 0,
    ageTo: 100,
    contentTopic: [],
    nameType: [""],
    contentFormats: [""],
    audienceGender: [""],
    audienceLocation: [""],
  });

  const defaultSearch = {
    clientId: dataLocalStorge,
    pointSearch: pointSearch,
    costEstimateFrom: 0,
    costEstimateTo: 5000000,
    followerFrom: 0,
    followerTo: 10000000,
    postsPerWeekFrom: 0,
    postsPerWeekTo: 15,
    engagementFrom: 0,
    engagementTo: 20,
    ageFrom: 0,
    ageTo: 100,
    contentTopic: [],
    nameType: [""],
    contentFormats: [""],
    audienceGender: [""],
    audienceLocation: [""],
  };

  function handleClearAll() {
    setcheckClearAll(!checkClearAll);
    setcheckClearAllInputSearch(!checkClearAll);
    setDataSearch(defaultSearch);
  }
  // fetch Data search BE
  const fetchDataSearch = async () => {
    try {
      console.log(dataSearch);
      // const User = await JSON.parse(localStorage.getItem("user-draw-storage"))
      //   .state.user;
      const response = await ApiGetInfoAndFilterInfluencer.searchInfluencer(
        dataSearch
      );
      // setAllInfluencer(response);
      setAllInfluencer(response);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // UseEffect
  useEffect(() => {
    setcheckClearAll(!checkClearAll);
    setOldDataSearchToCheck(dataSearch);
  }, []);

  useEffect(() => {
    setDataSearchToCheck(dataSearch);
  }, [dataSearch]);

  //check duplicate search
  useEffect(() => {
    if (isClickSearch === true) {
      setOldDataSearchToCheck(dataSearch);
      fetchDataSearch(dataSearch);
    }
    setIsClickSearch(false);
  }, [isClickSearch]);

  useEffect(() => {
    setDataSearch({ ...dataSearch, contentTopic: category });
    console.log(dataSearch);
  }, [category]);
  return (
    <>
      <div className="d-flex flex-wrap justify-content-sm-start">
        {/* Filter of Type */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfCheckBox
            listItemCheckBox={LIST_TYPE_SEARCH}
            titleBtn="Type"
            checkClearAll={checkClearAll}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
          />
        </div>
        {/* Filter of Cost Estimate */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Cost Estimate"
            min={0}
            max={5000000}
            step={500000}
            isDraggable={true}
            defaultValue={[0, 5000000]}
            marks={COST}
            checkClearAll={checkClearAll}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
          />
        </div>
        {/* Filter of Age */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Age"
            isDraggable={true}
            defaultValue={[0, 100]}
            marks={AGE}
            checkClearAll={checkClearAll}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
          />
        </div>
        {/* Filter of Followers */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Followers"
            isDraggable={true}
            min={0}
            max={10000000}
            step={500000}
            defaultValue={[0, 10000000]}
            marks={FOLLOWERS}
            checkClearAll={checkClearAll}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
          />
        </div>
        {/* Filter of Engagement */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Engagement"
            isDraggable={true}
            defaultValue={[0, 20]}
            min={0}
            max={20}
            marks={ENGAGEMENT}
            checkClearAll={checkClearAll}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
          />
        </div>
        {/* Filter of Publications */}
        <div className=" mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Post per week"
            isDraggable={true}
            defaultValue={[0, 15]}
            min={0}
            max={15}
            marks={PUBLICATION}
            checkClearAll={checkClearAll}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
          />
        </div>
        {/* Filter of Content Formats */}
        <div className=" mt-4 backgroundMainPage">
          <DropdownOfCheckBox
            className="width-100-percent"
            listItemCheckBox={LIST_CONTENT_FORMATS_SEARCH}
            titleBtn="Content Formats"
            checkClearAll={checkClearAll}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
          />
        </div>
        {/* Filter of Audience
        <div className=" mt-4 backgroundMainPage">
          <DropdownOfAudience checkClearAll={checkClearAll} />
        </div> */}
        <div className=" mt-4 backgroundMainPage">
          <Button onClick={handleClearAll} className="dropdownSlider bg-white">
            Clear All
          </Button>
        </div>
      </div>
    </>
  );
}

const FilterSearch = ({
  setAllInfluencer,
  setLoading,
  loading,
  pointSearch,
  setPointSearch,
  isShowPopupUpgrade,
  setIsShowPopupUpgrade,
}) => {
  const [platform, setPlatform] = useState([]);
  const [category, setCategory] = useState([]);
  const [isClickSearch, setIsClickSearch] = useState(false);
  const [dataSearchToCheck, setDataSearchToCheck] = useState([]);
  const [oldDataSearchToCheck, setOldDataSearchToCheck] = useState([]);
  const [checkClearAllInputSearch, setcheckClearAllInputSearch] =
    useState(false);
  // BE update point search
  const updatePointSearch = async (PointSearch) => {
    try {
      const User = await JSON.parse(localStorage.getItem("user-draw-storage"))
        .state.user;
      const response = await PointAndHistoryReport.updatePointSearch(
        User.Client_ID,
        PointSearch
      );
      console.log(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  //===========================================
  const handleSubmitFilter = () => {
    if (dataSearchToCheck != oldDataSearchToCheck && pointSearch - 10 > 0) {
      updatePointSearch(pointSearch - 10);
      setPointSearch(pointSearch - 10);
      setIsClickSearch(true);
      setLoading(true);
    } else {
      setIsShowPopupUpgrade(true);
    }
  };

  const handleChangePlatform = (selectPlatfrom) => {
    console.log(`selected: ${selectPlatfrom}`);
    setPlatform(selectPlatfrom);
  };

  const handleChangeCategory = (selectCategory) => {
    console.log(`selected: ${selectCategory}`);
    setCategory(selectCategory);
  };

  useEffect(() => {
    setCategory([]);
    setPlatform([]);
  }, [checkClearAllInputSearch]);

  useEffect(() => {
    if (loading) {
      document.querySelector(".bntSreach").disabled = true;
    } else {
      document.querySelector(".bntSreach").disabled = false;
    }
  }, [loading]);

  return (
    <>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 shadowBox filterSearch">
          <div className="row">
            <div className="col-12 searchBtns">
              <RenderSelectSearch
                className={LIST_LEFT_BUTTON_SELECT_SEARCH.className}
                options={LIST_LEFT_BUTTON_SELECT_SEARCH.options}
                title={LIST_LEFT_BUTTON_SELECT_SEARCH.title}
                description={LIST_LEFT_BUTTON_SELECT_SEARCH.description}
                value={platform}
                onChange={handleChangePlatform}
              />
              <RenderSelectSearch
                className={LIST_RIGHT_BUTTON_SELECT_SEARCH.className}
                options={LIST_RIGHT_BUTTON_SELECT_SEARCH.options}
                title={LIST_RIGHT_BUTTON_SELECT_SEARCH.title}
                description={LIST_RIGHT_BUTTON_SELECT_SEARCH.description}
                value={category}
                onChange={handleChangeCategory}
              />
              <Button className="bntSreach ms-3" onClick={handleSubmitFilter}>
                Search
              </Button>
            </div>
            <div className="col-12">
              <RenderFilter
                isClickSearch={isClickSearch}
                setIsClickSearch={setIsClickSearch}
                setAllInfluencer={setAllInfluencer}
                setLoading={setLoading}
                category={category}
                setDataSearchToCheck={setDataSearchToCheck}
                setOldDataSearchToCheck={setOldDataSearchToCheck}
                pointSearch={pointSearch}
                setcheckClearAllInputSearch={setcheckClearAllInputSearch}
              />
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </>
  );
};

export default FilterSearch;
