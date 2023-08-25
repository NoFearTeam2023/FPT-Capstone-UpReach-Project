import React, { useEffect, useState } from "react";
import { Button, Dropdown, Row, Col, Checkbox } from "antd";
import ButtonDropdown from "./ButtonDropdown";

function RenderListCheckbox({ valueCheckbox, titleCheckbox }) {
  return (
    <Col span={24}>
      <Checkbox value={valueCheckbox}>{titleCheckbox}</Checkbox>
    </Col>
  );
}

function RenderCheckBoxGroup({
  listItemCheckBox,
  isBtnClear,
  onChange,
  onclick,
  value,
}) {
  return (
    <>
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={onChange}
        value={value}
      >
        <Row>
          {listItemCheckBox.map((item, index) => (
            <RenderListCheckbox
              key={index}
              valueCheckbox={item.value}
              titleCheckbox={item.name}
            />
          ))}
        </Row>
      </Checkbox.Group>
      {isBtnClear ? (
        <Button className="fw-bold mt-4" onClick={onclick}>
          Clear
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

const DropdownOfCheckBox = ({
  listItemCheckBox,
  titleBtn,
  className,
  checkClearAll,
  dataSearch,
  setDataSearch,
}) => {
  const [value, setValue] = useState();

  //Func Khi click vào checkbox thì sẽ set data vào value
  const hanndleOnChange = (checkedValues) => {
    setValue(checkedValues);
    if (titleBtn === "Type") {
      setDataSearch({ ...dataSearch, nameType: checkedValues });
    }
    if (titleBtn === "Content Formats") {
      console.log(value);
      setDataSearch({ ...dataSearch, contentFormats: checkedValues });
    }
    // setInputSearch({});
    // console.log(value);
    // change background when onchange filter
    document.getElementById(titleBtn).classList.add("active-filter");
  };

  //Func Khi click vào btn clear thì sẽ xóa hết data
  const handleBtnClear = () => {
    if (titleBtn === "Type") {
      setDataSearch({ ...dataSearch, nameType: [""] });
    }
    if (titleBtn === "Content Formats") {
      console.log(value);
      setDataSearch({ ...dataSearch, contentFormats: [""] });
    }
    setValue([]);
    // change background when onchange filter
    document.getElementById(titleBtn).classList.remove("active-filter");
  };

  useEffect(() => {
    handleBtnClear();
  }, [checkClearAll]);

  return (
    <Dropdown
      dropdownRender={() => (
        <div className={"popupFilter mt-2 shadowBox" + className}>
          <RenderCheckBoxGroup
            listItemCheckBox={listItemCheckBox}
            isBtnClear={true}
            onChange={hanndleOnChange}
            onclick={handleBtnClear}
            value={value}
          />
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <ButtonDropdown Id={titleBtn} titleBtn={titleBtn} />
      </a>
    </Dropdown>
  );
};

export default DropdownOfCheckBox;
