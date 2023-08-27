import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const FinishForm = () => {
  return (
    <>
      <div id="content">
        <div className="form-information">
          <div className="title-finish-information">
            <h3>Successful !</h3>
          </div>
          <div
            className="form-information-form"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h5>We have received your information.</h5>
            <h5>After verifying your information is correct.</h5>
            <h5>Please wait seconds for access to the UpReach system.</h5>
            {/* <Button
              className="finish-sign-up-btn"
              type="primary"
              shape="round"
              size="large"
              style={{ width: "fit-content" }}
            >
              <Link to="/login">Back to login</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishForm;
