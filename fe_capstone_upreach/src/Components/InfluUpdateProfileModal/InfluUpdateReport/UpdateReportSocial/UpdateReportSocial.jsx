import "./UpdateReportSocial.css";
import React, { useEffect } from "react";
import { ReactComponent as Facebook } from "../../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../../Assets/Icon/Tiktok.svg";
import { EditOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import roundNumber from "../../roundNumber";
import { useInfluStore } from "../../../../Stores/influencer";
const UpdateReportSocial = ({ influInfo, setInfluInfo, setIsChange }) => {
  const [edit, setEdit] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [influ] = useInfluStore((state) => [state.influ]);
  const handleSubmit = () => {
    if (
      (edit === "facebook follower" && influInfo.facebook.followers === "") ||
      (edit === "instagram follower" && influInfo.instagram.followers === "") ||
      (edit === "youtube follower" && influInfo.youtube.followers === "") ||
      (edit === "tiktok follower" && influInfo.tiktok.followers === "") ||
      (edit === "facebook interaction" &&
        influInfo.facebook.interactions === "") ||
      (edit === "instagram interaction" &&
        influInfo.instagram.interactions === "") ||
      (edit === "youtube interaction" &&
        influInfo.youtube.interactions === "") ||
      (edit === "tiktok interaction" && influInfo.tiktok.interactions === "")
    ) {
      setIsError(true);
    } else {
      console.log(influInfo);

      setEdit("");
    }
  };

  React.useLayoutEffect(() => {
    if (
      influInfo.facebook.followers == influ.facebook.followers &&
      influInfo.instagram.followers == influ.instagram.followers &&
      influInfo.youtube.followers == influ.youtube.followers &&
      influInfo.tiktok.followers == influ.tiktok.followers &&
      influInfo.facebook.interactions == influ.facebook.interactions &&
      influInfo.instagram.interactions == influ.instagram.interactions &&
      influInfo.youtube.interactions == influ.youtube.interactions &&
      influInfo.tiktok.interactions == influ.tiktok.interactions
    ) {
      setIsChange(false);
    } else setIsChange(true);
  }, [influInfo]);
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
              {edit === "facebook follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      facebook: {
                        ...influInfo.facebook,
                        followers: e.target.value,
                      },
                    });

                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.facebook.followers}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(influInfo.facebook.followers).toLocaleString(
                      "vi-VN"
                    )}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.facebook.followers)}
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
                      facebook: {
                        ...influInfo.facebook,
                        interactions: e.target.value,
                      },
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.facebook.interactions}
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
                      influInfo.facebook.interactions
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.facebook.interactions)}
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
            <p>Instagram</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {edit === "instagram follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      instagram: {
                        ...influInfo.instagram,
                        followers: e.target.value,
                      },
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={Number(influInfo.instagram.followers).toLocaleString(
                    "vi-VN"
                  )}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(influInfo.instagram.followers).toLocaleString(
                      "vi-VN"
                    )}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.instagram.followers)}
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
                      instagram: {
                        ...influInfo.instagram,
                        interactions: e.target.value,
                      },
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.instagram.interactions}
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
                      influInfo.instagram.interactions
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.instagram.interactions)}
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
            <p>Youtube</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {edit === "youtube follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      youtube: {
                        ...influInfo.youtube,
                        followers: e.target.value,
                      },
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.youtube.followers}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(influInfo.youtube.followers).toLocaleString(
                      "vi-VN"
                    )}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.youtube.followers)}
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
                      youtube: {
                        ...influInfo.youtube,
                        interactions: e.target.value,
                      },
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.youtube.interactions}
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
                      influInfo.youtube.interactions
                    ).toLocaleString("vi-VN")}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.youtube.interactions)}
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
            <p>Tiktok</p>
          </div>
          <div className="cover-follower-interaction">
            <div className="follower-interaction">
              {edit === "tiktok follower" ? (
                <Input
                  onChange={(e) => {
                    setInfluInfo({
                      ...influInfo,
                      tiktok: {
                        ...influInfo.tiktok,
                        followers: e.target.value,
                      },
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.tiktok.followers}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(influInfo.tiktok.followers).toLocaleString(
                      "vi-VN"
                    )}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.tiktok.followers)}
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
                      tiktok: {
                        ...influInfo.tiktok,
                        interactions: e.target.value,
                      },
                    });
                    setIsError(false);
                  }}
                  onBlur={handleSubmit}
                  type="number"
                  onPressEnter={handleSubmit}
                  value={influInfo.tiktok.interactions}
                  maxLength={16}
                  style={{ width: "100px" }}
                  autoFocus
                  status={isError ? "error" : ""}
                />
              ) : (
                <div className="interact-block">
                  <Tooltip
                    placement="top"
                    title={Number(influInfo.tiktok.interactions).toLocaleString(
                      "vi-VN"
                    )}
                  >
                    <span className="text-tooltip">
                      {roundNumber(influInfo.tiktok.interactions)}
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
