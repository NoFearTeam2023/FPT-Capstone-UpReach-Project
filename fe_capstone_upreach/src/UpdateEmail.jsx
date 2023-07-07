import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import VerificationChange from "./VerificationChange";

const UpdateEmail = ({
  isModalOpenUpdateEmail,
  setIsModalOpenUpdateEmail,
  isSubModel,
  setSubModel,
}) => {
  const handleCancel = () => {
    setIsModalOpenUpdateEmail(false);
  };
  const onSubModel = (e, stateSub = true, stateMain = true) => {
    setIsModalOpenUpdateEmail(stateMain);
    setSubModel(stateSub);
  };

  return (
    <>
      <Modal
        visible={isModalOpenUpdateEmail}
        footer={null}
        centered
        onCancel={handleCancel}
      >
        <h1>Update login email</h1>
        <p>Change the email address that you use to log in to Upsearch</p>
        <Form
          className="update_email"
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
            <Form.Item name="newaddressemail">
              <Input
                className="btn_input"
                placeholder="Enter New Address Email"
                style={{ border: "1px solid #9B9A9A" }}
              />
            </Form.Item>
          </div>
          <div></div>
          <div className="btn-button">
            <FormItem>
              <Button className="btn_verification" onClick={onSubModel}>
                Send verification code
              </Button>
              <VerificationChange
                isSubModel={isSubModel}
                onSubModel={onSubModel}
              />
            </FormItem>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateEmail;
