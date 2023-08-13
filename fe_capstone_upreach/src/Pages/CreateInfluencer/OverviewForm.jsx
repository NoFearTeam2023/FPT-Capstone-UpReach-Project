import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";

const OverviewForm = ({ onFinish, initialValues }) => {
  const [size] = useState("small");
  const suffixSelector1 = (
    <Form.Item name="suffix" noStyle>
      <Select defaultValue="percent">
        <Option value="percent">%</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector2 = (
    <Form.Item name="suffix" noStyle>
      <Select defaultValue="fans">
        <Option value="fans">fans</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector3 = (
    <Form.Item name="suffix" noStyle>
      <Select defaultValue="post">
        <Option value="post">post/week</Option>
      </Select>
    </Form.Item>
  );
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
                  name="email"
                  rules={[
                    {
                      required: true,
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
                      required: true,
                      message: "Please input your phone number",
                    },
                  ]}
                >
                  <Input placeholder="Phone we can contact with you!" />
                </Form.Item>
              </div>
              <div className="overview-form-pub">
                <h5>Your Publication</h5>

                <Form.Item
                  label="Followers"
                  tooltip="This follower count is the number of followers of your highest platform."
                  name="follower"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      required: true,
                      message: "Please input your followers of social",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                    addonAfter={suffixSelector2}
                    placeholder="Followers"
                  />
                </Form.Item>
                <Form.Item
                  name="engagement"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 100,
                      required: true,
                      message: "Please input your engagement of social",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                    addonAfter={suffixSelector1}
                    placeholder="Engagement"
                  />
                </Form.Item>
                <Form.Item
                  name="post"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 100,
                      required: true,
                      message: "Please input your post per week",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                    addonAfter={suffixSelector3}
                    placeholder="Post per week"
                  />
                </Form.Item>
                <div className="cost-select-form">
                  <Form.Item
                    name="cost-form"
                    label="Cost estimatie"
                    tooltip="This estimate depends on the influencer's stats, country, and if they're a personality off social media."
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        required: true,
                        message: "Please input your cost estimatie ",
                      },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      style={{
                        width: "159px",
                        textAlign: "center",
                      }}
                      placeholder="From"
                    />
                  </Form.Item>
                  <FormItem>
                    <p
                      style={{
                        width: 30,
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      ~
                    </p>
                  </FormItem>
                  <FormItem
                    name="cost-to"
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        required: true,
                        message: "Please input your cost estimatie ",
                      },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      style={{
                        width: "159px",
                        textAlign: "center",
                      }}
                      placeholder="To"
                    />
                  </FormItem>
                </div>
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
