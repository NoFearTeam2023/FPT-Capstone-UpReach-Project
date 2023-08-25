import React, { useState, useEffect } from "react";
import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_HomePage from "./Index_HomePage";
import { useUserStore } from "../../Stores/user";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const HomePage = () => {
  const [user] = useUserStore((state) => [state.user]);
  const [loadingFullPage, setLoadingFullPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var Body = document.getElementsByTagName("BODY")[0];
    if (loadingFullPage) {
      Body.classList.add("overflow-hidden");
    } else {
      Body.classList.remove("overflow-hidden");
    }
  }, [loadingFullPage]);

  useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/dashboard");
    } else if (user.roleId == 2) {
      navigate("/homepage");
    } else if (user.roleId == 3) {
      navigate("/influencer/my-report");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {user?.roleId == 2 ? (
        <div className="coverMain">
          <Spin
            spinning={loadingFullPage}
            size="large"
            style={{ position: "fixed", top: "30%" }}
          >
            <HeaderHomepage />
            <Index_HomePage setLoadingFullPage={setLoadingFullPage} />
            <FooterHome />
          </Spin>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default HomePage;
