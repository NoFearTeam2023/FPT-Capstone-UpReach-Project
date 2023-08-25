import "./UpdateReportSocial.css";
import React from "react";
import { ReactComponent as Facebook } from "../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../../Assets/Icon/Tiktok.svg";
import { EditOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import roundNumber from "../../roundNumber";

const UpdateReportSocial = ({
  influInfo,
  setInfluInfo,
  setIsChange,
  mokPreviewInflu,
}) => {
  const [edit, setEdit] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const handleSubmit = () => {
    if (
      (edit === "facebook follower" &&
        parseInt(influInfo?.influencerFollowFb) <= 0) ||
      (edit === "instagram follower" &&
        parseInt(influInfo?.influencerFollowInsta) <= 0) ||
      (edit === "youtube follower" &&
        parseInt(influInfo?.influencerFollowYoutube) <= 0) ||
      (edit === "tiktok follower" &&
        parseInt(influInfo?.influencerFollowTikTok) <= 0) ||
      (edit === "facebook interaction" &&
        parseInt(influInfo?.influencerInteractionFb) <= 0) ||
      (edit === "instagram interaction" &&
        parseInt(influInfo?.influencerInteractionInsta) <= 0) ||
      (edit === "youtube interaction" &&
        parseInt(influInfo?.influencerInteractionYoutube) <= 0) ||
      (edit === "tiktok interaction" &&
        parseInt(influInfo?.influencerInteractionTiktok) <= 0) ||
      (edit === "engagement" &&
        parseInt(influInfo?.influencerEngagement) <= 0) ||
      (edit === "engagement" &&
        parseInt(influInfo?.influencerEngagement) > 100) ||
      (edit === "cost estimate from" &&
        parseInt(influInfo?.influencerCostEstimateFrom) <= 0) ||
      (edit === "cost estimate from" &&
        parseInt(influInfo?.influencerCostEstimateFrom) >
          parseInt(influInfo?.influencerCostEstimateTo)) ||
      (edit === "cost estimate to" &&
        parseInt(influInfo?.influencerCostEstimateTo) <= 0) ||
      (edit === "cost estimate to" &&
        parseInt(influInfo?.influencerCostEstimateFrom) >
          parseInt(influInfo?.influencerCostEstimateTo)) ||
      (edit === "post per week" &&
        parseInt(influInfo?.influencerPostsPerWeek) <= 0)
    ) {
      setIsError(true);
    } else {
      setEdit("");
    }
  };

  React.useEffect(() => {
    if (
      influInfo?.influencerFollowFb == mokPreviewInflu?.influencerFollowFb &&
      influInfo?.influencerFollowInsta ==
        mokPreviewInflu?.influencerFollowInsta &&
      influInfo?.influencerFollowYoutube ==
        mokPreviewInflu?.influencerFollowYoutube &&
      influInfo?.influencerFollowTikTok ==
        mokPreviewInflu?.influencerFollowTikTok &&
      influInfo?.influencerInteractionFb ==
        mokPreviewInflu?.influencerInteractionFb &&
      influInfo?.influencerInteractionInsta ==
        mokPreviewInflu?.influencerInteractionInsta &&
      influInfo?.influencerInteractionYoutube ==
        mokPreviewInflu?.influencerInteractionYoutube &&
      influInfo?.influencerInteractionTiktok ==
        mokPreviewInflu?.influencerInteractionTiktok &&
      influInfo?.influencerEngagement ==
        mokPreviewInflu?.influencerEngagement &&
      influInfo?.influencerCostEstimateFrom ==
        mokPreviewInflu?.influencerCostEstimateFrom &&
      influInfo?.influencerCostEstimateTo ==
        mokPreviewInflu?.influencerCostEstimateTo &&
      influInfo?.influencerPostsPerWeek ==
        mokPreviewInflu?.influencerPostsPerWeek
    ) {
      setIsChange(false);
    } else {
      setIsChange(true);
    }
  }, [
    influInfo?.influencerFollowFb,
    influInfo?.influencerFollowInsta,
    influInfo?.influencerFollowYoutube,
    influInfo?.influencerFollowTikTok,
    influInfo?.influencerInteractionFb,
    influInfo?.influencerInteractionInsta,
    influInfo?.influencerInteractionYoutube,
    influInfo?.influencerInteractionTiktok,
    influInfo?.influencerEngagement,
    influInfo?.influencerCostEstimateFrom,
    influInfo?.influencerCostEstimateTo,
    influInfo?.influencerPostsPerWeek,
  ]);

  React.useEffect(() => {
    let sumFollowers = 0;

    if (influInfo?.influencerFollowFb) {
      sumFollowers += parseInt(influInfo?.influencerFollowFb);
    }
    if (influInfo?.influencerFollowInsta) {
      sumFollowers += parseInt(influInfo?.influencerFollowInsta);
    }
    if (influInfo?.influencerFollowTikTok) {
      sumFollowers += parseInt(influInfo?.influencerFollowTikTok);
    }
    if (influInfo?.influencerFollowYoutube) {
      sumFollowers += parseInt(influInfo?.influencerFollowYoutube);
    }
    influInfo.influencerFollowers = sumFollowers;
  }, [
    influInfo,
    influInfo?.influencerFollowFb,
    influInfo?.influencerFollowInsta,
    influInfo?.influencerFollowTikTok,
    influInfo?.influencerFollowYoutube,
  ]);

  return (
    <>
      <div className="update-report-social-layout">
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
                      influInfo?.influencerFollowers || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerFollowers || 0)}
                    </span>
                  </Tooltip>
                </div>
              </div>

              <div className="report-general-content-item">
                <p>Engagement:</p>

                {edit === "engagement" ? (
                  <Input
                    onChange={(e) => {
                      setInfluInfo({
                        ...influInfo,
                        influencerEngagement: e.target.value,
                      });

                      setIsError(false);
                    }}
                    onBlur={handleSubmit}
                    type="number"
                    onPressEnter={handleSubmit}
                    value={influInfo?.influencerEngagement || 0}
                    maxLength={16}
                    style={{ width: "100px" }}
                    autoFocus
                    status={isError ? "error" : ""}
                  />
                ) : (
                  <div className="interact-block">
                    <Tooltip
                      placement="top"
                      title={Number(
                        influInfo?.influencerEngagement || 0
                      ).toLocaleString("vi-VN")}
                    >
                      <span className="text-tooltip">
                        {roundNumber(influInfo?.influencerEngagement || 0)}%
                      </span>
                    </Tooltip>
                    <EditOutlined
                      onClick={() => {
                        setEdit("engagement");
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="report-general-content-right">
              <div className="report-general-content-item">
                <div className="cost-estimate-edit-from">
                  <p>Cost estimate:</p>

                  {edit === "cost estimate from" ? (
                    <Input
                      disabled={edit !== "cost estimate from"}
                      onChange={(e) => {
                        setInfluInfo({
                          ...influInfo,
                          influencerCostEstimateFrom: e.target.value,
                        });

                        setIsError(false);
                      }}
                      onBlur={handleSubmit}
                      type="number"
                      onPressEnter={handleSubmit}
                      value={influInfo?.influencerCostEstimateFrom || 0}
                      maxLength={16}
                      style={{ width: "135px" }}
                      autoFocus
                      status={isError ? "error" : ""}
                    />
                  ) : (
                    <div className="cost-estimate-block">
                      <Tooltip
                        placement="top"
                        title={Number(
                          influInfo?.influencerCostEstimateFrom || 0
                        ).toLocaleString("vi-VN")}
                      >
                        <span className="text-tooltip">
                          {influInfo?.influencerCostEstimateFrom?.length > 8
                            ? `${Number(
                                influInfo?.influencerCostEstimateFrom || 0
                              )
                                ?.toLocaleString("vi-VN")
                                ?.slice(0, 10)}...`
                            : Number(
                                influInfo?.influencerCostEstimateFrom || 0
                              )?.toLocaleString("vi-VN")}
                        </span>
                      </Tooltip>
                      <EditOutlined
                        onClick={() => {
                          setEdit("cost estimate from");
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="cost-estimate-edit-to">
                  <p>to</p>
                  {edit === "cost estimate to" ? (
                    <Input
                      onChange={(e) => {
                        setInfluInfo({
                          ...influInfo,
                          influencerCostEstimateTo: e.target.value,
                        });

                        setIsError(false);
                      }}
                      onBlur={handleSubmit}
                      type="number"
                      onPressEnter={handleSubmit}
                      value={influInfo?.influencerCostEstimateTo || 0}
                      maxLength={16}
                      style={{ width: "135px" }}
                      autoFocus
                      status={isError ? "error" : ""}
                    />
                  ) : (
                    <div className="cost-estimate-block">
                      <Tooltip
                        placement="top"
                        title={Number(
                          influInfo?.influencerCostEstimateTo
                        ).toLocaleString("vi-VN")}
                      >
                        <span className="text-tooltip">
                          {influInfo?.influencerCostEstimateTo?.length > 8
                            ? `${Number(
                                influInfo?.influencerCostEstimateTo || 0
                              )
                                ?.toLocaleString("vi-VN")
                                ?.slice(0, 10)}...`
                            : Number(
                                influInfo?.influencerCostEstimateTo || 0
                              )?.toLocaleString("vi-VN")}
                        </span>
                      </Tooltip>
                      <EditOutlined
                        onClick={() => {
                          setEdit("cost estimate to");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="report-general-content-item">
                <p>Post per week:</p>

                {edit === "post per week" ? (
                  <Input
                    onChange={(e) => {
                      setInfluInfo({
                        ...influInfo,
                        influencerPostsPerWeek: e.target.value,
                      });

                      setIsError(false);
                    }}
                    onBlur={handleSubmit}
                    type="number"
                    onPressEnter={handleSubmit}
                    value={influInfo?.influencerPostsPerWeek || 0}
                    maxLength={16}
                    style={{ width: "100px" }}
                    autoFocus
                    status={isError ? "error" : ""}
                  />
                ) : (
                  <div className="interact-block">
                    <Tooltip
                      placement="top"
                      title={Number(
                        influInfo?.influencerPostsPerWeek || 0
                      ).toLocaleString("vi-VN")}
                    >
                      <span className="text-tooltip">
                        {roundNumber(influInfo?.influencerPostsPerWeek || 0)}
                      </span>
                    </Tooltip>
                    <EditOutlined
                      onClick={() => {
                        setEdit("post per week");
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="report-social-title">SOCIAL</p>
        <div className="report-social">
          <div className="social-icon-title">
            <Facebook className="social-icon" />
            <a
              href={mokPreviewInflu?.influencerLinkFb}
              target="_blank"
              rel="noreferrer"
            >
              {mokPreviewInflu?.influencerLinkFb === null
                ? "Facebook"
                : mokPreviewInflu?.influencerLinkFb?.length <= 32
                ? mokPreviewInflu?.influencerLinkFb
                : mokPreviewInflu?.influencerLinkFb?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {edit === "facebook follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerFollowFb: e.target.value,
                    });

                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.influencerFollowFb || 0}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerFollowFb || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerFollowFb || 0)}
                    </span>
                  </Tooltip>
                  <EditOutlined
                    onClick={() => {
                      setEdit("facebook follower");
                    }}
                  />
                </div>
              )}

              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              {edit === "facebook interaction" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerInteractionFb: e.target.value,
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo?.influencerInteractionFb || 0}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerInteractionFb || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerInteractionFb || 0)}
                    </span>
                  </Tooltip>
                  <EditOutlined
                    onClick={() => {
                      setEdit("facebook interaction");
                    }}
                  />
                </div>
              )}
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Instagram className="social-icon" />
            <a
              href={mokPreviewInflu?.influencerLinkInsta}
              target="_blank"
              rel="noreferrer"
            >
              {mokPreviewInflu?.influencerLinkInsta === null
                ? "Instagram"
                : mokPreviewInflu?.influencerLinkInsta?.length <= 32
                ? mokPreviewInflu?.influencerLinkInsta
                : mokPreviewInflu?.influencerLinkInsta?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {edit === "instagram follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerFollowInsta: e.target.value,
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo?.influencerFollowInsta || 0}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerFollowInsta || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerFollowInsta || 0)}
                    </span>
                  </Tooltip>

                  <EditOutlined
                    onClick={() => {
                      setEdit("instagram follower");
                    }}
                  />
                </div>
              )}
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              {edit === "instagram interaction" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerInteractionInsta: e.target.value,
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo?.influencerInteractionInsta || 0}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerInteractionInsta || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerInteractionInsta || 0)}
                    </span>
                  </Tooltip>
                  <EditOutlined
                    onClick={() => {
                      setEdit("instagram interaction");
                    }}
                  />
                </div>
              )}
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Youtube className="social-icon" />
            <a
              href={mokPreviewInflu?.influencerLinkYoutube}
              target="_blank"
              rel="noreferrer"
            >
              {mokPreviewInflu?.influencerLinkYoutube === null
                ? "Youtube"
                : mokPreviewInflu?.influencerLinkYoutube?.length <= 32
                ? mokPreviewInflu?.influencerLinkYoutube
                : mokPreviewInflu?.influencerLinkYoutube?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {edit === "youtube follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerFollowYoutube: e.target.value,
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo?.influencerFollowYoutube || 0}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerFollowYoutube || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerFollowYoutube || 0)}
                    </span>
                  </Tooltip>
                  <EditOutlined
                    onClick={() => {
                      setEdit("youtube follower");
                    }}
                  />
                </div>
              )}
              <p>Subscribes</p>
            </div>
            <div className="follower-interaction">
              {edit === "youtube interaction" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerInteractionYoutube: e.target.value,
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo?.influencerInteractionYoutube}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerInteractionYoutube || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(
                        influInfo?.influencerInteractionYoutube || 0
                      )}
                    </span>
                  </Tooltip>
                  <EditOutlined
                    onClick={() => {
                      setEdit("youtube interaction");
                    }}
                  />
                </div>
              )}
              <p>Interactions</p>
            </div>
          </div>
        </div>
        <div className="report-social">
          <div className="social-icon-title">
            <Tiktok className="social-icon" />
            <a
              href={mokPreviewInflu?.influencerLinkTiktok}
              target="_blank"
              rel="noreferrer"
            >
              {mokPreviewInflu?.influencerLinkTiktok === null
                ? "Tiktok"
                : mokPreviewInflu?.influencerLinkTiktok?.length <= 32
                ? mokPreviewInflu?.influencerLinkTiktok
                : mokPreviewInflu?.influencerLinkTiktok?.slice(0, 32) + "..."}
            </a>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {edit === "tiktok follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerFollowTikTok: e.target.value,
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo?.influencerFollowTikTok || 0}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerFollowTikTok || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerFollowTikTok || 0)}
                    </span>
                  </Tooltip>
                  <EditOutlined
                    onClick={() => {
                      setEdit("tiktok follower");
                    }}
                  />
                </div>
              )}
              <p>Followers</p>
            </div>
            <div className="follower-interaction">
              {edit === "tiktok interaction" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      influencerInteractionTiktok: e.target.value,
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo?.influencerInteractionTiktok || 0}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(
                      influInfo?.influencerInteractionTiktok || 0
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo?.influencerInteractionTiktok || 0)}
                    </span>
                  </Tooltip>
                  <EditOutlined
                    onClick={() => {
                      setEdit("tiktok interaction");
                    }}
                  />
                </div>
              )}
              <p>Interactions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateReportSocial;
