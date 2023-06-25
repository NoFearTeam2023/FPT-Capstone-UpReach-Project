import React from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE } from "../../Pages/Homepage/Constant";
import "./HomePage.css";
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
import { DownOutlined } from "@ant-design/icons";

const FilterSearch = () => {
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
    <>
      <div className="col-1"></div>
      <div className="col-10 d-flex">
        {/* Filter 1 */}
        <div className="mt-4 backgroundMainPage">
          <Dropdown
            dropdownRender={() => (
              <div className="popupFilter mt-2">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-3">
                    <Checkbox.Group
                      style={{
                        width: "100%",
                      }}
                    >
                      <Row>
                        <Col span={24}>
                          <Checkbox value="A">Celebrity</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="B">Talent</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="C">Professional</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="D">Citizen</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="E">Community</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                    <Button className="fw-bold">Clear</Button>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button
                className="dropdowSlider bg-white"
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  Influencer Type <DownOutlined />
                </Space>
              </Button>
            </a>
          </Dropdown>
        </div>
        {/* Filter 2 */}
        <div className="mt-4 ms-2 backgroundMainPage">
          <Dropdown
            dropdownRender={() => (
              <div className="popupFilter mt-2 width-100-percent">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-3">
                    <div className="fw-bold">Cost</div>
                    <Slider
                      range={{ draggableTrack: true }}
                      defaultValue={[20, 50]}
                    />
                    <Button className="fw-bold">Clear</Button>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button
                className="dropdowSlider bg-white"
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  Cost Estimate <DownOutlined />
                </Space>
              </Button>
            </a>
          </Dropdown>
        </div>
        {/* Filter 3 */}
        <div className="mt-4 ms-2 backgroundMainPage">
          <Dropdown
            dropdownRender={() => (
              <div className="popupFilter mt-2">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-3">
                    <Checkbox.Group
                      style={{
                        width: "100%",
                      }}
                    >
                      <Row>
                        <Col span={24}>
                          <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="C">C</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="E">E</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                    <Button className="fw-bold">Clear</Button>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button
                className="dropdowSlider bg-white"
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  Influencer Age <DownOutlined />
                </Space>
              </Button>
            </a>
          </Dropdown>
        </div>
        {/* Filter 4 */}
        <div className="mt-4 ms-2 backgroundMainPage">
          <Dropdown
            dropdownRender={() => (
              <div className="popupFilter mt-2">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-3">
                    <div className="fw-bold">Cost</div>
                    <Slider
                      range={{ draggableTrack: true }}
                      defaultValue={[20, 50]}
                    />
                    <Button className="fw-bold">Clear</Button>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button
                className="dropdowSlider bg-white"
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  Influencer Followers <DownOutlined />
                </Space>
              </Button>
            </a>
          </Dropdown>
        </div>
        {/* Filter 5 */}
        <div className="mt-4 ms-2 backgroundMainPage">
          <Dropdown
            dropdownRender={() => (
              <div className="popupFilter mt-2">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-3">
                    <Checkbox.Group
                      style={{
                        width: "100%",
                      }}
                    >
                      <Row>
                        <Col span={24}>
                          <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="C">C</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="E">E</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                    <Button className="fw-bold">Clear</Button>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button
                className="dropdowSlider bg-white"
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  Influencer Content Formats <DownOutlined />
                </Space>
              </Button>
            </a>
          </Dropdown>
        </div>
        {/* Filter 5 */}
        <div className="mt-4 ms-2 backgroundMainPage">
          <Dropdown
            dropdownRender={() => (
              <div className="popupFilter mt-2 width-100-percent">
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-3">
                    <div className="fw-bold">Cost</div>
                    <Slider
                      range={{ draggableTrack: true }}
                      defaultValue={[20, 50]}
                    />
                    <Button className="fw-bold">Clear</Button>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button
                className="dropdowSlider bg-white"
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  Audience Audience Age <DownOutlined />
                </Space>
              </Button>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="col-1"></div>
    </>
  );
};

export default FilterSearch;
