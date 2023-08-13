import React from "react";
import "./SignUpInfluencerPage.css";
import { Button, Form, Input, InputNumber } from "antd";
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";

const VerifyInfluencerRegister = () => {
  return (
    <>
      <div className="verify-influencer-background">
        <div className="verify-influencer-bg">
          <div className="form-holder reset-form" style={{ display: "block" }}>
            <h2 className="form-title">Verify your email </h2>
            <div className="sub-title">
              <p>
                We sent an email to immthien407@gmail.com. Check your inbox and
                enter the 6-digit code to verify your email.
              </p>
            </div>
            <Form className="form">
              <FormItem
                name="verify"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number",
                  },
                ]}
              >
                <InputNumber
                  className="verify-otp-input"
                  style={{
                    width: "500px",
                    height: "50px",
                  }}
                  name="Verify-email"
                  placeholder="Enter 6-Digit Code"
                ></InputNumber>
              </FormItem>
              <Link to="/create-influencer-page">
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

              {/* <Button className="submit btn">Continue</Button> */}

              <div className="login-forgot">I didn't receive an email</div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyInfluencerRegister;
