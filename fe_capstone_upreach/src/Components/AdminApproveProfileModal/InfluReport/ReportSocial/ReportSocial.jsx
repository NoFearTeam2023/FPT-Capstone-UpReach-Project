import "./ReportSocial.css";
import { ReactComponent as Facebook } from "../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../../Assets/Icon/Tiktok.svg";
import { Input, Tooltip } from "antd";
import roundNumber from "../../../InfluUpdateProfileModal/roundNumber";

const ReportSocial = ({ influInfo }) => {
  return (
    <>
      <div className="approve-report-social-layout">
        <div className="report-general">
          <p className="report-general-title">GENERAL</p>
          <div className="report-general-contents">
            <div className="report-general-content-left">
              <div className="report-general-content-item">
                <p>Followers:</p>
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(influInfo?.profile?.Followers).toLocaleString(
                      "vi-VN"
                    )}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.profile?.Followers)}
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
                      influInfo?.platform?.Engagement
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.platform?.Engagement)}%
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
                        influInfo?.profile?.CostEstimateFrom
                      ).toLocaleString("vi-VN")}
                    >
                      <span className="text-tooltip">
                        {influInfo?.profile?.CostEstimateFrom?.length > 8
                          ? `${Number(influInfo?.profile?.CostEstimateFrom)
                              ?.toLocaleString("vi-VN")
                              ?.slice(0, 10)}...`
                          : Number(
                              influInfo?.profile?.CostEstimateFrom
                            )?.toLocaleString("vi-VN")}
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
                        influInfo?.profile?.CostEstimateTo
                      )?.toLocaleString("vi-VN")}
                    >
                      <span className="text-tooltip">
                        {influInfo?.profile?.CostEstimateTo?.length > 8
                          ? `${Number(influInfo?.profile?.CostEstimateTo)
                              ?.toLocaleString("vi-VN")
                              ?.slice(0, 10)}...`
                          : Number(
                              influInfo?.profile?.CostEstimateTo
                            )?.toLocaleString("vi-VN")}
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
                      influInfo?.platform?.PostsPerWeek
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.platform?.PostsPerWeek)}
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="report-social-title">SOCIAL</p>
        <div className="report-social">
          <div className="social-icon-title">
            <Facebook className="social-icon" />
            <p>Facebook</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(influInfo?.platform?.Follow_FB).toLocaleString(
                    "vi-VN"
                  )}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Follow_FB)}
                  </span>
                </Tooltip>
              </div>

              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(
                    influInfo?.platform?.Interaction_FB
                  ).toLocaleString("vi-VN")}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Interaction_FB)}
                  </span>
                </Tooltip>
              </div>

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
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(
                    influInfo?.platform?.Follow_Insta
                  )?.toLocaleString("vi-VN")}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Follow_Insta)}
                  </span>
                </Tooltip>
              </div>

              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(
                    influInfo?.platform?.Interaction_Insta
                  )?.toLocaleString("vi-VN")}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Interaction_Insta)}
                  </span>
                </Tooltip>
              </div>

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
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(
                    influInfo?.platform?.Follow_Youtube
                  ).toLocaleString("vi-VN")}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Follow_Youtube)}
                  </span>
                </Tooltip>
              </div>

              <p>Subscribes</p>
            </div>
            <div className="follower-interaction">
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(
                    influInfo?.platform?.Interaction_Youtube
                  ).toLocaleString("vi-VN")}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Interaction_Youtube)}
                  </span>
                </Tooltip>
              </div>

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
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(
                    influInfo?.platform?.Follow_TikTok
                  ).toLocaleString("vi-VN")}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Follow_TikTok)}
                  </span>
                </Tooltip>
              </div>
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              <div className="interact-block">
                <Tooltip
                  placement="top"
                  title={Number(
                    influInfo?.platform?.Interaction_Tiktok
                  ).toLocaleString("vi-VN")}
                >
                  <span className="text-tooltip">
                    {roundNumber(influInfo?.platform?.Interaction_Tiktok)}
                  </span>
                </Tooltip>
              </div>

              <p>Interactions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSocial;
