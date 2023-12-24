// VideoComponent.js
import CommentComponent from "./CommentComponent";
import React, { useState } from "react";
import { Button } from "antd";

const VideoComponent = ({ EpisodeList, isVideoVisible, setVideoVisible }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const Link = EpisodeList[selectedEpisode].Link;
  const handleEpisodeChange = (index) => {
    setSelectedEpisode(index);
  };
  const handleStop = (index) => {
    setVideoVisible(false);
  };
  return isVideoVisible ? (
    <div>
      <br />
      <div>
          <h1 style={{ display: "block" }}>Xem phim</h1>
        </div>
      <div style={{display: "block", height: "70vh"}}>
        <iframe
          width={"100%"}
          height={"100%"}
          src={Link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ display: "inline-block", margin: "auto" }}
        ></iframe>
      </div>
      <div>
        <h2>Chọn tập phim:</h2>
        {EpisodeList.map((episode, index) => (
          <Button
            key={index}
            onClick={() => handleEpisodeChange(index)}
            style={{ margin: "5px", padding: "5px", cursor: "pointer" }}
          >
            Tập {index + 1}
          </Button>
        ))}
      </div>
    </div>
  ) : null;
};

export default VideoComponent;
