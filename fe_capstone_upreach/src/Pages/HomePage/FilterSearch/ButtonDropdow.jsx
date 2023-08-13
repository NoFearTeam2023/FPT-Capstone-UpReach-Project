import { Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

const ButtonDropdow = ({ titleBtn }) => {
  return (
    <Button
      className="dropdownSlider bg-white"
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

export default ButtonDropdow;
