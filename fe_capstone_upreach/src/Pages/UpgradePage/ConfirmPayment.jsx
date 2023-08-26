import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiListClient from "../../Api/ApiListClient";
import { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
const ConfirmPayment = () => {
  const location = useLocation();
  const queryParams = Object.fromEntries(new URLSearchParams(location.search));
  const navigate = useNavigate();
  const [isData, setIsData] = useState();
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const onClickHomePage = () => {
    console.log(isData);
    FetchDataPayment(isData);
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  };

  const FetchDataPayment = async (data) => {
    try {
      const response = await ApiListClient.updateAfterScanQR(data);
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

  useEffect(() => {
    const data = localStorage.getItem("Plan-Package");
    const dataPlanPackage = JSON.parse(data);
    setIsData(dataPlanPackage);
    if (status === "True") {
      navigate("/homepage");
    }
  }, [status]);

  useEffect(() => {});

  return (
    <div>
      <div>
        <div className="auth-background">
          <div className="verify-background d-block">
            <div className="verify-custom-bg d-block p-5">
              <div className="w-100 text-center">
                <div className="text-center d-inline messSuccess">
                  <CheckCircleTwoTone
                    style={{
                      fontSize: "32px",
                    }}
                    twoToneColor="#52c41a"
                  />
                  Your Profile Update Success
                </div>
              </div>
              <div className="m-auto margin-top-300">
                <div className="mt-5 w-25 m-auto">
                  <Button
                    className="upgrade-card-btn mt-5 m-auto"
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={onClickHomePage}
                  >
                    Home Page
                  </Button>
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
