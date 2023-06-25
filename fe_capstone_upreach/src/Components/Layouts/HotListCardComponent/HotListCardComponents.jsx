import "./HotListCardComponents.css";

const HotListCardComponents = ({ image, name, topics }) => {
  return (
    <div className="hotListItems">
      <div className="hotListImage">
        <img
          onError={(e) =>
            (e.target.src =
              "https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg")
          }
          src={image}
          className={"hotListImage"}
          alt="hotListCard"
        />
      </div>
      <div className="hotListCardContent">
        <p className="hotListName">{name}</p>
        <p className="hotListTopics">{topics}</p>
      </div>
    </div>
  );
};
export default HotListCardComponents;
