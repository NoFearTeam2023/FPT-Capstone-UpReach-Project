import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiListClient from '../../Api/ApiListClient';
import { useState } from 'react';

const ConfirmPayment =() => {
    const location = useLocation();
    const queryParams = Object.fromEntries(new URLSearchParams(location.search));
    const navigate = useNavigate();
    const [isData,setIsData] = useState()
    const [status,setStatus] = useState(false)
    const onClickHomePage = () =>{
      console.log(isData)
      FetchDataPayment(isData)
      setStatus(true)
    }

    

    const FetchDataPayment = async (data) =>{
      try {
          const respone = await ApiListClient.updateAfterScanQR(data)
          console.log(respone)
          return respone
      } catch (error) {
          console.log(error);
      }
    }

    useEffect(()=>{
      const data = localStorage.getItem("Plan-Package");
      const dataPlanPackage = JSON.parse(data);
      setIsData(dataPlanPackage)
      if(status){
        navigate('/homepage')
      }
    },[status])

    useEffect(() =>{

    })
    
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
