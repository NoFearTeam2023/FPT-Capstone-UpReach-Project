import "./RecommendCard.css";
import { TeamOutlined } from "@ant-design/icons";
import Default_Img from "../../../Assets/Image/Default/DefaultImg.jpg";
const RecommendCard = () => {
  return (
    <>
      <div className="cards">
        <div className="card1">
          <div className="card1-info">
            <div className="card1-avatar">
              <img className="card1-avatarImg" src={Default_Img} alt="" />
            </div>
            <div className="card1-title">Le Bong</div>
          </div>
          <ul className="card1-social">
            <li className="card1-social__item">Female</li>
            <li className="card1-social__item">
              <TeamOutlined />
              {"  " + 2000}
            </li>
          </ul>
        </div>
        <div className="card2">
          <div className="card2-info">
            <div className="card2-avatar">
              <img className="card2-avatarImg" src={Default_Img} alt="" />
            </div>
            <div className="card2-title">Do Phung</div>
          </div>
          <ul className="card2-social">
            <li className="card2-social__item">Male</li>
            <li className="card2-social__item">
              <TeamOutlined />
              {"  " + 2000}
            </li>
          </ul>
        </div>
        <div className="card3">
          <div className="card3-info">
            <div className="card3-avatar">
              <img className="card3-avatarImg" src={Default_Img} alt="" />
            </div>
            <div className="card3-title">Ngo Dinh Nam</div>
          </div>
          <ul className="card3-social">
            <li className="card3-social__item">Male</li>
            <li className="card3-social__item">
              <TeamOutlined />
              {"  " + 2000}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default RecommendCard;
