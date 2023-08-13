import React, { useState } from "react";
import "./FilterSearch.css";
import "../../../CSS/Theme.css";
import "../HomePage.css";
import { Button, Dropdown, Slider } from "antd";
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
} from "../ConstHomePage";
import DropdownOfCheckBox from "./DropdownOfCheckBox";
import DropdownOfSlider from "./DropdownOfSlider";
import ButtonDropdow from "./ButtonDropdow";
import DropdownOfAudience from "./DropdownOfAudience";

function RenderSelectSearch({
  className,
  options,
  title,
  description,
  onChange,
}) {
  return (
    <Selects
      className={"searchCategoryBtn " + className}
      mode="multiple"
      options={options}
      onChange={onChange}
      placeholder={
        <>
          <p className="searchTitle">{title}</p>
          <p className="searchDescription">{description}</p>
        </>
      }
    />
  );
}

function RenderFilter() {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-sm-start">
        {/* Filter of Type */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfCheckBox
            listItemCheckBox={LIST_TYPE_SEARCH}
            titleBtn="Type"
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
            defaultValue={[0, 500000]}
            marks={COST}
          />
        </div>
        {/* Filter of Age */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Age"
            isDraggable={true}
            defaultValue={[0, 60]}
            marks={AGE}
          />
        </div>
        {/* Filter of Followers */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Followers"
            isDraggable={true}
            defaultValue={[20, 50]}
          />
        </div>
        {/* Filter of Engagement */}
        <div className="ms-1 mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Engagement"
            isDraggable={true}
            defaultValue={[20, 50]}
          />
        </div>
        {/* Filter of Publications */}
        <div className=" mt-4 backgroundMainPage">
          <DropdownOfSlider
            titleBtn="Publications"
            isDraggable={true}
            defaultValue={[20, 50]}
          />
        </div>
        {/* Filter of Content Formats */}
        <div className=" mt-4 backgroundMainPage">
          <DropdownOfCheckBox
            className="width-100-percent"
            listItemCheckBox={LIST_CONTENT_FORMATS_SEARCH}
            titleBtn="Content Formats"
          />
        </div>
        {/* Filter of Audience */}
        <div className=" mt-4 backgroundMainPage">
          <DropdownOfAudience />
        </div>
      </div>
    </>
  );
}

const FilterSearch = () => {
  const [platform, setPlatform] = useState();
  const [category, setCategory] = useState();

  const handleChangePlatform = (selectPlatfrom) => {
    console.log(`selected: ${selectPlatfrom}`);
    setPlatform(selectPlatfrom);
  };

  const handleChangeCategory = (selectCategory) => {
    console.log(`selected: ${selectCategory}`);
    setCategory(selectCategory);
  };

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
                onChange={handleChangePlatform}
              />
              <RenderSelectSearch
                className={LIST_RIGHT_BUTTON_SELECT_SEARCH.className}
                options={LIST_RIGHT_BUTTON_SELECT_SEARCH.options}
                title={LIST_RIGHT_BUTTON_SELECT_SEARCH.title}
                description={LIST_RIGHT_BUTTON_SELECT_SEARCH.description}
                onChange={handleChangeCategory}
              />
              <Button className="bntSreach ms-3">Search</Button>
            </div>
            <div className="col-12">
              <RenderFilter />
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </>
  );
};

export default FilterSearch;
