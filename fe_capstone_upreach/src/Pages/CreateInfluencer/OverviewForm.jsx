import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";

const OverviewForm = ({ onFinish, initialValues }) => {
  const [size] = useState("small");
  return (
    <>
      <div id="content">
        <div className="form-information">
          <div className="title-information-form">
            <h3>Overview </h3>
          </div>
          <div className="form-information-form">
            <Form onFinish={onFinish} initialValues={initialValues}>
              <div className="overview-form-contact">
                <h5>Your Contact Information</h5>
                <Form.Item
                  name="emailContact"
                  rules={[
                    {
                      required: false,
                      message: "Please input your email",
                    },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    className="information-btn"
                    placeholder="Email we can contact with you!"
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      min: 10,
                      max: 10,
                      required: false,
                      message: "Please input your phone number",
                    },
                  ]}
                >
                  <Input placeholder="Phone we can contact with you!" />
                </Form.Item>
              </div>
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

export default OverviewForm;
