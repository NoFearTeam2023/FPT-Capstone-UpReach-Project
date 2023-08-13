import "./ReportSocial.css";
import { ReactComponent as Facebook } from "../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../../Assets/Icon/Tiktok.svg";
const ReportSocial = () => {
  return (
    <>
      <div className="report-social-layout">
        <div className="report-social">
          <div className="social-icon-title">
            <Facebook className="social-icon" />
            <p>Facebook</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              1M
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              1M
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Instagram className="social-icon" />
            <p>Instagram</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              1M
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              1M
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Youtube className="social-icon" />
            <p>Youtube</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              1M
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              1M
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Tiktok className="social-icon" />
            <p>Tiktok</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              1M
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              1M
              <p>Interactions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSocial;
