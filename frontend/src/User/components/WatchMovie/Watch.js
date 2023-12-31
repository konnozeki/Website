
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import ActorCarousel from "./ActorCarousel";
import CommentComponent from "./CommentComponent";
import FavoriteButton from "./FavoriteButton";
import VideoComponent from "./VideoComponent";
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
import { CREATE_COMMENT_FOR_FILM_API, CREATE_RATE_FILM_API, FILM_INFO_API } from "../../../api";



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
      poster: "",
      release_date: "2000-01-01",
      link: "https://www.youtube.com/watch?v=4DumeqZmtYU",
      description: "Đây là nội dung tập 1"
    }],
  });
  const fetchFilmData = async () => {
    try {
      const response = await fetch(FILM_INFO_API(slug));
      const data = await response.json();
      setFilm(data);
      setRating(data.average_rate); // Cập nhật giá trị xếp hạng khi fetch dữ liệu
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchFilmData();
  }, []);

  const [commentComponentKey, setCommentComponentKey] = useState(0); // State để làm trigger cho việc re-render





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

  const handleRateChange = async (value) => {
    setRating(value);

    try {

      const response = await fetch(CREATE_RATE_FILM_API(slug), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Authorization": `TOKEN ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rate: value // Sử dụng giá trị mới của 'value'
        })
      });

      // Nếu bạn muốn cập nhật dữ liệu ngay sau khi đánh giá, bạn có thể gọi lại fetchFilmData()
      fetchFilmData();
    } catch (error) {
      console.error("Error updating movie rate:", error);
    }

    console.log(value);
  };

  //của nút addcomment
  const [replyToID, setReplyToID] = useState(null);
  const [commentValue, setCommentValue] = useState("");




  //Xử lý tạo comment
  const handleAddCommentButtonClick = (CommentContent) => {
    if (CommentContent !== "") {
      const postData = async () => {
        try {

          const response = await fetch(CREATE_COMMENT_FOR_FILM_API(slug), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `TOKEN ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              user: window.localStorage.getItem('userId'),
              content: CommentContent
            })
          });

          if (response.ok) {
            // Handle success if needed

            console.log('Reply posted successfully');
          } else {
            // Handle error if needed
            console.error('Failed to post reply');
          }
        } catch (error) {
          console.error('Error posting reply:', error);
        }
      };
      setCommentValue('')
      postData();
      setCommentComponentKey((prevKey) => prevKey + 1)
    }
  };





  return (
    <div style={{ backgroundColor: "rgb(60,59,59)", paddingTop: "10%" }}>
      <div className="info-container" >
        <div className="movie-poster-container">
          <img src={film.film.poster} alt="movie poster" className="movie-poster" />
        </div>
        <div className="movie-info">
          <h1 style={{ fontSize: '5vh' }}>{film.film.name}</h1>
          <div>
            {
              window.localStorage.getItem('token') !== null ?
                <Rate
                  allowClear
                  defaultValue={rating}
                  onChange={handleRateChange}
                />
                : <Rate
                  allowClear
                  disabled
                  value={rating}
                  defaultValue={rating}
                />
            }
            <span style={{ marginLeft: "10px" }}>{film.average_rate.toFixed(2)}/5</span>
          </div>
          {film.categories.map((Genre, index) => (
            <Tag key={index} color="red">
              {Genre.name}
            </Tag>
          ))}
          <h2 style={{ fontSize: '4vh' }}>Mô tả</h2>
          <p style={{ fontSize: '1rem' }}>{film.film.description}</p>
          <Space>
            <FavoriteButton film={film} />



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
          episodes={window.localStorage.getItem('currentWatching')}
        />
      </div>


      <div className="CommentSection">
        <h1 style={{ display: "block", color: 'white' }}>Bình luận</h1>
        {window.localStorage.getItem('token') !== null ? (<><Comment
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
            Bình luận
          </Button></>) : <></>}

        <br />
        <br />
        <CommentComponent
          key={commentComponentKey} // Sử dụng key để re-render khi state thay đổi
          film={film}
          setReplyToID={setReplyToID}
          handleAddCommentButtonClick={handleAddCommentButtonClick}
        />

      </div>
    </div>
  );
};

export default Watch;