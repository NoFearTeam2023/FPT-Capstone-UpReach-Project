import { Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

const ButtonDropdown = ({ titleBtn, Id }) => {
  return (
    <Button
      className="dropdownSlider bg-white"
      id={Id}
      style={{
        width: "100%",
      }}
    >
      <Space>
        {titleBtn} <DownOutlined />
      </Space>
    </Button>
  );
};

export default ButtonDropdown;
