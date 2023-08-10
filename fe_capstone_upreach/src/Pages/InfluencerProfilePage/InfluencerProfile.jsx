import { Avatar, Button, Col, Collapse, Form, Input, Row,Modal,Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useRef, useState } from "react";
import "./InfluencerProfile.css";
import {
  DownCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import ApiListClient from "../../Api/ApiListClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom";

const InfluencerProfile = () => {
  const [isModalOpenUpdateEmail, setIsModalOpenUpdateEmail] = useState(false);
  const [isSubModel, setSubModel] = useState(false);
  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =useState(false);
  const [message, setMessage] = useState()
  const [status, setStatus] = useState()
  const navigate = useNavigate(); 
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState()

  const [formValues, setFormValues] = useState({
    image: '',
    fullName: '',
    brandName: '',
    phoneNumber: '',
    location: '',
    email: '',
    influencerDetail: null,
  });

 

  useEffect(() =>{
    const data = localStorage.getItem('formData');
    const formDataJson = JSON.parse(data);
    setFormValues(prevDetails => ({ ...prevDetails, influencerDetail: formDataJson }));
    if(status ==='True'){
      navigate('/homepage')
    }
  },[status])

  const onFinish = () => {
    console.log(formValues)
    FetchDataProfile(formValues)
  }

  const FetchDataProfile = async (data) => {
    try {
      const response = await ApiListClient.addNewInfluencerImage(data);
      if(response.status === "False"){
        toast.error(response.message, toastOptions)
        setStatus(response.status)
        return ;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
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
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  }

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  return (
    <Row style={{ marginTop: "4%" }}>
      <Col span={6}>
        <div className="basicInformation" col>
          <p>Basic infomation</p>
        </div>
      </Col>
      <Col span={18}>
        <Row>
          <Col span={16} style={{ borderLeft: "1px solid black" }}>
            <div>
              <Form
                className="client-form"
                onFinish= {onFinish}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
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
                    name="fullname"
                    label="Full Name"
                  >
                    <Input name="fullName" onChange={handleInputChange} style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your Brand Name!",
                      },
                    ]}
                    name="brandname"
                    label="Brand Name"
                  >
                    <Input name="brandName" onChange={handleInputChange} style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="location" label="Location">
                    <Input name="location" onChange={handleInputChange} style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item name="email" label="Email">
                    <Input name="email" onChange={handleInputChange} style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        min: 10,
                        max: 10,
                        required: true,
                        message: "Please input your phone number",
                      },
                    ]}
                    name="phonenumber"
                    label="Phone Number"
                  >
                    <Input name="phoneNumber" onChange={handleInputChange} style={{ border: "1px solid #9B9A9A" }} />
                  </Form.Item>
                </div>
                <div></div>
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
            //   items={items}
            />
          </Col>
        </Row>
      </Col>
    </Row>
    
  );
};

export default InfluencerProfile;