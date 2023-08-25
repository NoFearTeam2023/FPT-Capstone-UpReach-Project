import React from "react";
import "./AdminDashboardLayout.css";
// import { DownOutlined } from "@ant-design/icons";
// import { Dropdown, Space } from "antd";
import AdminTotalStatusCard from "./AdminTotalStatusCard/AdminTotalStatusCard";
import AdminTopCards from "./AdminTopCards/AdminTopCards";
import AdminTopIncome from "./AdminTopIncome/AdminTopIncome";
import { Spin, Avatar } from "antd";
import axios from "axios";
import default_img from "../../../../Assets/Image/Default/DefaultImg.jpg";

const AdminDashboardLayout = () => {
  const [listInflu, setListInflu] = React.useState([]);
  const [listClient, setListClient] = React.useState([]);
  const [listInfluTop, setListInfluTop] = React.useState([]);

  const [force, setForce] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [sortOption, setSortOption] = React.useState("Choose Option");
  // const items = [
  //   {
  //     label: (
  //       <p
  //         onClick={(e) => {
  //           setSortOption(e.target.innerText);
  //         }}
  //       >
  //         Monthly
  //       </p>
  //     ),
  //     key: "0",
  //   },
  //   {
  //     label: (
  //       <p
  //         onClick={(e) => {
  //           setSortOption(e.target.innerText);
  //         }}
  //       >
  //         Year
  //       </p>
  //     ),
  //     key: "1",
  //   },
  // ];
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/api/admin/get-top-influencer", {
        params: {
          // email: user.influencerEmail,
        },
      })
      .then((response) => {
        const info = response?.data.data;
        setListInflu(info);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [force]);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/get-client-account", {
        params: {
          // email: user.influencerEmail,
        },
      })
      .then((response) => {
        const info = response?.data?.data;
        setListClient(info);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      });
  }, [force]);
  React.useEffect(() => {
    listInflu.sort((a, b) => b.influencerFollowers - a.influencerFollowers);
    const topInfluencers = listInflu.slice(0, 3);
    setListInfluTop(topInfluencers);
  }, [listInflu]);
  // console.log(listInfluTop);
  // console.log(isLoading);
  return (
    <>
      <div className="admin-dashboard-layout">
        <Spin tip="Loading" size="large" spinning={isLoading}>
          <div className="admin-dashboard-title">
            <p>OVERVIEW</p>
          </div>
          <div className="admin-total-status">
            <AdminTotalStatusCard
              listInflu={listInflu}
              listClient={listClient}
            />
          </div>
          <div className="admin-top">
            <div className="admin-top-cards">
              <AdminTopCards listInfluTop={listInfluTop} />
            </div>
            <div className="admin-top-income">
              <AdminTopIncome listClient={listClient} />
            </div>
          </div>
          <div className="upgrade-packages">
            <div className="upgrade-package-free">
              <div className="upgrade-package-header">
                <p>Free</p>
                <p>0 VND/month</p>
              </div>
              <div className="upgrade-package-body">
                <div className="upgrade-package-body-line">
                  <p>Package:&nbsp;</p>
                  <p>0 VND/month</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>View report:&nbsp;</p>
                  <p>10</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>Search:&nbsp;</p>
                  <p>20</p>
                </div>
              </div>
              <div className="upgrade-package-footer">Edit</div>
            </div>
            <div className="upgrade-package-starter">
              <div className="upgrade-package-header">
                <p>Starter</p>
                <p>199.000 VND/month</p>
              </div>
              <div className="upgrade-package-body">
                <div className="upgrade-package-body-line">
                  <p>Package:&nbsp;</p>
                  <p>199.000 VND/month</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>View report:&nbsp;</p>
                  <p>20</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>Search:&nbsp;</p>
                  <p>200</p>
                </div>
              </div>
              <div className="upgrade-package-footer">Edit</div>
            </div>
            <div className="upgrade-package-business">
              <div className="upgrade-package-header">
                <p>Business</p>
                <p>299.000 VND/month</p>
              </div>
              <div className="upgrade-package-body">
                <div className="upgrade-package-body-line">
                  <p>Package:&nbsp;</p>
                  <p>299.000 VND/month</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>View report:&nbsp;</p>
                  <p>500</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>Search:&nbsp;</p>
                  <p>1000</p>
                </div>
              </div>
              <div className="upgrade-package-footer">Edit</div>
            </div>
            <div className="upgrade-package-gold">
              <div className="upgrade-package-header">
                <p>Gold</p>
                <p>499.000 VND/month</p>
              </div>
              <div className="upgrade-package-body">
                <div className="upgrade-package-body-line">
                  <p>Package:&nbsp;</p>
                  <p>499.000 VND/month</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>View report:&nbsp;</p>
                  <p>1000</p>
                </div>
                <div className="upgrade-package-body-line">
                  <p>Search:&nbsp;</p>
                  <p>3000</p>
                </div>
              </div>
              <div className="upgrade-package-footer">Edit</div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};
export default AdminDashboardLayout;
