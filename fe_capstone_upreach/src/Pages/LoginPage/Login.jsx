import { Button, Form, Input, Spin, message } from "antd";
import React from "react";
import "./Login.css";
import { ReactComponent as IconGoogle } from "../../../src/Assets/Icon/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import AuthBackground from "../../Components/Layouts/AuthBackground/AuthBackground";
import { UPREACH } from "../../Components/Constant/Const";
import axiosClient from "../../Api/AxiosClient";
import { useUserStore } from "../../Stores/user";
import { useCookies } from "react-cookie";
import ApiUser from "../../Api/ApiUser";

const Login = () => {
  const [user, setUserInfo] = useUserStore((state) => [
    state.user,
    state.setUserInfo,
  ]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [validateMess, setValidateMess] = React.useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [cookies, setCookie] = useCookies();
  let navigate = useNavigate();

  const sendError = () => {
    messageApi.open({
      type: "error",
      content: "Login Error",
      duration: 100,
    });
  };

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      const responeLogin = await ApiUser.login(data);
      const idRole = responeLogin.data.User.roleId;
      const dataUser = responeLogin.data.User;
      const _idMonogDb = responeLogin.idInMogodb;
      const emailUser = responeLogin.data.User.email;

      checkRole(idRole, dataUser, _idMonogDb);

      setCookie("token", emailUser, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    } catch (error) {
      setIsLoading(false);
      sendError();
      console.log(error);
    }
  };
  // Kiểm tra role đẻ lưu ở localstorage và điều hướng
  function checkRole(idRole, dataUser, _idMonogDb) {
    if (idRole == 1) {
      setUserInfo(dataUser, _idMonogDb);
      navigate("/admin/dashboard");
    }
    if (idRole == 2) {
      setUserInfo(dataUser, _idMonogDb);
      navigate("/homepage");
    }
    if (idRole == 3) {
      setUserInfo(dataUser, _idMonogDb);
      navigate("/influencer/my-report");
    }
  }

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/dashboard");
    } else if (user.roleId == 2) {
      navigate("/homepage");
    } else if (user.roleId == 3) {
      navigate("/influencer/my-report");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {user?.roleId ? (
        ""
      ) : (
        <>
          {contextHolder}
          <AuthBackground>
            <div className="logInLayout">
              <Link to="/">
                <p className="logInTitle">{UPREACH}</p>
              </Link>
              <Form
                name="login"
                className="logInForm"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
              >
                <Spin tip="Loading" size="large" spinning={isLoading}>
                  <Button type="primary" className="login-google">
                    <div className="GoogleIcon">{<IconGoogle />}</div>
                    <p style={{ fontWeight: "600" }}>Login with Google</p>
                  </Button>
                  <div className="logInSubTitle">
                    <p className="logInSubTitleContent">Email address </p>
                    <p className="logInSubChar">*</p>
                  </div>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        validateMess: "Please input your email!",
                      },
                      { type: "email", validateMess: "Invalid email" },
                    ]}
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
                    name="password"
                    rules={[
                      {
                        required: true,
                        validateMess: "Please input your password!",
                      },
                      { min: 5, validateMess: "Enter as least 8 characters" },
                    ]}
                  >
                    <Input.Password
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      type="password"
                      className="logInTypeBtn heightLogInBtn"
                      placeholder="Enter your password at least 8 characters"
                    />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className="logInBtn">
                    <span className="logInBtnText">Login</span>
                  </Button>
                  <div className="feature-block">
                    <Button className="logInToForgotPasswordLink" type="link">
                      <p>Forgot password?</p>
                    </Button>
                  </div>
                  <div className="logInToSignUp">
                    <p>New to UpReach?</p>
                    <Link to="/sign-up">
                      <Button className="logInToSignUpLink" type="link">
                        <p>Create an account</p>
                      </Button>
                    </Link>
                  </div>
                </Spin>
              </Form>
              {/* <img className="loginImage" src={loginImg} alt="" /> */}
            </div>
          </AuthBackground>
        </>
      )}
    </>
  );
};

export default Login;
