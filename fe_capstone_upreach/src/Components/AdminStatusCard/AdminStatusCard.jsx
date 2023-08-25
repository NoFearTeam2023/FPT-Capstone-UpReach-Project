import React from "react";
import "./AdminStatusCard.css";

const AdminStatusCard = ({ value, title, icon }) => {
  const [bgColor, setBgColor] = React.useState("");
  const [strokeColor, setStrokeColor] = React.useState("");
  const [valueColor, setValueColor] = React.useState("");

  React.useEffect(() => {
    switch (title) {
      case "Influencers":
        setBgColor("#FF5986");
        setStrokeColor("#FFDEE7");
        setValueColor("#FF5986");
        break;
      case "Lists":
        setBgColor("#7297FF");
        setStrokeColor("#E3EAFF");
        setValueColor("#7297FF");

        break;
      case "Booking":
        setBgColor("#55C97B");
        setStrokeColor("#DDF4E5");
        setValueColor("#55C97B");

        break;
      case "Users":
        setBgColor("#FD9F21");
        setStrokeColor("#FFECD3");
        setValueColor("#FD9F21");

        break;
      default:
        return;
    }
  });
  return (
    <div className="admin-statistic-content">
      <div
        className="admin-statistic-icon-stroke"
        style={{ backgroundColor: `${strokeColor}` }}
      >
        <div
          className="admin-statistic-icon-bg"
          style={{ backgroundColor: `${bgColor}` }}
        >
          <div className="admin-statistic-icon">{icon}</div>
        </div>
      </div>
      <div>
        <p className="admin-statistic-value" style={{ color: `${valueColor}` }}>
          {value}
        </p>
        <p className="admin-statistic-title">{title}</p>
      </div>
    </div>
  );
};

export default AdminStatusCard;
