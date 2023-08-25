import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_Introduce from "./Index_Introduce";
import React from "react";
import { useUserStore } from "../../Stores/user";
import { useNavigate } from "react-router-dom";

const Introduce = ({ navigateHome, navigateLogin, navigateMyInfluencer }) => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  React.useEffect(() => {
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
      {user?.roleId ? (
        ""
      ) : (
        <div className="cover-main-introduce-page">
          <HeaderHomepage />
          <Index_Introduce handleClickLogin={navigateLogin} />
          <FooterHome />
        </div>
      )}
    </>
  );
};
export default Introduce;
