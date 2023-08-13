import { Button, Form, Input, Modal, Space, Tag } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React, { useState } from "react";

const ContentForm = ({ onFinish, setContentFormDetails, contentDetails }) => {
  const [modal, contextHolder] = Modal.useModal();
  const { CheckableTag } = Tag;
  const tagsData1 = [
    "Sport & Fitness",
    "Business",
    "Baby",
    "Education",
    "Music",
    "Housing",
    "Nutrition",
    "Film",
    "Artwork",
    "Fashion",
  ];
  const tagsData2 = [
    "Beauty",
    "Technology",
    "Hot Face",
    "Travel",
    "Food & Drink",
    "Healthcare",
    "Game",
    "Personal perception",
    "Pet",
    "Dance",
  ];
  const [selectedTags, setSelectedTags] = useState(contentDetails);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    if (nextSelectedTags.length <= 8) {
      setSelectedTags(nextSelectedTags);
      setContentFormDetails(nextSelectedTags);
    }
    if (nextSelectedTags.length === 9) {
      modal.info({
        title: "Info",
        content: (
          <>
            <p>You can only select 8 tags.</p>
          </>
        ),
      });
    }
  };
  console.log(contentDetails);
  return (
    <>
      <div id="content">
        <div className="form-information">
          <div className="title-information-form">
            <h3>Content Topic</h3>
          </div>
          <div className="form-information-form">
            <Form onFinish={onFinish}>
              <div className="scroll-holder">
                <Space size={[80, 100]}>
                  <Space.Compact direction="vertical">
                    {tagsData1.map((tag) => (
                      <CheckableTag
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(checked) => handleChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </Space.Compact>
                  <Space.Compact direction="vertical">
                    {tagsData2.map((tag) => (
                      <CheckableTag
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(checked) => handleChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </Space.Compact>
                </Space>
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
            {contextHolder}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentForm;
