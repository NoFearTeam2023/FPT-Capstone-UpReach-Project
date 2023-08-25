import "./ReportSocial.css";
import { ReactComponent as Facebook } from "../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../../Assets/Icon/Tiktok.svg";
import { Tooltip } from "antd";
import roundNumber from "../../../InfluUpdateProfileModal/roundNumber";
const ReportSocial = ({ influInfo }) => {
  return (
    <>
      <div className="report-social-layout">
        <div className="report-general">
          <p className="report-general-title">GENERAL</p>
          <div className="report-general-contents">
            <div className="report-general-content-left">
              <div className="report-general-content-item">
                <p>Followers:</p>
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerFollowers
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerFollowers)}
                    </span>
                  </Tooltip>
                </div>
              </div>

              <div className="report-general-content-item">
                <p>Engagement:</p>
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerEngagement
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerEngagement)}%
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="report-general-content-right">
              <div className="report-general-content-item">
                <div className="cost-estimate-edit-from">
                  <p>Cost estimate:</p>

                  <div className="cost-estimate-block">
                    <Tooltip
                      placement="top"
                      title={Number(
                        influInfo?.influencerCostEstimateFrom
                      ).toLocaleString("vi-VN")}
                    >
                      <span className="text-tooltip">
                        {influInfo?.influencerCostEstimateFrom?.length > 8
                          ? `${Number(influInfo?.influencerCostEstimateFrom)
                              .toLocaleString("vi-VN")
                              ?.slice(0, 10)}...`
                          : Number(
                              influInfo?.influencerCostEstimateFrom
                            ).toLocaleString("vi-VN")}
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div className="cost-estimate-edit-to">
                  <p>to</p>

                  <div className="cost-estimate-block">
                    <Tooltip
                      placement="top"
                      title={Number(
                        influInfo?.influencerCostEstimateTo
                      ).toLocaleString("vi-VN")}
                    >
                      <span className="text-tooltip">
                        {influInfo?.influencerCostEstimateTo?.length > 8
                          ? `${Number(influInfo?.influencerCostEstimateTo)
                              .toLocaleString("vi-VN")
                              ?.slice(0, 10)}...`
                          : Number(
                              influInfo?.influencerCostEstimateTo
                            ).toLocaleString("vi-VN")}
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="report-general-content-item">
                <p>Post per week:</p>

                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerPostsPerWeek
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerPostsPerWeek)}
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Facebook className="social-icon" />
            <a
              href={influInfo?.influencerLinkFb}
              target="_blank"
              rel="noreferrer"
            >
              {influInfo?.influencerLinkFb === null
                ? "Facebook"
                : influInfo?.influencerLinkFb?.length <= 32
                ? influInfo?.influencerLinkFb
                : influInfo?.influencerLinkFb?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {(parseInt(influInfo?.influencerFollowFb) / 1000).toFixed(1) +
                "K"}
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              {(parseInt(influInfo?.influencerInteractionFb) / 1000).toFixed(
                1
              ) + "K"}
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Instagram className="social-icon" />
            <a
              href={influInfo?.influencerLinkInsta}
              target="_blank"
              rel="noreferrer"
            >
              {influInfo?.influencerLinkInsta === null
                ? "Instagram"
                : influInfo?.influencerLinkInsta?.length <= 32
                ? influInfo?.influencerLinkInsta
                : influInfo?.influencerLinkInsta?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {(parseInt(influInfo?.influencerFollowInsta) / 1000).toFixed(1) +
                "K"}
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              {(parseInt(influInfo?.influencerInteractionInsta) / 1000).toFixed(
                1
              ) + "K"}
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Youtube className="social-icon" />
            <a
              href={influInfo?.influencerLinkYoutube}
              target="_blank"
              rel="noreferrer"
            >
              {influInfo?.influencerLinkYoutube === null
                ? "Youtube"
                : influInfo?.influencerLinkYoutube?.length <= 32
                ? influInfo?.influencerLinkYoutube
                : influInfo?.influencerLinkYoutube?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {(parseInt(influInfo?.influencerFollowYoutube) / 1000).toFixed(
                1
              ) + "K"}
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              {(
                parseInt(influInfo?.influencerInteractionYoutube) / 1000
              ).toFixed(1) + "K"}
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Tiktok className="social-icon" />
            <a
              href={influInfo?.influencerLinkTiktok}
              target="_blank"
              rel="noreferrer"
            >
              {influInfo?.influencerLinkTiktok === null
                ? "Tiktok"
                : influInfo?.influencerLinkTiktok?.length <= 32
                ? influInfo?.influencerLinkTiktok
                : influInfo?.influencerLinkTiktok?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {(parseInt(influInfo?.influencerFollowTikTok) / 1000).toFixed(1) +
                "K"}
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              {(
                parseInt(influInfo?.influencerInteractionTiktok) / 1000
              ).toFixed(1) + "K"}
              <p>Interactions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSocial;
