import { Button, Col, Collapse, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import "./ClientProfilePage.css";
import { DownCircleOutlined, EditOutlined } from "@ant-design/icons";
import UpdateEmail from "./UpdateEmail";
import ChangePassword from "./ChangePassword";
import("https://fonts.googleapis.com/css2?family=Volkhov&display=swap");

const ClientProfilePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpenUpdateEmail, setIsModalOpenUpdateEmail] = useState(false);
  const [isSubModel, setSubModel] = useState(false);
  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =
    useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [data, setData] = useState();
  function onFinish(value) {
    setData(value);
  }
  console.log("data", data);

  function handleClickShowDialog() {
    setIsModalOpenUpdateEmail(true);
  }
  function handleClickShowDialogChangePassword() {
    setIsModalOpenChangePassword(true);
  }

  const items = [
    {
      key: "1",
      label: "Advanced",
      children: (
        <>
          <div>
            <p>Sign-In Email</p>
            <EditOutlined onClick={handleClickShowDialog} />
            <UpdateEmail
              isModalOpenUpdateEmail={isModalOpenUpdateEmail}
              setIsModalOpenUpdateEmail={setIsModalOpenUpdateEmail}
              isSubModel={isSubModel}
              setSubModel={setSubModel}
            />

            <p>Password</p>
            <EditOutlined onClick={handleClickShowDialogChangePassword} />
            <ChangePassword
              isModalOpenChangePassword={isModalOpenChangePassword}
              setIsModalOpenChangePassword={setIsModalOpenChangePassword}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <Row style={{ marginTop: "4%" }}>
      <Col span={6}>
        <div className="basicInformation" col>
          <p>Basic infomation</p>
        </div>
      </Col>
      <Col span={18}>
        <Row>
          <Col span={24} style={{ borderLeft: "1px solid black" }}>
            <div>
              <Form
                className="client-form"
                onFinish={onFinish}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                style={{
                  maxWidth: 800,
                }}
              >
                <div>
                  <Form.Item name="fullname" label="Full Name">
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="brandname" label="Brand Name">
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="location" label="Location">
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="email" label="Email">
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="phonenumber" label="Phone Number">
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                </div>
                <div></div>
                <div className="bnt_button">
                  <FormItem>
                    <Button className="btn_update" htmlType="update">
                      Update
                    </Button>
                  </FormItem>
                </div>
              </Form>
            </div>
            <Collapse
              className="collapse_advanced"
              ghost
              expandIcon={({ isActive }) => {
                return (
                  <DownCircleOutlined
                    style={{ fontSize: "20px" }}
                    rotate={isActive ? 180 : 0}
                  />
                );
              }}
              expandIconPosition="right"
              style={{ width: "10%" }}
              items={items}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ClientProfilePage;
