import {
  CheckCircleOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Steps } from "antd";
import React, { useState, useEffect } from "react";
import InformationForm from "./InformationForm";
import "./CreateInfluencerPage.css";
import OverviewForm from "./OverviewForm";
import ContentForm from "./ContentForm";
import SocialForm from "./SocialForm";
import FinishForm from "./FinishForm";
import ApiUser from "../../Api/ApiUser";
import ApiListInfluecer from "../../Api/ApiListInfluecer";
import FailForm from "./FailForm";
import ApiInfluencer from "../../Api/ApiInfluencer";

const CreatInfluencerProfilePage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [informationDetails, setInformationDetails] = useState(null);
  const [overviewDetails, setOverviewDetails] = useState(null);
  const [contentDetails, setContentFormDetails] = useState([null]);
  const [checkDataAddSuccess, setCheckDataAddSuccess] = useState(false);

  const [allDetails, setAllDetails] = useState({
    informationDetails: null,
    overviewDetails: null,
    contentDetails: null,
    influencerDetail: null,
  });

  const onFinishInformationForm = (values) => {
    console.log("Information Form");
    console.log(values);
    // setInformationDetails(values);
    setAllDetails((prevDetails) => ({
      ...prevDetails,
      informationDetails: values,
    }));
    setCurrent(1);
  };

  const onFinishOverviewForm = (values) => {
    console.log("Overview Form");
    // setOverviewDetails(values); // vẫn chưa lưu value OverviewDetails
    setAllDetails((prevDetails) => ({
      ...prevDetails,
      overviewDetails: values,
    }));
    setCurrent(2);
  };

  const onFinishContentForm = (values) => {
    console.log("Content Form");
    console.log(contentDetails) 
    setAllDetails((prevDetails) => ({
      ...prevDetails,
      contentDetails: contentDetails,
    }));
    setCurrent(3); // khi bấm continue chuyển qua tab 3
  };

  const areAllStepsCompleted = () => {
    return (
      allDetails.informationDetails !== null &&
      allDetails.overviewDetails !== null &&
      allDetails.contentDetails !== null 
    );
  };

  const handleFinishAllForms = async () => {
    try {
      if (areAllStepsCompleted()) {
        const result = await ApiInfluencer.addNewInfluencer(allDetails);
        console.log(allDetails);
        console.log(result);
        if (result) {
          setCheckDataAddSuccess(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("formData");
    const formDataJson = JSON.parse(data);
    setAllDetails((prevDetails) => ({
      ...prevDetails,
      influencerDetail: formDataJson,
    }));

    if (current === 3) {
      handleFinishAllForms();
    }
  }, [current]);

  const forms = [
    <InformationForm
      onFinish={onFinishInformationForm}
      initialValues={informationDetails}
    />,
    <OverviewForm
      onFinish={onFinishOverviewForm}
      initialValues={overviewDetails}
    />,
    <ContentForm
      onFinish={onFinishContentForm}
      setContentFormDetails={setContentFormDetails}
      contentDetails={contentDetails}
    />,
    <>{checkDataAddSuccess ? <FinishForm /> : <FailForm />}</>,
  ];
  const isStepDisabled = (stepNumber) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return informationDetails === null;
    }
    if (stepNumber === 2) {
      return informationDetails === null || overviewDetails === null;
    }
    if (stepNumber === 3) {
      return (
        informationDetails === null ||
        overviewDetails === null ||
        contentDetails === null
      );
    }
  };

  return (
    <>
      <div className="create-page">
        <div className="step-create-page">
          <Steps onChange={setCurrent} current={current}>
            <Steps.Step
              disabled={isStepDisabled(0)}
              title="Information"
              icon={<UserOutlined />}
            />
            <Steps.Step
              disabled={isStepDisabled(1)}
              title="Overview"
              icon={<InfoCircleOutlined />}
            />
            <Steps.Step
              disabled={isStepDisabled(2)}
              title="Content Topic"
              icon={<TagOutlined />}
            />
            <Steps.Step
              disabled={isStepDisabled(4)}
              title="Finish"
              icon={<CheckCircleOutlined />}
            />
          </Steps>

          {forms[current]}
        </div>
      </div>
    </>
  );
};

export default CreatInfluencerProfilePage;
