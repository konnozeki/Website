// VideoComponent.js
import CommentComponent from "./CommentComponent";
import React, { useState } from "react";
import { Button } from "antd";

const VideoComponent = ({ EpisodeList, isVideoVisible, setVideoVisible }) => {
  function convertToEmbedUrl(youtubeUrl) {
    // Lấy mã video từ URL YouTube
    const videoId = extractVideoId(youtubeUrl);

    if (videoId) {
      // Tạo URL nhúng
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return embedUrl;
    } else {
      // Trả về null nếu không thể trích xuất mã video
      return null;
    }
  }

  // Hàm để trích xuất mã video từ URL YouTube
  function extractVideoId(url) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);

    // Mảng thứ 2 trong kết quả là mã video
    return match && match[1] ? match[1] : null;
  }

  // Sử dụng hàm để chuyển đổi URL



  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const Link = EpisodeList[selectedEpisode].link;
  const embedUrl = convertToEmbedUrl(Link);
  console.log(embedUrl);
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
        <h1 style={{ display: "block", color: "white" }}>Xem phim</h1>
      </div>
      <div style={{ display: "block", height: "80vh" }}>
        <iframe
          width={"100%"}
          height={"100%"}
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ display: "inline-block", margin: "auto" }}
        ></iframe>
      </div>
      <div>
        <h2 style={{ color: "white" }}>Chọn tập phim:</h2>
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
