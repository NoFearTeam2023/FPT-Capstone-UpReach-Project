import React, { useState } from 'react'
import { Button, Dropdown, Row, Col, Checkbox } from "antd";
import ButtonDropdow from './ButtonDropdow';

function RenderListCheckbox({ valueCheckbox, titleCheckbox }) {
    return (
        <Col span={24}>
            <Checkbox value={valueCheckbox}>{titleCheckbox}</Checkbox>
        </Col>
    );
}

function RenderCheckBoxGroup({ listItemCheckBox, isBtnClear, onChange, onclick, value }) {
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
                    {listItemCheckBox.map((item) => (
                        <RenderListCheckbox
                            valueCheckbox={item.value}
                            titleCheckbox={item.name}
                        />
                    ))}
                </Row>
            </Checkbox.Group>
            {isBtnClear ? <Button className="fw-bold mt-4" onClick={onclick}>Clear</Button> : <></>}
        </>
    );
}


const DropdownOfCheckBox = ({ listItemCheckBox, titleBtn, className }) => {
    const [value, setValue] = useState()

    //Func Khi click vào checkbox thì sẽ set data vào value
    const hanndleOnChange = (checkedValues) => {
        setValue(checkedValues)
    }

    //Func Khi click vào btn clear thì sẽ xóa hết data
    const handleBtnClear = () => {
        setValue([]);
    }

    return (
        <Dropdown
            dropdownRender={() => (
                <div className={"popupFilter mt-2 shadowBox" + className}>
                    <RenderCheckBoxGroup listItemCheckBox={listItemCheckBox} isBtnClear={true} onChange={hanndleOnChange} onclick={handleBtnClear} value={value} />
                </div>
            )}
        >
            <a onClick={(e) => e.preventDefault()}>
                <ButtonDropdow titleBtn={titleBtn} />
            </a>
        </Dropdown>
    )
}

export default DropdownOfCheckBox
