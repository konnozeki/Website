//Chứa thông tin phim, khung xem phim, bình luận
//Giao diện "Xem phim/ Xem trailer - WATCH - User" trong giao diện 31-46

import { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Comment from "./Comment";



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
  Avatar
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



function Watch() {
  //////////////////////////////
  const ExampleComment = ({ children }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Han Solo</a>}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
      }
    >
      {children}
    </Comment>
  );
  //////////////////////////////
  //dữ liệu
  const movie = {
    Title: "Spiderman",
    Ratings: "4",
    Genre: ["Thriller", "Action", "Adventure"],
    Description:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    Link: "https://www.youtube.com/embed/5n8bMuZGipU?si=-6SzjjJecj8vrv-u",
    TrailerLink: "https://www.youtube.com/embed/t06RUxPbp_c?si=Jl5SOTapUl3ywXbN",
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
  };
  //của nút add favorite
  const [isFilled, setIsFilled] = useState(false);
  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  //của nút watch movie
  const myRef = useRef(null);
  const handleButtonClick = () => {
    // Sử dụng ReactDOM để tìm phần tử DOM và thực hiện scroll
    const node = ReactDOM.findDOMNode(myRef.current);
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  };

  //của nút xem trailer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="movie-container">
        <div className="movie-poster-container">
          <img src={movie.Poster} alt="movie poster" className="movie-poster" />
        </div>
        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <div>
            <Rate defaultValue={movie.Ratings} />
          </div>
          {movie.Genre.map((Genre, index) => (
            <Tag key={index} color="red">
              {Genre}
            </Tag>
          ))}
          <h2>Description</h2>
          <p>{movie.Description}</p>
          <Space>
            <Button
              className="custombutton"
              type="primary"
              danger
              icon={isFilled ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleClick}
              style={{ width: "60px", height: "60px", fontSize: "16px" }}
            >
              {isFilled}
            </Button>
            <Button
              className="custombutton"
              type="primary"
              danger
              icon={<CaretRightOutlined />}
              style={{ width: "180px", height: "60px", fontSize: "16px" }}
              onClick={showModal}
            >
              Trailer
            </Button>
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
          <h2 icon={<LineOutlined />}> </h2>
          <div>
            <Carousel
              arrows
              autoplay
              style={{ height: "35vh", width: "45vw" }}
              slidesToShow={4}
            >
              {movie.Actors.map((actor, index) => (
                <div
                  key={index}
                  style={{
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={actor.image}
                    style={{
                      height: "35vh",
                      width: "12vw",
                      objectFit: "cover",
                    }}
                  />
                  <span>{actor.name}</span>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="watch-container" ref={myRef}>
        <h1>Xem phim</h1>
        <br />
      </div>
      <iframe
        width="80%"
        height="600vh"
        src={movie.Link}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style={{ display: "block", margin: "auto" }}
      ></iframe>
      <br />
      <br />
      <br />
      <div className="suggestions">
        <h1>YOU MAY ALSO LIKE</h1>
        <Carousel
          arrows
          autoplay
          style={{ height: "35vh", width: "45vw" }}
          slidesToShow={4}
        >
          {movie.Actors.map((actor, index) => (
            <div
              key={index}
              style={{
                height: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src={actor.image}
                style={{
                  height: "35vh",
                  width: "12vw",
                  objectFit: "cover",
                }}
              />
              <span>{actor.name}</span>
            </div>
          ))}
        </Carousel>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="comments">
        <h1>USER COMMENTS</h1>
        <ExampleComment>
      <ExampleComment>
                
                </ExampleComment>
                <ExampleComment>
                
      </ExampleComment>
      <ExampleComment>
                
      </ExampleComment>
      </ExampleComment>
      </div>

      <Modal title="Trailer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
       width={1200} height={10}  style={{ top: 20 }}
      >
      <iframe
        width="100%"
        height="550vh"
        src={movie.TrailerLink}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style={{ display: "block", margin: "auto" }}
      ></iframe>
      </Modal>

      
    </div>
    
  );
}

export default Watch;
