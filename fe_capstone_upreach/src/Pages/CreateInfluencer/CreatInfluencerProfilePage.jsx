import {
  CheckCircleOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Steps, Upload } from "antd";
import React, { useState, useEffect } from "react";
import InformationForm from "./InformationForm";
import "./CreateInfluencerPage.css";
import OverviewForm from "./OverviewForm";
import ContentForm from "./ContentForm";
import FinishForm from "./FinishForm";
import ApiUser from "../../Api/ApiUser";
import ApiListInfluecer from "../../Api/ApiListInfluecer";
import FailForm from "./FailForm";
import ApiInfluencer from "../../Api/ApiInfluencer";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../Stores/user";
const CreatInfluencerProfilePage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [informationDetails, setInformationDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [overviewDetails, setOverviewDetails] = useState(null);
  const [contentDetails, setContentFormDetails] = useState([null]);
  const [checkDataAddSuccess, setCheckDataAddSuccess] = useState(false);
  const navigate = useNavigate();
  const [allDetails, setAllDetails] = useState({
    informationDetails: null,
    overviewDetails: null,
    image: null,
    contentDetails: null,
    influencerDetail: null,
  });

  const [user, setUserInfo] = useUserStore((state) => [
    state.user,
    state.setUserInfo,
  ]);

  const onFinishInformationForm = (values) => {
    // console.log("Information Form");
    // console.log(values);
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

  const onFinishUploadImage = (values) => {
    console.log("Image");
    // setOverviewDetails(values); // vẫn chưa lưu value OverviewDetails
    setAllDetails((prevDetails) => ({
      ...prevDetails,
      image: image,
    }));
    setCurrent(3);
  };

  const onFinishContentForm = (values) => {
    console.log("Content Form");
    console.log(contentDetails);
    setAllDetails((prevDetails) => ({
      ...prevDetails,
      contentDetails: contentDetails,
    }));
    setCurrent(4); // khi bấm continue chuyển qua tab 3
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
        if (result.status === "True") {
          setCheckDataAddSuccess(true);
          setUserInfo(result.data, result._idMongodb);
          navigate("/influencer/my-report");
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
    console.log(allDetails);
    if (current === 4) {
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
    <UploadImage
      onFinish={onFinishUploadImage}
      initialValues={image}
      setImage={setImage}
    />,
    <ContentForm
      onFinish={onFinishContentForm}
      setContentFormDetails={setContentFormDetails}
      contentDetails={contentDetails}
    />,
    // <>{checkDataAddSuccess ? <FinishForm /> : <FailForm />}</>,
    <FinishForm />,
  ];
  const isStepDisabled = (stepNumber) => {
    if (stepNumber === 0) {
      return informationDetails === null;
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
              title="Avatar"
              icon={<CheckCircleOutlined />}
            />
            <Steps.Step
              disabled={isStepDisabled(3)}
              title="Content Topic"
              icon={<TagOutlined />}
            />
            <Steps.Step
              disabled={isStepDisabled(3)}
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
