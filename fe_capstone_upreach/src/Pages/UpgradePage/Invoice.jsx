import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiListClient from "../../Api/ApiListClient";
import "./Upgrade.css";
import { Button, Form, Input, InputNumber } from "antd";

const Invoices = ({ formPlan }) => {
  const [formValues, setFormValues] = useState({
    clientDetail: null,
    planPackageDetail: formPlan.planPackageDetail,
  });
  const [invoiceData, setInvoiceData] = useState({
    Package: formPlan.planPackageDetail.describe,
    date: "2023-08-26",
    totalAmount: 1000.0,
    items: [
      {
        name: formPlan.planPackageDetail.Tag,
        price: formPlan.planPackageDetail.cost,
      },
    ],
  });
  const onClickToUpdatePlanPackage = () => {
    localStorage.setItem("Plan-Package", JSON.stringify(formValues));
  };
  console.log(formValues);
  useEffect(() => {
    const newClient = localStorage.getItem("user-draw-storage");
    const formDataNewClientJson = JSON.parse(newClient);
    setFormValues((prevDetails) => ({
      ...prevDetails,
      clientDetail: formDataNewClientJson.state.user,
    }));
  }, []);

  return (
    <div className="auth-background">
      <div className="verify-background">
        <div className="verify-custom-bg">
          <div />
          <div className="App index-1000 w-100 p-3">
            <div className="text-center">
              <h1 className="mt-4">Invoice</h1>
            </div>
            <p className="mt-4 ms-3">
              Invoice Plan Package: {formPlan.planPackageDetail.describe}
            </p>
            <p className="ms-3">Date: {invoiceData.date}</p>
            <div className="text-center mt-4">
              <h3>Plan Package</h3>
            </div>
            <ul>
              {invoiceData.items.map((item, index) => (
                <li key={index} className="mt-4 ms-3">
                  {item.name} - Price: {item.price}
                </li>
              ))}
            </ul>
            <h5 className="ms-3">
              Total Amount: {formPlan.planPackageDetail.cost}
            </h5>
            <div className="w-100 margin-top-300">
              <div className="m-auto w-50 margin-top-300">
                <Link to={formPlan?.infoPaySuccess?.data?.order_url}>
                  <Button
                    className="upgrade-card-btn mt-5"
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={onClickToUpdatePlanPackage()}
                  >
                    Pay Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
