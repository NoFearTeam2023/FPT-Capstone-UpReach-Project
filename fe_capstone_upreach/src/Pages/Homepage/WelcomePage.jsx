import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_Welcomepage from "./Index_Welcomepage";
const WelcomePage = () => {
  return (
    <div className="coverMain">
      <HeaderHomepage />

      <Index_Welcomepage />

      <FooterHome />
    </div>
  );
};
export default WelcomePage;
