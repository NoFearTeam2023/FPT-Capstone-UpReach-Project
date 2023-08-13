import { Button, Form, Input, InputNumber, Select } from "antd";
import React from "react";
import "./CreateInfluencerPage.css";
import { Option } from "antd/es/mentions";

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
                    required: true,
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
                    required: true,
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
                    required: true,
                    message: "Please select your gender",
                  },
                ]}
              >
                <Select placeholder="Select Your Gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
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
                    required: true,
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
                    required: true,
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
                name="type"
                className="information-btn"
                rules={[
                  {
                    required: true,
                    message: "Please enter your influencer type",
                  },
                ]}
              >
                <Select placeholder="Select Your Influencer Type ">
                  <Option value="type1">Celebrity</Option>
                  <Option value="type2">Talent</Option>
                  <Option value="type3">Professional</Option>
                  <Option value="type4">Citizen</Option>
                  <Option value="type5">Community</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="relationship"
                className="information-btn"
                rules={[
                  {
                    required: true,
                    message: "Please enter your relationship",
                  },
                ]}
              >
                <Select placeholder="Select Your Relationship ">
                  <Option value="rela1">Single</Option>
                  <Option value="rela2">Married</Option>
                  <Option value="rela3">Single Mom</Option>
                  <Option value="rela4">Single Dad</Option>
                  <Option value="rela5">Unknown</Option>
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
