import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useNavigate } from "react-router-dom";



const FailForm = () => {
    const navigate = useNavigate(); 

    const handlClick = () =>{
        navigate("/create-influencer-page")
    }
    
    return (
        <>
            <div id="content">
                <div className="form-information">
                <div className="title-finish-information">
                    <h3>Update Profile Influencer Fail !!! </h3>
                </div>
                <div className="form-information-form">
                    <h5>Sorry </h5>
                    <h5>We have trouble with the server </h5>
                    <h5>Please F5 To Add your information again</h5>
                </div>
                </div>
            </div>
        </>
    );
};

export default FailForm;
