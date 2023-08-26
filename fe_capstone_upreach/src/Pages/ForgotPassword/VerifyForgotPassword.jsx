import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
// import "./VerifyRegisterPage.css";
import "../VerifyRegister/VerifyRegisterPage.css";
import ApiUser from "../../Api/ApiUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const VerifyForgotPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [status, setStatus] = useState();
  const [formForgotPass, setFormForgotPass] = useState({});

  useEffect(() => {
    if (status === "True") {
      navigate("/reset-password");
    }
  }, [status]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  };

  const confirmUserForgotPass = async (data) => {
    try {
      const response = await ApiUser.confirmForgotPassword(data);
      console.log(response);
      if (response.status === "False") {
        toast.error(response.message, toastOptions);
        setStatus(response.status);
        return false;
      }
      toast.success(response.message, toastOptions);
      setStatus(response.status);
      return response;
    } catch (error) {
      setMessage(error);
      throw error;
    }
  };

  const handleInputChange = (element, index) => {
    console.log(element);
    if (isNaN(element)) {
      return false;
    }

    setOtp([...otp.map((d, idx) => (idx === index ? element : d))]);

    if (element === null && index > 0) {
      inputRefs.current[index - 1].focus(); // Move focus to the previous input
    } else if (
      element !== null &&
      element.toString().length === 1 &&
      index < otp.length - 1
    ) {
      inputRefs.current[index + 1].focus(); // Move focus to the next input
    }
  };

  const handleInputFocus = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].select();
    }
  };

  const handleSubmit = async () => {
    const dataOtp = otp.join("");
    formForgotPass.otp = "" + dataOtp;
    confirmUserForgotPass(formForgotPass);
  };

  return (
    <>
      <div className="auth-background">
        <div className="verify-background">
          <div className="verify-custom-bg">
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
              <h2 className="form-title">Verify your email </h2>
              <div className="sub-title">
                <p>
                  We sent an email to your email, Please check your inbox and
                  enter the 6-digit code to verify your email.
                </p>
              </div>
              <Form className="form" onFinish={handleSubmit}>
                <Form.Item name="name" className="form-otp">
                  {otp.map((data, index) => {
                    return (
                      <InputNumber
                        className="otp-filed"
                        maxLength={1}
                        min={0}
                        key={index}
                        defaultValue={null}
                        value={data}
                        onChange={(e) => handleInputChange(e, index)}
                        onFocus={() => handleInputFocus(index)}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                      />
                    );
                  })}
                </Form.Item>
                <Button
                  style={{
                    width: "500px",
                    height: "50px",
                    margin: "0 auto",
                    backgroundColor: "#000",
                    color: "white",
                  }}
                  className="submit btn"
                  htmlType="submit"
                >
                  Continue
                </Button>

                {/* <div className="login-forgot">I didn't receive an email</div> */}
                <ToastContainer />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyForgotPassword;
