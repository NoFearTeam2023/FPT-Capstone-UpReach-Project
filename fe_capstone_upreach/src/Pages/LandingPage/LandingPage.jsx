import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_LandingPage from "./index.jsx";
const LandingPage = () => {
  return (
    <div className="coverMain">
      <HeaderHomepage />
      <Index_LandingPage />
      <FooterHome />
    </div>
  );
};
export default LandingPage;
