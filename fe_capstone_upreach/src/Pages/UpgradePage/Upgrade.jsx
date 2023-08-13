import React, { useState } from "react";
import "./Upgrade.css";
import "../../CSS/Theme.css";
import {
  NOTE_TITLE,
  Q1_TITLE,
  Q1_SUB_TITLE,
  Q2_TITLE,
  Q2_SUB_TITLE,
  Q3_TITLE,
  Q3_SUB_TITLE,
  UPGRADE_CARDS,
} from "./ConstUpgradePage";
import { List } from "antd";
import UpgradeCard from "../../Components/Layouts/UpgradeCard/UpgradeCard";

const Upgrade = () => {
  const [upgradeCards, setUpgradeCards] = useState(UPGRADE_CARDS);
  return (
    <>
      <div className="upgrade-bg backgroundMainPage">
        <div className="upgrade-header">
          <div className="d-inline mt-3 countTime pt-2 countTime-bg">
            Remaining results: <div className="d-inline numberCount">100</div>
            <div className="d-inline mt-3 ms-3 pt-2">
              Remaining reports: <div className="d-inline numberCount">100</div>
              <button className="ms-3 btnAdd">Add More</button>
            </div>
          </div>
          <div className="upgrade-header-title">
            Pick the plan that's right for you
          </div>
          <div className="upgrade-header-sub-title">
            Upgrade, downgrade or cancel at any time
          </div>
        </div>
        <div className="upgrade-body">
          <List
            grid={{ gutter: 78, column: 3 }}
            dataSource={upgradeCards}
            renderItem={(item) => (
              <List.Item style={{ display: "flex" }}>
                <UpgradeCard upgradeCards={item} />
              </List.Item>
            )}
          />
        </div>
        <div className="upgrade-footer">
          <div className="upgrade-footer-note">{NOTE_TITLE}</div>
          <div className="upgrade-footer-FAQ">
            <p>FAQ</p>
            <div className="upgrade-footer-FAQ-content">
              <div className="upgrade-footer-FAQ-sub-content">
                <div className="upgrade-footer-FAQ-title">{Q1_TITLE}</div>
                <div className="upgrade-footer-FAQ-sub-title">
                  {Q1_SUB_TITLE}
                </div>
              </div>
              <div className="upgrade-footer-FAQ-sub-content">
                <div className="upgrade-footer-FAQ-title">{Q2_TITLE}</div>
                <div className="upgrade-footer-FAQ-sub-title">
                  {Q2_SUB_TITLE}
                </div>
              </div>
              <div className="upgrade-footer-FAQ-sub-content">
                <div className="upgrade-footer-FAQ-title">{Q3_TITLE}</div>
                <div className="upgrade-footer-FAQ-sub-title">
                  {Q3_SUB_TITLE}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Upgrade;
