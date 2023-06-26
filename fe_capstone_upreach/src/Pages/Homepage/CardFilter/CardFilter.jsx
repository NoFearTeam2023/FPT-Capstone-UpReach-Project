import { Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./CardFilter.css";

const CardFilter = () => {
  const [genderOption, setGenderOption] = React.useState("");
  const [checkAllGender, setCheckAllGender] = React.useState(false);
  const [ageOption, setAgeOption] = React.useState("");
  const [checkAllAge, setCheckAllAge] = React.useState(false);
  const [socialOption, setSocialOption] = React.useState("");
  const [checkAllSocial, setCheckAllSocial] = React.useState(false);

  const [filterOption, setFilterOption] = React.useState([]);

  const genderOptions = ["Male", "Female"];
  const ageOptions = ["Age 18 - 21", "Age 21 - 29", "Over 30"];
  const socialOptions = ["Facebook", "Instagram", "Youtube", "Tiktok"];

  const onChangeGender = (listGender) => {
    setGenderOption(listGender);
    setCheckAllGender(listGender.length === genderOptions.length);
  };

  const onCheckAllChangeGender = (eGender) => {
    setGenderOption(eGender.target.checked ? genderOptions : []);
    setCheckAllGender(eGender.target.checked);
  };

  const onChangeAge = (listAge) => {
    setAgeOption(listAge);
    setCheckAllAge(listAge.length === ageOptions.length);
  };

  const onCheckAllChangeAge = (eAge) => {
    setAgeOption(eAge.target.checked ? ageOptions : []);
    setCheckAllAge(eAge.target.checked);
  };

  const onChangeSocial = (listSocial) => {
    setSocialOption(listSocial);
    setCheckAllSocial(listSocial.length === socialOptions.length);
  };

  const onCheckAllChangeSocial = (eSocial) => {
    setSocialOption(eSocial.target.checked ? socialOptions : []);
    setCheckAllSocial(eSocial.target.checked);
  };

  const handleFilterClick = () => {
    // const filterOption = [genderOption, ageOption, socialOption];
    const filterOption = [...genderOption, ...ageOption, ...socialOption];

    setFilterOption(filterOption);

    console.log(filterOption);
  };

  return (
    <div className="cardFilter">
      <div className="row">
        <div className="col-4 ">
          <div className="filterTitle">Gender</div>
          <div className="filterOptions">
            <Checkbox
              className="checkAll"
              onChange={onCheckAllChangeGender}
              checked={checkAllGender}
            >
              All
            </Checkbox>
            <Checkbox.Group
              options={genderOptions}
              onChange={onChangeGender}
              value={genderOption}
            />
          </div>
        </div>
        <div className="col-4 ">
          <div className="filterTitle">Age</div>
          <div className="filterOptions">
            <Checkbox
              className="checkAll"
              onChange={onCheckAllChangeAge}
              checked={checkAllAge}
            >
              All
            </Checkbox>
            <Checkbox.Group
              options={ageOptions}
              value={ageOption}
              onChange={onChangeAge}
            />
          </div>
        </div>
        <div className="col-4 ">
          <div className="filterTitle">Social</div>
          <div className="filterOptions">
            <Checkbox
              className="checkAll"
              onChange={onCheckAllChangeSocial}
              checked={checkAllSocial}
            >
              All
            </Checkbox>
            <Checkbox.Group
              options={socialOptions}
              onChange={onChangeSocial}
              value={socialOption}
            />
          </div>
        </div>
      </div>
      <div className="filterBtn">
        <Button
          style={{ height: "35px", width: "150px" }}
          icon={<SearchOutlined />}
          onClick={handleFilterClick}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};
export default CardFilter;
