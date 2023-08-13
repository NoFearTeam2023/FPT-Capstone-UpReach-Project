import React from "react";
import { Button, Form, Input } from "antd";
import "./ForgotPasswordPage.css";
import FormItem from "antd/es/form/FormItem";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <>
      <div className="pwd-background">
        <div className="form-custom-bg">
          <div className="form-holder reset-form" style={{ display: "block" }}>
            <h2 className="form-title">Reset Password </h2>
            <Form className="form">
              <FormItem
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Enter as least 8 characters" },
                ]}
                name="new-pwd"
              >
                <Input.Password
                  style={{
                    width: "500px",
                    height: "50px",
                  }}
                  name="new-pwd"
                  className="input"
                  type="password"
                  placeholder=" Enter New Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                ></Input.Password>
              </FormItem>
              <FormItem
                name="confirm-new-pwd"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                  { min: 8, message: "Enter as least 8 characters" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new-pwd") === value) {
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
                  style={{
                    width: "500px",
                    height: "50px",
                  }}
                  name="confirm-new-pwd"
                  className="input"
                  type="password"
                  placeholder="Confirm New Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                ></Input.Password>
              </FormItem>
              <Link to="/login">
                <Button
                  style={{
                    width: "500px",
                    height: "50px",
                  }}
                  className="submit btn"
                >
                  Reset Password
                </Button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
