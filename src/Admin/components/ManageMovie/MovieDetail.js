import {
  Button,
  Image,
  Input,
  Popconfirm,
  message,
  Modal,
  InputNumber,
} from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.scss";
import {
  ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API,
  backendUrl,
} from "../../../api";

const generateEpisodes = (numEpisodes) => {
  const episodes = [];

  for (let i = 1; i <= numEpisodes; i++) {
    episodes.push({
      id: i,
      title: `Episode ${i}`,
      description: `Description for Episode ${i}`,
    });
  }

  return episodes;
};

const confirmChangeInformation = (e) => {
  message.success("Change successfully!");
};

function MovieDetail() {
  const [espisodeList, setEspisodesList] = useState(generateEpisodes(40));
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    film: {
      id: 0,
      name: "",
      slug: "",
      description: "",
      actors: [],
      categories: [],
      country: 0,
      poster: "",
      age_restriction: 0,
      release_date: "2000-01-01",
    },
    actors: [],
    categories: [],
    country: {
      id: 0,
      name: "Vietnam",
      flag: "https://flagcdn.com/w320/vn.png",
      slug: "vietnam",
    },
    average_rate: 0,
    film_episodes: [
      {
        id: 1,
        film: 1,
        slug: "song-o-ay-song-1",
        episode: 1,
        poster:
          "",
        release_date: "2000-01-01",
        link: "https://www.youtube.com/watch?v=4DumeqZmtYU",
        description: "Đây là nội dung tập 1",
      },
    ],
  });
  const [film, setFilm] = useState();
  const fetchData = async () => {
    try {
      const response = await fetch(
        ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API(id),
        {
          method: "GET",
          headers: {
            Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setMovieData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log(1);
    fetchData();
  }, []);

  const [selectedEpisodes, setSelectedEpisodes] = useState([]);

  const handleEpisodeClick = (episodeId) => {
    if (selectedEpisodes.includes(episodeId)) {
      setSelectedEpisodes(selectedEpisodes.filter((id) => id !== episodeId));
    } else {
      setSelectedEpisodes([...selectedEpisodes, episodeId]);
    }
  };
  const handleDeleteEpisode = () => {};
  const handleAddEpisode = () => {
    showModal();
  };
  const handleReset = () => {
    setSelectedEpisodes([]);
  };

  const EpisodeDisplay = () => {
    return (
      <div className="episode-container">
        {espisodeList.map((episode) => (
          <div
            key={episode.id}
            className={`episode-card ${
              selectedEpisodes.includes(episode.id) ? "selected" : ""
            }`}
            onClick={() => handleEpisodeClick(episode.id)}
          >
            <p
              style={{
                color: `${
                  selectedEpisodes.includes(episode.id) ? "red" : "white"
                }`,
              }}
            >
              {episode.id}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    message.success("Add successfully!");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const confirmDeleteEpisode = (e) => {
    message.success("Delete successfully!");
  };
  return (
    <div>
      <div className="movie-detail-container">
        <div className="image-movie">
          <Image
            className="movie-image"
            width={300}
            height={420}
            src={movieData.film.poster}
          />
        </div>

        {/* <div className='space-gap'>Hello</div> */}
        <div className="detail-movie">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <p style={{ color: "white", fontSize: 24 }}>Thông tin phim</p>
          </div>
          <div className="detail-children">
            <div className="detail-label">Tên phim</div>
            <div className="detail-content">{movieData.film.name}</div>
          </div>
          <div className="detail-children">
            <div className="detail-label">Ngày phát hành</div>
            <div className="detail-content">{movieData.film.release_date}</div>
          </div>
          <div className="detail-children">
            <div className="detail-label">Mô tả</div>
            <div className="detail-content">{movieData.film.description}</div>
          </div>
          <div className="detail-children">
            <div className="detail-label">Quốc gia</div>
            <div className="detail-content">
              <Image
                className="flag"
                width={35}
                src={movieData.country.flag}
                preview={false}
              />
              <div>{movieData.country.name}</div>
            </div>
          </div>
          <div className="detail-children">
            <div className="detail-label">Chủ đề</div>
            <div className="detail-content">
              {movieData.categories.map((category, index) => (
                <div className="info-box">{category.name}</div>
              ))}
            </div>
          </div>
          <div className="detail-children">
            <div className="detail-label">Diễn viên</div>
            <div className="detail-content">
              {movieData.actors.map((actor, index) => (
                <div className="info-box">{actor.name}</div>
              ))}
            </div>
          </div>
          <div>
            <Popconfirm
              title="Change information"
              description="Are you sure to change?"
              onConfirm={confirmChangeInformation}
              okText="Yes"
              cancelText="No"
            >
              <Button className="button-children">Change</Button>
            </Popconfirm>
          </div>
        </div>
      </div>
      <div className="movie-espisode">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 30,
          }}
        >
          <p style={{ color: "white", fontSize: 25 }}>Episodes List</p>
        </div>
        <EpisodeDisplay />
        <div className="button-function">
          <Popconfirm
            title="Delete episodes"
            description="Are you sure to delete these episodes?"
            onConfirm={confirmDeleteEpisode}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="button-children"
              onClick={() => {
                handleDeleteEpisode();
              }}
            >
              Delete
            </Button>
          </Popconfirm>

          <Button
            className="button-children"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </Button>

          <Button
            className="button-children"
            onClick={() => {
              handleAddEpisode();
            }}
          >
            Add episode
          </Button>
          <Modal
            title="Add episode"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <InputNumber
              placeholder="Tap"
              defaultValue={espisodeList.length + 1}
              className="add-episode"
            />
            <Input placeholder="Link Tap" size="large" />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
