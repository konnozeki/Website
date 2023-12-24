//Chứa thông tin phim, khung xem phim, bình luận
//Giao diện "Xem phim/ Xem trailer - WATCH - User" trong giao diện 31-46

import { useState, useRef } from "react";
import ReactDOM from "react-dom";

import ActorCarousel from "./ActorCarousel";
import CommentComponent from "./CommentComponent";
import FavoriteButton from "./FavoriteButton";
import TrailerButton from "./TrailerButton";
import VideoComponent from "./VideoComponent";
import CommentDropdown from "./CommentDropdown";
import {
  Rate,
  Divider,
  Space,
  Tag,
  Button,
  Input,
  Avatar,
} from "antd";
import {
  CaretRightOutlined,
} from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";
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
      { name: "Tobey Maguire", image: image1, link: "./Actor" },
      { name: "Willem Dafoe", image: image2, link: "./Actor" },
      { name: "Kirsten Dunst", image: image3, link: "./Actor" },
      { name: "James Franco", image: image4, link: "./Actor" },
      { name: "Cliff Robertson", image: image5, link: "./Actor" },
      { name: "Rosemary Harris", image: image6, link: "./Actor" },
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

  //dữ liệu comment
  const commentFilm = {
    comments: [
      {
        id: 1,
        user: {
          name: "NguyenVanA",
          avatar: "",
        },
        parent_comment: null,
        content: "Bộ phim hay quá!",
        time: "2023-12-24T12:30:45Z",
        likes: 10,
      },
      {
        id: 2,
        user: {
          name: "TranThiB",
          avatar: "",
        },
        parent_comment: 1,
        content: "Đúng là rất hay, tôi đã xem 2 lần rồi!",
        time: "2023-12-24T13:15:20Z",
        likes: 5,
      },
      {
        id: 3,
        user: {
          name: "LeVanC",
          avatar: "",
        },
        parent_comment: 1,
        content: "Mình thấy nó không hợp khẩu vị mình lắm",
        time: "2023-12-24T14:05:10Z",
        likes: 2,
      },
      {
        id: 4,
        user: {
          name: "NguyenVanD",
          avatar: "",
        },
        parent_comment: null,
        content: "Lần thứ 3 sẽ còn thú vị hơn đó!",
        time: "2023-12-24T15:00:55Z",
        likes: 8,
      },
      {
        id: 5,
        user: {
          name: "NguyenVanD",
          avatar: "",
        },
        parent_comment: 4,
        content: "Lần thứ 3 sẽ còn thú vị hơn đó!",
        time: "2023-12-24T15:00:55Z",
        likes: 3,
      },
      {
        id: 6,
        user: {
          name: "NguyenVanD",
          avatar: "",
        },
        parent_comment: 4,
        content: "Lần thứ 3 sẽ còn thú vị hơn đó!",
        time: "2023-12-24T15:00:55Z",
        likes: 1,
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
    console.log("New rating:", value);
    setRating(value);
  };

  //của nút addcomment
  const [replyToID, setReplyToID] = useState(null);
  const [comments, setComments] = useState(commentFilm.comments);
  const [commentValue, setCommentValue] = useState("");
  const handleAddCommentButtonClick = (CommentContent) => {
    if (CommentContent !== "") {
      newComment.content = CommentContent;
      newComment.id = comments.length + 1;
      newComment.parent_comment = replyToID;
      if (replyToID === null) {
        setComments([newComment, ...comments]);
        setReplyToID(null);
      } else {
        setComments([...comments, newComment]);
      }
      setCommentValue("");
      setReplyToID(null);
      console.log(CommentContent);
    }
  };
  const newComment = {
    id: null,
    user: {
      name: "YourName",
      avatar: "YourAvatarUrl",
    },
    parent_comment: null,
    content: null,
    time: "fghfghgfh",
    likes: 0,
  };

  //của comment dropdown
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const handleSetSelectedEpisode = (episode) => {
    setSelectedEpisode(episode);
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
            <Rate
              allowHalf
              defaultValue={movie.Ratings}
              onChange={handleRateChange}
            />
            <span style={{ marginLeft: "10px" }}>{movie.Ratings}</span>
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
        <h1 style={{ display: "block" }}>USER COMMENTS</h1>

        <CommentDropdown movie={movie} />
      
        <Comment
          avatar={<Avatar src="" />}
          content={
            <Input.TextArea
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              style={{ width: "100%" }}
              rows={4}
            />
          }
        />
        <Button
          onClick={() => handleAddCommentButtonClick(commentValue)}
          loading={0}
          style={{ marginLeft: "44px" }}
        >
          Add Comment
        </Button>
        <br />
        <br />

        <CommentComponent
          key={comments.id}
          comments={comments}
          setReplyToID={setReplyToID}
          handleAddCommentButtonClick={handleAddCommentButtonClick}
        />
        
      </div>
    </div>
  );
};

export default Watch;
