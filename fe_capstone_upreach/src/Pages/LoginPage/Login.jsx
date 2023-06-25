import { Button, Form, Input } from "antd";
import React from "react";
import "./Login.css";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import { ReactComponent as IconGoogle } from "../../../src/Assets/Icon/google-icon.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <HeaderHomepage />

      <div className="logInLayout">
        <p className="logInTitle">UpReach</p>
        <Form
          name="login"
          className="logInForm"
          initialValues={{ remember: true }}
        >
          <div className="logInSubTitle">
            <p className="logInSubTitleContent">Email address </p>
            <p className="logInSubChar">*</p>
          </div>
          <Form.Item
            name="enterEmail"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="logInTypeBtn heightLogInBtn"
              placeholder="Youremail@example.com"
            />
          </Form.Item>
          <div className="logInSubTitle">
            <p className="logInSubTitleContent">Password</p>
            <p className="logInSubChar">*</p>
          </div>
          <Form.Item
            name="enterPassword"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              className="logInTypeBtn heightLogInBtn"
              placeholder="Enter your password at least 8 characters"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="logInBtn">
            <span className="logInBtnText">Login</span>
          </Button>
          <div className="logInWithGoogle">
            <div className="GoogleIcon">{<IconGoogle />}</div>
            <p style={{ fontWeight: "600" }}>Login with Google</p>
            {/* <Link to="/forgot-password">
              <Button className="logInToForgotPasswordLink" type="link">
                <p>Forgot password?</p>
              </Button>
            </Link> */}
          </div>
          <div className="logInToSignUp">
            <p>New to UpReach?</p>
            <Link to="/sign-up">
              <Button className="logInToSignUpLink" type="link">
                <p>Create an account</p>
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
