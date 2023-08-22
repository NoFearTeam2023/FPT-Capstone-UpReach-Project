import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import "./VerifyRegisterPage.css";
import ApiUser from "../../Api/ApiUser"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VerifyRegisterPage = () => {

  const navigate = useNavigate();
  const [message, setMessage] = useState()
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const inputRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: ''
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    const data = localStorage.getItem('formData');
    if (!data) {
      navigate("/sign-up")
    }
    const formDataJson = JSON.parse(data);
    setFormData(formDataJson)

  }, [navigate]);

  const confirmUser = async (data) => {
    try {
      const response = await ApiUser.conFirmUser(data);
      console.log(response)

      if (response.status === "False") {
        toast.error(response.message, toastOptions)
        return false;
      }
      toast.success(response.message, toastOptions)
      return response
    } catch (error) {
      setMessage(error)
      throw error;
    }
  }

  const handleInputChange = (element, index) => {
    console.log(element)
    if (isNaN(element)) {
      return false;
    };

    setOtp([...otp.map((d, idx) => (idx === index) ? element : d)])

    if (element === null && index > 0) {
      inputRefs.current[index - 1].focus(); // Move focus to the previous input
    } else if (element !== null && element.toString().length === 1 && index < otp.length - 1) {
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
    formData.otp = '' + dataOtp
    const result = await confirmUser(formData)
    if (result) {
      if (message) {
        navigate('/verify-register')
      }
      if (formData.role === '2') {
        navigate('/client-profile')
      }
      else if (formData.role === '3') {
        navigate('/create-influencer-page')
      }
    }

  }

  return (
    <>
      <div className="verify-background">
        <div className="verify-custom-bg">
          <div className="form-holder reset-form" style={{ display: "block" }}>
            <h2 className="form-title">Verify your email </h2>
            <div className="sub-title">
              <p>
                We sent an email to {formData.email} Check your inbox and
                enter the 6-digit code to verify your email.
              </p>
            </div>
            <Form className="form" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                className="form-otp"
              >

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
                  )
                })}
              </Form.Item>
              <Button
                style={{
                  width: "500px",
                  height: "50px",
                }}
                className="submit btn"
                htmlType="submit"
              >
                Continue
              </Button>

              <div className="login-forgot">I didn't receive an email</div>
              <ToastContainer />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyRegisterPage;
