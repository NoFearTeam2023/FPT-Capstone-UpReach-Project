import { Avatar, Button, Col, Collapse, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useRef, useState } from "react";
import "./ClientProfilePage.css";
import {
  DownCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UpdateEmail from "./UpdateEmail";
import ChangePassword from "./ChangePassword";

const Index_ClientProfile = () => {
  const [isModalOpenUpdateEmail, setIsModalOpenUpdateEmail] = useState(false);
  const [isSubModel, setSubModel] = useState(false);
  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =
    useState(false);
  const [data, setData] = useState();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

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
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  };

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

  const uploadButton = (
    <div>
      <PlusOutlined size={10} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Row style={{ marginTop: "4%" }}>
      <Col span={6}>
        <div className="basicInformation" col>
          <p>Basic infomation</p>
        </div>
      </Col>
      <Col span={18}>
        <Row>
          <Col span={16} style={{ borderLeft: "1px solid black" }}>
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
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your Full Name!",
                      },
                    ]}
                    name="fullname"
                    label="Full Name"
                  >
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your Brand Name!",
                      },
                    ]}
                    name="brandname"
                    label="Brand Name"
                  >
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="location" label="Location">
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="email" label="Email">
                    <Input style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        min: 10,
                        max: 10,
                        required: true,
                        message: "Please input your phone number",
                      },
                    ]}
                    name="phonenumber"
                    label="Phone Number"
                  >
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
          <Col span={8}>
            <div onClick={handleImageClick}>
              {image ? (
                <Avatar
                  shape="square"
                  src={URL.createObjectURL(image)}
                  size={400}
                />
              ) : (
                <Avatar shape="square" icon={uploadButton} size={400} />
              )}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index_ClientProfile;
