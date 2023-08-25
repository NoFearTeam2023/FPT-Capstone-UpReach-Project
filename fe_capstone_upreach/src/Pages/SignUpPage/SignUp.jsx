import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { ReactComponent as IconGoogle } from "../../../src/Assets/Icon/google-icon.svg";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import AuthBackground from "../../Components/Layouts/AuthBackground/AuthBackground";
import ApiUser from "../../Api/ApiUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../../Stores/user";

const SignUp = () => {
  const [user] = useUserStore((state) => [state.user]);

  const navigate = useNavigate();
  const ROLE_CLIENT = "2";
  const ROLE_INFLUENCER = "3";
  const [message, setMessage] = useState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const FetchRegisterUser = async (data) => {
    try {
      const response = await ApiUser.registerUser(data);
      if (response.status === "False") {
        toast.error(response.message, toastOptions);
        return;
      }
      localStorage.setItem("formData", JSON.stringify(form));
      navigate("/verify-register");
      return response;
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  };

  const onChangeInput = (value) => {
    setForm({ ...form, [value.target.name]: value.target.value });
  };
  const validateEmail = (emailFromInput) => {
    const emailPattern =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.(-?[a-zA-Z0-9])+$/;

    if (emailFromInput === "") {
      return false;
    } else if (!emailPattern.test(emailFromInput)) {
      return false;
    } else {
      return true;
    }
  };
  const handleClickSignUpClient = () => {
    form.role = ROLE_CLIENT;
    if (validateEmail(form.email)) {
      const result = FetchRegisterUser(form);
    }
  };
  const handleClickSignUpInfluencer = () => {
    form.role = ROLE_INFLUENCER;
    if (validateEmail(form.email)) {
      const result = FetchRegisterUser(form);
    }
  };

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/dashboard");
    } else if (user.roleId == 2) {
      navigate("/homepage");
    } else if (user.roleId == 3) {
      navigate("/influencer/my-report");
    } else {
      navigate("/sign-up");
    }
  }, []);

  return (
    <>
      {user?.roleId ? (
        ""
      ) : (
        <>
          <AuthBackground>
            <div className="signUpLayout">
              <Form
                name="signUp"
                className="signUpForm"
                initialValues={{ remember: true }}
                // onFinish={handleSubmit}
              >
                <p className="signUpTitle">Create your account</p>
                {/* <Button type="primary" htmlType="submit" className="signUpGoogle">
            <div className="GoogleIcon">{<IconGoogle />}</div>
            <p style={{ fontWeight: "600" }}>Sign up with Google</p>
          </Button> */}
                <div className="signUpBorders">
                  {/* <div className="signUpBorder"></div>
            <p style={{ padding: "0 15px" }}>or</p>
            <div className="signUpBorder"></div> */}
                </div>
                <div className="signUpSubTitle">
                  <p className="signUpSubTitleContent">Full Name </p>
                  <p className="signUpSubChar">*</p>
                </div>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Full Name!" },
                  ]}
                >
                  <Input
                    className="signUpTypeBtn heightSignUpBtn"
                    placeholder="Enter full name"
                    name="name"
                    onChange={onChangeInput}
                  />
                </Form.Item>

                <div className="signUpSubTitle">
                  <p className="signUpSubTitleContent">Email address </p>
                  <p className="signUpSubChar">*</p>
                </div>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    className="signUpTypeBtn heightSignUpBtn"
                    placeholder="Youremail@example.com"
                    name="email"
                    onChange={onChangeInput}
                  />
                </Form.Item>
                <div className="signUpSubTitle">
                  <p className="signUpSubTitleContent">Password</p>
                  <p className="signUpSubChar">*</p>
                </div>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    { min: 8, message: "Enter as least 8 characters" },
                  ]}
                >
                  <Input.Password
                    type="password"
                    className="signUpTypeBtn heightSignUpBtn"
                    placeholder="Enter your password at least 8 characters"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    name="password"
                    onChange={onChangeInput}
                  />
                </Form.Item>
                <div className="signUpSubTitle">
                  <p className="signUpSubTitleContent">Confirm password </p>
                  <p className="signUpSubChar">*</p>
                </div>
                <Form.Item
                  name="confirmPassword"
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
                  <Input
                    type="password"
                    name="confirmPass"
                    onChange={onChangeInput}
                    className="signUpTypeBtn heightSignUpBtn"
                    placeholder="Enter confirm password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <div className="row">
                  <div className="col-6 p-0">
                    <Button
                      style={{
                        width: "98%",
                        height: "50px",
                      }}
                      type="primary"
                      htmlType="submit"
                      className="signUpBtn"
                      onClick={handleClickSignUpClient}
                    >
                      Join as Brand
                    </Button>
                  </div>
                  <div className="col-6 p-0">
                    <Button
                      style={{
                        width: "98%",
                        height: "50px",
                      }}
                      type="primary"
                      htmlType="submit"
                      className="signUpBtn"
                      onClick={handleClickSignUpInfluencer}
                    >
                      Join as Influencer
                    </Button>
                  </div>
                </div>
                <div className="signUpToLogin">
                  <p>Already have an account? </p>
                  <div className="loginLink">
                    <Link to="/login">Login</Link>
                  </div>
                </div>
              </Form>
            </div>
            <ToastContainer />
          </AuthBackground>
        </>
      )}
    </>
  );
};
export default SignUp;
