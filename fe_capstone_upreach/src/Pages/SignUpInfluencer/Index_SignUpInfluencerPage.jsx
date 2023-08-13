import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./SignUpInfluencerPage.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Index_SignUpInfluencerPage = () => {
  const [validateInput, setValidateInput] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit() {
    setValidateInput(true);
    if (user.fullName === "" || user.fullName === undefined) {
      setValidateInput(false);
      return;
    }
    if (user.mail === "" || user.mail === undefined) {
      setValidateInput(false);
      return;
    }
    if (user.password === "" || user.password === undefined) {
      setValidateInput(false);
      return;
    }
    if (user.confirmPassword === "" || user.confirmPassword === undefined) {
      setValidateInput(false);
      return;
    }
    console.log(validateInput);
  }

  function OnChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    setValidateInput(true);
    if (user.fullName === "" || user.fullName === undefined) {
      setValidateInput(false);
      return;
    }
    if (user.mail === "" || user.mail === undefined) {
      setValidateInput(false);
      return;
    }
    if (user.password === "" || user.password === undefined) {
      setValidateInput(false);
      return;
    }
    if (user.confirmPassword === "" || user.confirmPassword === undefined) {
      setValidateInput(false);
      return;
    }
    console.log(user);
  }
  return (
    <>
      <div id="content">
        <div className="form-content">
          <h1 className="title-signup">Create Your Page</h1>
          <Form className="form-signup" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              type="text"
              rules={[
                { required: true, message: "Please input your Full Name!" },
              ]}
            >
              <Input
                className="signUp-btn"
                placeholder="Full Name"
                onChange={OnChangeInput}
                name="fullName"
              ></Input>
            </Form.Item>
            <Form.Item
              name="mail"
              type="mail"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input
                className="signUp-btn"
                placeholder="Email"
                onChange={OnChangeInput}
                name="mail"
              ></Input>
            </Form.Item>

            <Form.Item
              name="password"
              type="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Enter as least 8 characters" },
              ]}
            >
              <Input.Password
                onChange={OnChangeInput}
                name="password"
                className="signUp-btn"
                placeholder="Enter your Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              onChange={OnChangeInput}
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
                { min: 8, message: "Enter as least 8 characters" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The re-password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                onChange={OnChangeInput}
                name="confirmPassword"
                type="password"
                className="signUp-btn"
                placeholder="Enter confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              {validateInput ? (
                <Link to="/verify-influencer-register">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="signUp-submit"
                  >
                    Sign Up
                  </Button>
                </Link>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signUp-submit"
                >
                  Sign Up
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Index_SignUpInfluencerPage;
