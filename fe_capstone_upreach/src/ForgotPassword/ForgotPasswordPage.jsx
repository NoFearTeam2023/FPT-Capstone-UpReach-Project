import { Button, Form, Input } from "antd";
import React from "react";
import "./ForgotPasswordPage.css";
import("https://fonts.googleapis.com/css2?family=Volkhov&display=swap");

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="pwd-background">
        <div className="form-custom-bg">
          <div className="form-holder reset-form" style={{ display: "block" }}>
            <h2 className="form-title">Forgot Password </h2>
            <Form className="form">
              <Input
                name="forgot-pwd"
                className="input"
                type="email"
                placeholder="Enter your email"
              ></Input>
              <Button className="submit btn">Send Reset Email</Button>
              <div className="login-forgot">Want to try again? Login.</div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
