import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_Introduce from "./Index_Introduce";
const Introduce = ({ navigateHome, navigateLogin, navigateMyInfluencer }) => {
  return (
    <div className="coverMain">
      <HeaderHomepage />
      <Index_Introduce handleClickLogin={navigateLogin} />
      <FooterHome />
    </div>
  );
};
export default Introduce;
