import { Button, Space } from "antd";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import "./JoinAsBrand.css";
import { Link } from "react-router-dom";

const JoinAsBrand = ({ navigateHome }) => {
  return (
    <>
      <HeaderHomepage />
      <div className="joinAsBrandContent">
        <p>The Easy Way to Generate</p>
        <p>
          Find Instagram, Facebook, Tiktok, and Youtube influencers to create
          unique content for your brand in seconds
        </p>
        <Space wrap>
          <Link to="/sign-up">
            <Button type="primary">Sign Up</Button>
          </Link>
        </Space>
      </div>
    </>
  );
};
export default JoinAsBrand;
