import "./CardFilter.css";
import { Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FILTER, LIST_AGE, LIST_CARD_FILTER, LIST_GENDER, LIST_SOCIAL, LIST_TITLE } from "./ConstCardFilter";
import Buttons from "../../../Components/UI/Buttons";

//render one filter
function RenderFilter({ title, listItems }) {
  return (
    <div className="col-4 ">
      <div className="filterTitle">{title}</div>
      <div className="filterOptions">
        <Checkbox.Group options={listItems} />
      </div>
    </div>
  )
}

const CardFilter = ({ onClick }) => {

  return (
    <div className="cardFilter">
      <div className="row">
        {LIST_CARD_FILTER.map((item) => (<RenderFilter title={item.title} listItems={item.list} />))}
      </div>
      <div className="filterBtn">
        <Buttons
          style={{ height: "35px", width: "150px" }}
          icon={<SearchOutlined />}
          text={FILTER}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
export default CardFilter;
