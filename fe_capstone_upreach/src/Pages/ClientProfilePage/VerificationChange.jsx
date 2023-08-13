import { Button, Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

const VerificationChange = ({ isSubModel, onSubModel }) => {
  return (
    <>
      <Modal open={isSubModel} footer={null} centered onCancel={onSubModel}>
        <p>We've sent a verification code to tqd04022001@gmail.com</p>
        <p>Do not close this window or you will have to request a new code</p>
        <p>
          If a code doesn't arrive, check your spam folder or requesting a new
          one
        </p>
        <Form
          className="verification_change"
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          // labelCol={{
          //   span: 4,
          // }}
          // wrapperCol={{
          //   span: 14,
          // }}
          // style={{
          //   maxWidth: 800,
          // }}
        >
          <div>
            <Form.Item name="verificationchange">
              <Input
                className="btn_input"
                style={{ border: "1px solid #9B9A9A" }}
                placeholder="Enter Verification Code "
              />
            </Form.Item>
          </div>
          <div></div>
          <div className="btn-button">
            <FormItem>
              <Button className="btn_verification">Summit</Button>
            </FormItem>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default VerificationChange;
