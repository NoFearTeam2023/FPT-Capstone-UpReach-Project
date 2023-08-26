import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import "./ForgotPasswordPage.css";
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import ApiUser from "../../Api/ApiUser";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "True") {
      navigate("/verify-forgot-password");
    }
  }, [status]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  };

  const FetchDataForUsers = async (data) => {
    try {
      const response = await ApiUser.forgotPassword(data);

      if (response.status === "False") {
        toast.error(response.message, toastOptions);
        setStatus(response.status);
        return;
      }
      toast.success(response.message, toastOptions);
      setStatus(response.status);
      console.log(response);
      return response;
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };

  const onFinishCheckData = () => {
    FetchDataForUsers(formValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <div className="auth-background">
        <div className="pwd-background">
          <div className="form-custom-bg">
            <div className="auth-custom-line1 index-100"></div>
            <div className="auth-custom-line2 index-100"></div>
            <div className="auth-custom-line3 index-100"></div>
            <div className="auth-custom-line5 index-100">
              <div className="auth-custom-line4 index-100"></div>
            </div>
            <div
              className="form-holder reset-form index-1000"
              style={{ display: "block" }}
            >
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
                    name="email"
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  ></Input>
                </FormItem>
                <Link>
                  <Button
                    style={{
                      width: "500px",
                      height: "50px",
                    }}
                    className="submit btn"
                    onClick={onFinishCheckData}
                  >
                    Send Reset Email
                  </Button>
                </Link>
                <div className="login-forgot">
                  Want to try again? <Link to="/login">Login.</Link>
                </div>
                <ToastContainer />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
