import { Button, Checkbox, Form, Input } from "antd";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import { ReactComponent as IconGoogle } from "../../../src/Assets/Icon/google-icon.svg";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SingUp = ({ navigateHome }) => {
  return (
    <div>
      <HeaderHomepage handleClickHomePage={navigateHome} />
      <div className="signUpLayout">
        <p className="signUpTitle">Create your account</p>
        <Form
          name="signUp"
          className="signUpForm"
          initialValues={{ remember: true }}
        >
          <Button type="primary" htmlType="submit" className="signUpGoogle">
            <div className="GoogleIcon">{<IconGoogle />}</div>
            <p style={{ fontWeight: "600" }}>Sign up with Google</p>
          </Button>
          <div className="signUpBorders">
            <div className="signUpBorder"></div>
            <p style={{ padding: "0 15px" }}>or</p>
            <div className="signUpBorder"></div>
          </div>
          <div className="signUpSubTitle">
            <p className="signUpSubTitleContent">Full Name </p>
            <p className="signUpSubChar">*</p>
          </div>
          <Form.Item
            name="enterName"
            rules={[
              { required: true, message: "Please input your Full Name!" },
            ]}
          >
            <Input
              className="signUpTypeBtn heightSignUpBtn"
              placeholder="Enter full name"
            />
          </Form.Item>
          <div className="signUpSubTitle">
            <p className="signUpSubTitleContent">Email address </p>
            <p className="signUpSubChar">*</p>
          </div>
          <Form.Item
            name="enterEmail"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="signUpTypeBtn heightSignUpBtn"
              placeholder="Youremail@example.com"
            />
          </Form.Item>
          <div className="signUpSubTitle">
            <p className="signUpSubTitleContent">Password</p>
            <p className="signUpSubChar">*</p>
          </div>
          <Form.Item
            name="enterPassword"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              className="signUpTypeBtn heightSignUpBtn"
              placeholder="Enter your password at least 8 characters"
            />
          </Form.Item>
          <div className="signUpSubTitle">
            <p className="signUpSubTitleContent">Confirm password </p>
            <p className="signUpSubChar">*</p>
          </div>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input confirm Password!" },
            ]}
          >
            <Input
              type="password"
              className="signUpTypeBtn heightSignUpBtn"
              placeholder="Enter confirm password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="signUpBtn">
            <span className="signUpBtnText">Sign Up</span>
          </Button>
          <div className="signUpToLogin">
            <p>Already have an account?</p>
            <Link to="/login">
              <Button className="signUpToLoginLink" type="link">
                <p style={{ margin: "-1px 0 0 -10px", color: "#000" }}>Login</p>
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default SingUp;
