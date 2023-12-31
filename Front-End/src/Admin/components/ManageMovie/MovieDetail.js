import { Button, Image, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.scss";
import { Link, useNavigate } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table } from "antd";
import {
  ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API,
  ADMIN_UPDATE_DELETE_FILM_EPISODE_API,
} from "../../../api";

function MovieDetail() {
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
        link: "",
        description: "Đây là nội dung tập 1",
      }
    ],
  });
  const columns = [
    {
      title: "Tập",
      dataIndex: "episode",
      key: "episode",
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "poster",
      key: "poster",
      align: "center",
      render: (text, record) => (
        <Image width={30} src={record.poster} preview={false} />
      ),
    },
    {
      title: "Đường dẫn",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Ngày ra mắt",
      dataIndex: "release_date",
      key: "release_date",
      align: "center",
    },
    {
      title: "Tương tác",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div>
          <Link to={{ pathname: `${"episodes/" + record.id}` }}>
            <EditFilled style={{ color: "black", fontSize: 25, margin: 10 }} />
          </Link>

          <Popconfirm
            title="Delete movie"
            description="Are you sure to delete this movie?"
            onConfirm={() => handleDeleteEpisode(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteFilled
              style={{ color: "black", fontSize: 25, margin: 10 }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API(id), {
      method: "GET",
      headers: {
        Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
      })
      .catch((error) => {
        console.error("Error fetching actor data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteEpisode = (episode_id) => {
    fetch(ADMIN_UPDATE_DELETE_FILM_EPISODE_API(id, episode_id), {
      method: "DELETE",
      headers: {
        Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
      },
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
    fetchData();
  };

  const handleDeleteMovie = async () => {
    try {
      const response = await fetch(
        ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API(id),
        {
          method: "DELETE",
          headers: {
            Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/admin/movie");
    } catch (error) {
      console.error("Error delete movie:", error);
    }
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
            <p style={{ color: "white", fontSize: 30, fontWeight: 'bold' }}>Thông tin phim</p>
          </div>
          <div className="detail-children">
            <div className="detail-label"><strong>Tên phim</strong></div>
            <div className="detail-content">{movieData.film.name}</div>
          </div>
          <div className="detail-children">
            <div className="detail-label"><strong>Ngày phát hành</strong></div>
            <div className="detail-content">{movieData.film.release_date}</div>
          </div>
          <div className="detail-children">
            <div className="detail-label"><strong>Mô tả</strong></div>
            <div className="detail-content">{movieData.film.description}</div>
          </div>
          <div className="detail-children">
            <div className="detail-label"><strong>Quốc gia</strong></div>
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
            <div className="detail-label"><strong>Chủ đề</strong></div>
            <div className="detail-content">
              {movieData.categories.map((category, index) => (
                <div className="info-box">{category.name}</div>
              ))}
            </div>
          </div>
          <div className="detail-children">
            <div className="detail-label"><strong>Diễn viên</strong></div>
            <div className="detail-content">
              {movieData.actors.map((actor, index) => (
                <div className="info-box">{actor.name}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="button-group">
              <Link
                className="link"
                to={{ pathname: `${encodeURIComponent("change")}` }}
              >
                <Button style={{borderColor: 'red'}} className="button change">Sửa</Button>
              </Link>
              <Popconfirm
                title="Delete movie"
                description="Bạn có chắc là muốn xóa bộ phim này không?"
                onConfirm={handleDeleteMovie}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{borderColor: 'red'}} className="button delete">Xóa</Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-espisode">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 30,
          }}
        >
          <p style={{ color: "white", fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>Danh sách tập phim</p>
          <div style={{ width: "90%" }}>
            <Table
              columns={columns}
              dataSource={movieData.film_episodes}
            ></Table>
          </div>
          <Link
            className="link"
            to={{ pathname: `${encodeURIComponent("add_episode")}` }}
          >
            <Button style={{color: 'white', width: 250, height: 50, borderColor: 'red'}} className="button delete" >Thêm tập phim</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
