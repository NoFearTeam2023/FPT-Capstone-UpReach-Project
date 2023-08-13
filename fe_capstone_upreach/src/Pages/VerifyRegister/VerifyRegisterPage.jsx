import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { Link } from "react-router-dom";
import "./VerifyRegisterPage.css";

const VerifyRegisterPage = () => {
  return (
    <>
      <div className="verify-background">
        <div className="verify-custom-bg">
          <div className="form-holder reset-form" style={{ display: "block" }}>
            <h2 className="form-title">Verify your email </h2>
            <div className="sub-title">
              <p>
                We sent an email to immthien407@gmail.com. Check your inbox and
                enter the 6-digit code to verify your email.
              </p>
            </div>
            <Form className="form">
              <InputNumber
                style={{
                  width: "500px",
                  height: "50px",
                }}
                name="Verify-email"
                className="input"
                type="Verify"
                placeholder="Enter 6-Digit Code"
              ></InputNumber>
              <Link to="/client-profile">
                <Button
                  style={{
                    width: "500px",
                    height: "50px",
                  }}
                  className="submit btn"
                >
                  Continue
                </Button>
              </Link>
              <div className="login-forgot">I didn't receive an email</div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyRegisterPage;
