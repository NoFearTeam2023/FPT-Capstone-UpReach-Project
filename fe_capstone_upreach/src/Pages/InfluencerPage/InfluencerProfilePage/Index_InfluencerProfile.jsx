import { Avatar, Button, Col, Collapse, Form, Input, Row,Modal,Upload, Select, InputNumber } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useRef, useState } from "react";
import "./influencerProfile.css";
import {
  DownCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom";
import ChangePassword from "../../ClientProfilePage/ChangePassword";
import { Option } from "antd/es/mentions";
import ApiInfluencer from "../../../Api/ApiInfluencer";

const Index_InfluencerProfile = () => {
  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =useState(false);
  const navigate = useNavigate(); 
  const [status, setStatus] = useState()
  const [message, setMessage] = useState()
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState()

  const [formValues, setFormValues] = useState({
    image: '',
    fullName: '',
    nickName: '',
    location: '',
    gender: '',
    age: '',
    bio:"",
    influencerType: "",
    relationship: "",
    emailContact: "",
    phoneContact: "",
    influencerDetail: null,
  });

  function handleClickShowDialogChangePassword() {
    setIsModalOpenChangePassword(true);
  }
  useEffect(() =>{
    const influencerData = localStorage.getItem('user-draw-storage');
    const formDataInfluencer = JSON.parse(influencerData);
    const data = formDataInfluencer.state.user
    setFormValues(prevDetails => ({ ...prevDetails, influencerDetail: data }));
  },[])
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  const handleSelectChange = (value, name) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  const handleInputNumberChange = (value, name) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const onFinishUpdate = () => {
    console.log(formValues)
    FetchDataToUpdateInfluencer(formValues)
  }
  const FetchDataToUpdateInfluencer = async (data) => {
    try {
      const response = await ApiInfluencer.updateAvatarInfluencer(data);
      if(response.status === "False"){
        toast.error(response.message, toastOptions)
        setStatus(response.status)
        console.log(response)
        return response;
      }
      toast.success(response.message, toastOptions)
      setStatus(response.status)
      console.log(response)
      return response;
    } catch (error) {
      setMessage(error)
      console.log(error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Advanced",
      children: (
        <>
          <div>
            <p>Change Password</p>
            <EditOutlined onClick={handleClickShowDialogChangePassword} />
            <ChangePassword
              isModalOpenChangePassword={isModalOpenChangePassword}
              setIsModalOpenChangePassword={setIsModalOpenChangePassword}
            />
          </div>
        </>
      ),
    },
  ];

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const updateImageValue = (newValue) => {
    setFormValues({
      ...formValues, // Sao chép tất cả các giá trị hiện tại của formValues
      image: newValue // Thay đổi giá trị của image thành newValue
    });
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    updateImageValue(newFileList)
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
      className="ant-upload"
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Row style={{ marginTop: "4%" }}>
      <Col span={6}>
        <div className="basicInformation" col>
          <p>Profile Infomation</p>
        </div>
      </Col>
      <Col span={18}>
        <Row>
          <Col span={16} style={{ borderLeft: "1px solid black" }}>
            <div>
              <Form
                className="client-form"
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                onFinish={onFinishUpdate}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                style={{
                  maxWidth: 800,
                }}
              >
                <div>
                  <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList ? null : uploadButton}
                  </Upload>
                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                      alt="example"
                      style={{
                        width: '100%',
                      }}
                      src={previewImage}
                    />
                  </Modal>
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your Full Name!",
                      },
                    ]}
                    name="fullName"
                    label="Full Name"
                  >
                    <Input name="fullName" onChange={handleInputChange} style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item
                name="nickname"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please input your nickname!",
                  },
                ]}
              >
                <Input name="nickName" onChange={handleInputChange}  placeholder="Enter Your Nickname" />
              </Form.Item>
              <Form.Item
                name="location"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please select your location",
                  },
                ]}
              >
                <Select placeholder="Select Your Location" name="location" onChange={(value) => handleSelectChange(value, 'location')}>
                  <Option value="location1">TP Hồ Chí Minh</Option>
                  <Option value="location2">TP Hà Nội</Option>
                  <Option value="location3">TP Đà Nẵng</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="gender"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please select your gender",
                  },
                ]}
              >
                <Select placeholder="Select Your Gender" name="gender" onChange={(value) => handleSelectChange(value, 'gender')}>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={["age"]}
                className="information-btn"
                rules={[
                  {
                    type: "number",
                    min: 18,
                    max: 99,
                    required: false,
                    message: "Please enter your age",
                  },
                ]}
              >
                <InputNumber name="age" onChange={(value) => handleInputNumberChange(value, 'age')} placeholder="Age" />
              </Form.Item>
              <Form.Item
                name="intro"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please enter your Intro",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter Your Bio"
                  showCount
                  maxLength={500}
                  name="bio" onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                name="typeId"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please enter your influencer type",
                  },
                ]}
              >
                <Select placeholder="Select Your Influencer Type " name="influencerType" onChange={(value) => handleSelectChange(value, 'influencerType')}>
                  <Option value="IT01">Celebrity</Option>
                  <Option value="IT02">Talent</Option>
                  <Option value="IT03">Professional</Option>
                  <Option value="IT04">Citizen</Option>
                  <Option value="IT05">Community</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="relationship"
                className="information-btn"
                rules={[
                  {
                    required: false,
                    message: "Please enter your relationship",
                  },
                ]}
              >
                <Select placeholder="Select Your Relationship"  name="relationship" onChange={(value) => handleSelectChange(value, 'relationship')}>
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Single Mom">Single Mom</Option>
                  <Option value="Single Dad">Single Dad</Option>
                  <Option value="Unknown">Unknown</Option>
                </Select>
              </Form.Item>
              <div className="overview-form-contact">
                <h5>Your Contact Information</h5>
                <Form.Item
                  name="emailContact"
                  rules={[
                    {
                      required: false,
                      message: "Please input your email",
                    },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    className="information-btn"
                    placeholder="Email we can contact with you!"
                    name="emailContact" onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      min: 10,
                      max: 10,
                      required: false,
                      message: "Please input your phone number",
                    },
                  ]}
                >
                  <Input name="phoneContact" onChange={handleInputChange} placeholder="Phone we can contact with you!" />
                </Form.Item>
              </div>
                </div>
                <div className="bnt_button">
                  <FormItem>
                    <Button className="btn_update" htmlType="update">
                      Update
                    </Button>
                  </FormItem>
                </div>
                
              </Form>
            </div>
            <ToastContainer />
            <Collapse
              className="collapse_advanced"
              ghost
              expandIcon={({ isActive }) => {
                return (
                  <DownCircleOutlined
                    style={{ fontSize: "20px" }}
                    rotate={isActive ? 180 : 0}
                  />
                );
              }}
              expandIconPosition="right"
              style={{ width: "10%" }}
              items={items}
            />
          </Col>
        </Row>
      </Col>
    </Row>
    
  );
};

export default Index_InfluencerProfile;