import "./StatusCardComponents.css";

const StatusCardComponents = ({ value, title, icon }) => {
  return (
    <div className="statisticContent">
      <div>
        <p className="statisticValue">{value}</p>
        <p className="statisticTitle">{title}</p>
      </div>
      <div className="statisticIcon">{icon}</div>
    </div>
  );
};
export default StatusCardComponents;
