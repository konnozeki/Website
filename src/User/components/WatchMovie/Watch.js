//Chứa thông tin phim, khung xem phim, bình luận
//Giao diện "Xem phim/ Xem trailer - WATCH - User" trong giao diện 31-46

import { useState, useRef } from "react";
import ReactDOM from "react-dom";

import ActorCarousel from "./ActorCarousel";
import CommentComponent from "./CommentComponent";
import FavoriteButton from "./FavoriteButton";
import TrailerButton from "./TrailerButton";
import VideoComponent from "./VideoComponent";

import {
  Rate,
  Divider,
  Space,
  Tag,
  Button,
  Image,
  Carousel,
  Typography,
  Anchor,
  Modal,
  notification,
  message,
} from "antd";
import {
  CaretRightOutlined,
  HeartOutlined,
  HeartFilled,
  LineOutlined,
} from "@ant-design/icons";
import "./Watch.scss";

import posterimage from "./img.jpg";
import image1 from "./1.webp";
import image2 from "./2.jpg";
import image3 from "./3.jpg";
import image4 from "./4.jpg";
import image5 from "./5.jpg";
import image6 from "./6.jpg";

const Watch = () => {
  //dữ liệu
  const movie = {
    Title: "Spiderman",
    Ratings: "2.5",
    Genre: ["Thriller", "Action", "Adventure"],
    Description:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    TrailerLink:
      "https://www.youtube.com/embed/t06RUxPbp_c?si=Jl5SOTapUl3ywXbN",
    Poster: posterimage,
    Actors: [
      { name: "Tobey Maguire", image: image1 },
      { name: "Willem Dafoe", image: image2 },
      { name: "Kirsten Dunst", image: image3 },
      { name: "James Franco", image: image4 },
      { name: "Cliff Robertson", image: image5 },
      { name: "Rosemary Harris", image: image6 },
      // Thêm các diễn viên khác theo cùng mẫu
    ],
    Episode_List: [
      {
        Episode: 1,
        Link: "https://www.youtube.com/embed/phjbaDTEikE?si=MEALoJhUMQ5QNd_j",
      },
      {
        Episode: 2,
        Link: "https://www.youtube.com/embed/W2tSIxRG7Mk?si=7NdPRzCGw-e8xUiD",
      },
      {
        Episode: 3,
        Link: "https://www.youtube.com/embed/z6LzHsVjaZg?si=0f2-bK79WkmhEjOO",
      },
      {
        Episode: 4,
        Link: "https://www.youtube.com/embed/jlhd38UFBC8?si=UDpTUIIlslGpbtNG",
      },
    ],
  };
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  //của nút watch movie
  const myRef = useRef(null);
  const handleButtonClick = () => {
    // Sử dụng ReactDOM để tìm phần tử DOM và thực hiện scroll
    const node = ReactDOM.findDOMNode(myRef.current);
    setIsVideoVisible(true);
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  const [rating, setRating] = useState(movie.Ratings);

  const handleRateChange = (value) => {
    // Xử lý sự kiện khi người dùng thay đổi đánh giá
    console.log('New rating:', value);
    setRating(value);
  };
  return (
    <div>
      <div className="info-container">
        <div className="movie-poster-container">
          <img src={movie.Poster} alt="movie poster" className="movie-poster" />
        </div>
        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <div>
            <Rate allowHalf defaultValue={movie.Ratings} onChange={handleRateChange}/>
            <span style={{ marginLeft: '10px' }}>{movie.Ratings}</span>
          </div>
          {movie.Genre.map((Genre, index) => (
            <Tag key={index} color="red">
              {Genre}
            </Tag>
          ))}
          <h2>Description</h2>
          <p>{movie.Description}</p>
          <Space>
            <FavoriteButton />

            <TrailerButton TrailerLink={movie.TrailerLink} />

            <Button
              type="primary"
              danger
              icon={<CaretRightOutlined />}
              style={{ width: "180px", height: "60px", fontSize: "16px" }}
              onClick={handleButtonClick}
            >
              WATCH NOW
            </Button>
          </Space>
          <h2>Cast</h2>
          <div>
            <ActorCarousel actors={movie.Actors} />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="watch-container" ref={myRef}>
        
        <VideoComponent
          EpisodeList={movie.Episode_List}
          isVideoVisible={isVideoVisible}
          setIsVideoVisible={setIsVideoVisible}
        />
      </div>
      <br />
      <br />
      <br />
      <div className="suggestions">//you may also like</div>
      <br />
      <br />
      <br />
      <br />

      <div className="CommentSection">
        <h1>USER COMMENTS</h1>
        <CommentComponent>
          <CommentComponent></CommentComponent>
          <CommentComponent></CommentComponent>
          <CommentComponent></CommentComponent>
          <CommentComponent></CommentComponent>
        </CommentComponent>
      </div>
    </div>
  );
};

export default Watch;
