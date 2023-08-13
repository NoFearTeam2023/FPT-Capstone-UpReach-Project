import {
  CheckCircleOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Steps } from "antd";
import React, { useState } from "react";
import InformationForm from "./InformationForm";
import "./CreateInfluencerPage.css";
import OverviewForm from "./OverviewForm";
import ContentForm from "./ContentForm";
import SocialForm from "./SocialForm";
import FinishForm from "./FinishForm";

const CreatInfluencerProfilePage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [informationDetails, setInformationDetails] = useState(null);
  const [overviewDetails, setOverviewDetails] = useState(null);
  const [contentDetails, setContentFormDetails] = useState([null]);
  const [socialDetails, setSocialFormDetails] = useState(null);

  const onFinishInformationForm = (values) => {
    console.log(values);
    setInformationDetails(values);
    setCurrent(1);
  };
  const onFinishOverviewForm = (values) => {
    console.log(values);
    setOverviewDetails(values); // vẫn chưa lưu value OverviewDetails
    setCurrent(2);
  };
  const onFinishContentForm = () => {
    setCurrent(3); // khi bấm continue chuyển qua tab 3
  };
  const onFinishSocialForm = (values) => {
    console.log(values);
    setSocialFormDetails(values);
    setCurrent(4);
  };

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
      onFinish={onFinishContentForm} // chuyển tabs
      setContentFormDetails={setContentFormDetails}
      contentDetails={contentDetails}
    />,
    <SocialForm onFinish={onFinishSocialForm} initialValues={socialDetails} />,

    <FinishForm />,
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
    if (stepNumber === 4) {
      return (
        informationDetails === null ||
        overviewDetails === null ||
        contentDetails === null ||
        socialDetails === null
      );
    }
  };
  return (
    <>
      <div className="creat-page">
        <div className="step-creat-page">
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
              disabled={isStepDisabled(3)}
              title="Social"
              icon={<GlobalOutlined />}
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
