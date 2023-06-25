import "./RecommendCard.css";
import { TeamOutlined } from "@ant-design/icons";
const RecommendCard = () => {
  return (
    <>
      <div className="cards">
        <div className="card1">
          <div className="card1-info">
            <div className="card1-avatar"></div>
            <div className="card1-title">Le Bong</div>
          </div>
          <ul className="card1-social">
            <li className="card1-social__item">Male</li>
            <li className="card1-social__item">
              <TeamOutlined />
              {"  " + 2000}
            </li>
          </ul>
        </div>
        <div className="card2">
          <div className="card2-info">
            <div className="card2-avatar"></div>
            <div className="card2-title">Le Bong</div>
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
            <div className="card3-avatar"></div>
            <div className="card3-title">Le Bong</div>
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
