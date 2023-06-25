import { LIST_RECOMMEND } from "./ConstRecommendCard";
import "./RecommendCard.css";
import { TeamOutlined } from "@ant-design/icons";

function RenderRecommendCard({ className, avatar, name, gender, social }) {
  return (
    <div className={className}>
      <div className={className + "-info"}>
        <div className={className + "-avatar"}>
        </div>
        <div className={className + "-title"}>{name}</div>
      </div>
      <ul className={className + "-social"}>
        <li className={className + "-social__item"}>{gender}</li>
        <li className={className + "-social__item"}>
          <TeamOutlined />
          {"  " + social}
        </li>
      </ul>
    </div>
  )
}

const RecommendCard = () => {
  return (
    <>
      <div className="cards">
        {LIST_RECOMMEND.map((item) => (
          <RenderRecommendCard className={item.class} name={item.name} gender={item.gender} avatar={item.img} social={item.social} />
        ))}
      </div>
    </>
  );
};
export default RecommendCard;
