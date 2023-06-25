import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_Homepage from "./Index_Homepage";
const HomePage = ({ navigateHome, navigateLogin }) => {
  return (
    <div className="coverMain">
      <HeaderHomepage handleClickHomePage={navigateHome} />
      <Index_Homepage handleClickLogin={navigateLogin} />
      <FooterHome />
    </div>
  );
};
export default WelcomePage;
