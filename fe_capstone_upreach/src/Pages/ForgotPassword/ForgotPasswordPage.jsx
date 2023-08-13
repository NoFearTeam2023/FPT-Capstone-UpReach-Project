import React from "react";
import { Button, Form, Input } from "antd";
import "./ForgotPasswordPage.css";
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="pwd-background">
        <div className="form-custom-bg">
          <div className="form-holder reset-form" style={{ display: "block" }}>
            <h2 className="form-title">Forgot Password </h2>
            <Form className="form">
              <FormItem
                name="verify"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "500px",
                    height: "50px",
                  }}
                  name="forgot-pwd"
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                ></Input>
              </FormItem>
              <Link to="/reset-password">
                <Button
                  style={{
                    width: "500px",
                    height: "50px",
                  }}
                  className="submit btn"
                >
                  Send Reset Email
                </Button>
              </Link>
              <div className="login-forgot">
                Want to try again? <Link to="/login">Login.</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
