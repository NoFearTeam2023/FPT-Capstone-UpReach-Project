import React from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE } from "../../Pages/Homepage/Constant";
import "./HomePage.css";
import { Avatar, Card, Space } from "antd";
const { Meta } = Card;

const CardInfo = () => {
  return (
    <Space direction="vertical" size={16}>
      <Card
        title={
          <>
            <Meta
              avatar={
                <Avatar
                  className="mt-2"
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                />
              }
              title="FullName"
              description={
                <>
                  <div>location</div>
                </>
              }
            />
          </>
        }
        extra={<a href="#">More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
};
export default CardInfo;
