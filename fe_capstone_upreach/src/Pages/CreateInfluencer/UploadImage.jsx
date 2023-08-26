import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Button, Form } from "antd";
import ImgCrop from "antd-img-crop";
import "./CreateInfluencerPage.css";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({ onFinish, initialValues, setImage }) => {
  const [size] = useState("small");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
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
    setImage(fileList);
    setFileList(newFileList);
  };
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
  return (
    <>
      <div id="content">
        <div className="form-information">
          <div className="title-information-form">
            <Form onFinish={onFinish} initialValues={initialValues}>
              <ImgCrop rotationSlider>
                <Upload
                  customRequest={({ file, onSuccess }) => {
                    onSuccess("ok");
                  }}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  beforeUpload={() => true}
                  onChange={handleChange}
                >
                  {!fileList
                    ? "+ Upload"
                    : fileList?.length < 1
                    ? "+ Upload"
                    : null}
                </Upload>
              </ImgCrop>

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

              <div className="mt-3">
                <Button
                  className="submit-information-btn"
                  type="primary"
                  htmlType="submit"
                >
                  Continue
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
