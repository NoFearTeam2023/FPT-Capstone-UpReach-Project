import { Button, Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

const ChangePassword = ({
  isModalOpenChangePassword,
  setIsModalOpenChangePassword,
}) => {
  const handleCancel = () => {
    setIsModalOpenChangePassword(false);
  };
  return (
    <>
      <Modal
        open={isModalOpenChangePassword}
        footer={null}
        centered
        onCancel={handleCancel}
      >
        <h1>Change password</h1>
        <p>Change the password that you use to log in to Upsearch</p>
        <Form
          className="change_password"
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
            <Form.Item name="newpassword">
              <Input
                className="btn_input"
                style={{ border: "1px solid #9B9A9A" }}
                placeholder="Enter New Password"
              />
            </Form.Item>
            <Form.Item name="confirmnewpassword">
              <Input
                className="btn_input"
                style={{ border: "1px solid #9B9A9A" }}
                placeholder="Confirm New Password"
              />
            </Form.Item>
          </div>
          <div></div>
          <div className="btn-button">
            <FormItem>
              <Button className="btn_verification">
                Send verification code
              </Button>
            </FormItem>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
