import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber } from "antd";
import FormItem from "antd/es/form/FormItem";
import { FaTiktok } from "react-icons/fa";
const SocialForm = ({ onFinish, initialValues }) => {
  return (
    <>
      <div id="content">
        <div className="form-information">
          <div className="title-information-form">
            <h3>Add your social channels</h3>
          </div>
          <div className="form-information-form">
            <Form onFinish={onFinish} initialValues={initialValues}>
              <div className="social-input-form">
                <FormItem
                  name="instagramLink"
                  rules={[
                    {
                      required: true,
                      message: "Please input link of Instagram!",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: 280,
                    }}
                    size="large"
                    prefix={<InstagramOutlined />}
                    placeholder="Link of Instagram"
                  />
                </FormItem>
                <FormItem
                  name="instagramFollower"
                  rules={[
                    {
                      required: true,
                      message: "Please input followers of Instagram!",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: 165,
                      marginLeft: "45px",
                    }}
                    size="large"
                    placeholder="Instagram Followers"
                  />
                </FormItem>
              </div>
              <div className="social-input-form">
                <FormItem
                  name="facebookLink"
                  rules={[
                    {
                      required: true,
                      message: "Please input link of Facebook!",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: 280,
                    }}
                    size="large"
                    prefix={<FacebookOutlined />}
                    placeholder="Link of Facebook"
                  />
                </FormItem>
                <FormItem
                  name="facebookFollower"
                  rules={[
                    {
                      required: true,
                      message: "Please input followers of Facebook!",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: 165,
                      marginLeft: "45px",
                    }}
                    size="large"
                    placeholder="Facebook Followers"
                  />
                </FormItem>
              </div>
              <div className="social-input-form">
                <FormItem
                  name="youtubeLink"
                  rules={[
                    {
                      required: true,
                      message: "Please input link of Youtube!",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: 280,
                    }}
                    size="large"
                    prefix={<YoutubeOutlined />}
                    placeholder="Link of Youtube"
                  />
                </FormItem>

                <FormItem
                  name="youtubeFollower"
                  rules={[
                    {
                      required: true,
                      message: "Please input subscribe of Youtube",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: 165,
                      marginLeft: "45px",
                    }}
                    size="large"
                    placeholder="Youtube subscribe"
                  />
                </FormItem>
              </div>
              <div className="social-input-form">
                <FormItem
                  name="tiktokLink"
                  rules={[
                    {
                      required: true,
                      message: "Please input link of Tiktok!",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: 280,
                    }}
                    size="large"
                    prefix={<FaTiktok />}
                    placeholder="Link of Tiktok"
                  />
                </FormItem>

                <FormItem
                  name="tiktokFollower"
                  rules={[
                    {
                      required: true,
                      message: "Please input followers of Tiktok",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: 165,
                      marginLeft: "45px",
                    }}
                    size="large"
                    placeholder="Tiktok Followers"
                  />
                </FormItem>
              </div>
              <div>
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

export default SocialForm;
