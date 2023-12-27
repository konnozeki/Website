//Chứa thông tin phim, khung xem phim, bình luận
//Giao diện "Xem phim/ Xem trailer - WATCH - User" trong giao diện 31-46

import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import ActorCarousel from "./ActorCarousel";
import CommentComponent from "./CommentComponent";
import FavoriteButton from "./FavoriteButton";
import TrailerButton from "./TrailerButton";
import VideoComponent from "./VideoComponent";
import CommentDropdown from "./CommentDropdown";
import {
  Rate,
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



const Watch = () => {
  const { slug } = useParams();
  const [film, setFilm] = useState({
    
    film: {
      id: 0,
      name: '',
      slug: '',
      description: '',
      actors: [],
      categories: [],
      country: 0,
      poster: '',
      age_restriction: 0,
      release_date: "2000-01-01"
    },
    actors: [],
    categories: [],
    country: {
      id: 0,
      name: "Vietnam",
      flag: "https://flagcdn.com/w320/vn.png",
      slug: "vietnam"
    },
    average_rate: 0,
    film_episodes: [{
        id: 1,
        film: 1,
        slug: "song-o-ay-song-1",
        episode: 1,
        poster: "http://localhost:8000/media/film_episodes/song-o-ay-song-1.jpg",
        release_date: "2000-01-01",
        link: "https://www.youtube.com/watch?v=4DumeqZmtYU",
        description: "Đây là nội dung tập 1"
    }],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/film/${slug}/`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);





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

  const [rating, setRating] = useState(film.average_rate);

  const handleRateChange = (value) => {
    // Xử lý sự kiện khi người dùng thay đổi đánh giá
    console.log("New rating:", value);
    setRating(value);
  };

  //của nút addcomment
  const [replyToID, setReplyToID] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const handleAddCommentButtonClick = (CommentContent) => {
    if (CommentContent !== "") {
      newComment.content = CommentContent;
      newComment.parent_comment = replyToID;
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
          <img src={film.film.poster} alt="movie poster" className="movie-poster" />
        </div>
        <div className="movie-info">
          <h1 style={{fontSize: '5vh'}}>{film.film.name}</h1>
          <div>
            <Rate
              allowHalf
              defaultValue={film.average_rate}
              onChange={handleRateChange}
            />
            <span style={{ marginLeft: "10px" }}>{film.average_rate}</span>
          </div>
          {film.categories.map((Genre, index) => (
            <Tag key={index} color="red">
              {Genre.name}
            </Tag>
          ))}
          <h2 style={{fontSize: '4vh'}}>Mô tả</h2>
          <p style={{fontSize: '1rem'}}>{film.film.description}</p>
          <Space>
            <FavoriteButton />



            <Button
              type="primary"
              danger
              icon={<CaretRightOutlined />}
              style={{ width: '40vh', height: '10vh', fontSize: '3vh' }}
              onClick={handleButtonClick}
            >
              Xem ngay
            </Button>
          </Space>
          <h2>Diễn viên</h2>
          <div>
            <ActorCarousel actors={film.actors} />
          </div>
        </div>
      </div>
      <div className="watch-container" ref={myRef}>
        <VideoComponent
          EpisodeList={film.film_episodes}
          isVideoVisible={isVideoVisible}
          setIsVideoVisible={setIsVideoVisible}
        />
      </div>


      <div className="CommentSection">
        <h1 style={{ display: "block" }}>Bình luận</h1>

        <CommentDropdown film={film} />
      
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
          film = {film}
          setReplyToID={setReplyToID}
          handleAddCommentButtonClick={handleAddCommentButtonClick}
        />
        
      </div>
    </div>
  );
};

export default Watch;
