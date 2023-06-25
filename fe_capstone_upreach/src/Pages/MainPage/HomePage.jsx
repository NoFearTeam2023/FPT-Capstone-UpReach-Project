import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import Index_HomePage from "../MainPage/Index_Homepage";
const HomePage = () => {
  return (
    <div className="coverMain">
      <HeaderHomepage />
      <Index_HomePage />
      <FooterHome />
    </div>
  );
};
export default HomePage;
