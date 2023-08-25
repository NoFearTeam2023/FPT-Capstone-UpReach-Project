import { Button, Form, Input, InputNumber, Select } from "antd";
import React, {useRef, useState} from "react";
import "./CreateInfluencerPage.css";
import { Option } from "antd/es/mentions";
import ApiUser from "../../Api/ApiUser";
const InformationForm = ({ onFinish, initialValues }) => {

  
  return (
    <>
      <div id="content">
        <div className="form-information">
          <div className="title-information-form">
            <h3>Basic Information</h3>
          </div>
          <div className="form-information-form">
            <Form onFinish={onFinish} initialValues={initialValues}>
              <Form.Item
                name="nickname"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please input your nickname!",
                  },
                ]}
              >
                <Input placeholder="Enter Your Nickname" />
              </Form.Item>
              <Form.Item
                name="location"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please select your location",
                  },
                ]}
              >
                <Select placeholder="Select Your Location">
                  <Option value="location1">TP Hồ Chí MInh</Option>
                  <Option value="location2">TP Hà Nội</Option>
                  <Option value="location3">TP Hà Nội</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="gender"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please select your gender",
                  },
                ]}
              >
                <Select placeholder="Select Your Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={["age"]}
                className="information-btn"
                rules={[
                  {
                    type: "number",
                    min: 18,
                    max: 99,
                    required: false,
                    message: "Please enter your age",
                  },
                ]}
              >
                <InputNumber placeholder="Age" />
              </Form.Item>
              <Form.Item
                name="intro"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please enter your Intro",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter Your Bio"
                  showCount
                  maxLength={500}
                />
              </Form.Item>
              <Form.Item
                name="typeId"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please enter your influencer type",
                  },
                ]}
              >
                <Select placeholder="Select Your Influencer Type ">
                  <Option value="IT01">Celebrity</Option>
                  <Option value="IT02">Talent</Option>
                  <Option value="IT03">Professional</Option>
                  <Option value="IT04">Citizen</Option>
                  <Option value="IT05">Community</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="relationship"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please enter your relationship",
                  },
                ]}
              >
                <Select placeholder="Select Your Relationship ">
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Single Mom">Single Mom</Option>
                  <Option value="Single Dad">Single Dad</Option>
                  <Option value="Unknown">Unknown</Option>
                </Select>
              </Form.Item>
              <div>
                <Button
                  className="submit-information-btn"
                  type="primary"
                  htmlType="submit"
                >
                  Continue
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationForm;
