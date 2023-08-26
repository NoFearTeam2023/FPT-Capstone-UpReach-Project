import {
  Avatar,
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Modal,
  Upload,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useRef, useState } from "react";
import "./ClientProfilePage.css";
import {
  DownCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UpdateEmail from "./UpdateEmail";
import ChangePassword from "./ChangePassword";
import ApiListClient from "../../Api/ApiListClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../Stores/user";

const Index_ClientProfile = () => {
  const [isSubModel, setSubModel] = useState(false);
  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =
    useState(false);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [checkClientExist, setCheckClientExist] = useState(false);
  const [formValues, setFormValues] = useState({
    image: "",
    fullName: "",
    brandName: "",
    phoneNumber: "",
    location: "",
    emailContact: "",
    clientDetail: null,
  });
  const [formData, setFormData] = useState({
    clientData: null,
  });

  const [user, setUserInfo] = useUserStore((state) => [
    state.user,
    state.setUserInfo,
  ]);

  useEffect(() => {
    checkUpdateOrRegister();
  }, []);
  console.log(formData);
  useEffect(() => {
    form.setFieldsValue({
      fullName: formData?.clientData?.fullName,
      brandName: formData?.clientData?.brand,
      phoneNumber: formData?.clientData?.phone,
      location: formData?.clientData?.address,
      emailContact: formData?.clientData?.emailContact,
    });
  }, [formData]);

  useEffect(() => {
    if (status === "True") {
      navigate("/homepage");
    }
  }, [status]);

  const checkUpdateOrRegister = () => {
    if (localStorage.getItem("user-draw-storage") !== null) {
      const oldClient = localStorage.getItem("user-draw-storage");
      const formDataOldClientJson = JSON.parse(oldClient);
      const data = formDataOldClientJson.state.user;
      setFormValues((prevDetails) => ({ ...prevDetails, clientDetail: data }));
      FetchDataCheckProfile(data);
      return;
    }
    const newClient = localStorage.getItem("formData");
    const formDataNewClientJson = JSON.parse(newClient);
    setFormValues((prevDetails) => ({
      ...prevDetails,
      clientDetail: formDataNewClientJson,
    }));

    FetchDataCheckProfile(formDataNewClientJson);
  };

  const onFinishInsertClient = () => {
    FetchInsertClientProfile(formValues);
  };

  const onFinishUpdateClient = () => {
    FetchUpdateClientProfile(formValues);
  };

  const FetchDataCheckProfile = async (data) => {
    try {
      console.log(data);
      const response = await ApiListClient.checkClientExisted(data);
      console.log(response);
      if (response.status === "True") {
        setCheckClientExist(true);
        setFormData((prevDetails) => ({
          ...prevDetails,
          clientData: response.data,
        }));
      }

      return response;
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };

  const FetchInsertClientProfile = async (data) => {
    try {
      const response = await ApiListClient.addProfileClient(data);
      if (response.status === "False") {
        toast.error(response.message, toastOptions);
        setStatus(response.status);
        return;
      }
      toast.success(response.message, toastOptions);
      setStatus(response.status);
      setUserInfo(response.data, response._idMongodb);
      console.log(response);
      return response;
    } catch (error) {
      setMessage(error);
      console.log(error);
    }
  };

  const FetchUpdateClientProfile = async (data) => {
    try {
      const response = await ApiListClient.updateProfileClient(data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const updateImageValue = (newValue) => {
    setFormValues({
      ...formValues, // Sao chép tất cả các giá trị hiện tại của formValues
      image: newValue, // Thay đổi giá trị của image thành newValue
    });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    updateImageValue(newFileList);
  };
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

  function handleClickShowDialogChangePassword() {
    setIsModalOpenChangePassword(true);
  }

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

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: "dark",
  };

  console.log(checkClientExist);
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
                onFinish={
                  checkClientExist ? onFinishUpdateClient : onFinishInsertClient
                }
                form={form}
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
                      customRequest={({ file, onSuccess }) => {
                        onSuccess("ok");
                      }}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      name="image"
                      beforeUpload={beforeUpload}
                    >
                      {!fileList
                        ? "+ Upload"
                        : fileList?.length < 1
                        ? "+ Upload"
                        : null}
                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{
                          width: "100%",
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
                    <Input
                      name="fullName"
                      onChange={handleInputChange}
                      style={{ border: "1px solid #9B9A9A" }}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your Brand Name!",
                      },
                    ]}
                    name="brandName"
                    label="Brand Name"
                  >
                    <Input
                      name="brandName"
                      onChange={handleInputChange}
                      style={{ border: "1px solid #9B9A9A" }}
                    />
                  </Form.Item>
                  <Form.Item name="location" label="Location">
                    <Input
                      name="location"
                      onChange={handleInputChange}
                      style={{ border: "1px solid #9B9A9A" }}
                    />
                  </Form.Item>
                  <Form.Item name="emailContact" label="Email">
                    <Input
                      name="emailContact"
                      onChange={handleInputChange}
                      style={{ border: "1px solid #9B9A9A" }}
                    />
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
                    name="phoneNumber"
                    label="Phone Number"
                  >
                    <Input
                      name="phoneNumber"
                      onChange={handleInputChange}
                      style={{ border: "1px solid #9B9A9A" }}
                    />
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
              items={items}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index_ClientProfile;
