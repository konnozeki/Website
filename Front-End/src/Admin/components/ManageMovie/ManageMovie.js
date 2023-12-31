//Sửa thông tin phim(tên, năm, mô tả phim, diễn viên,...)
import React, { useState, useEffect } from "react";
import {
  Image,
  Input,
  Pagination,
  Row,
  message,
  Popconfirm,
  Button,
  ConfigProvider,
} from "antd";
import "./ManageMovie.scss";
import { Link } from "react-router-dom";
import { ADMIN_LIST_CREATE_FILM_API, backendUrl } from "../../../api";

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(8);
  const [movieData, setMovieData] = useState([21]);

  const fetchData = async () => {
    try {
      const response = await fetch(ADMIN_LIST_CREATE_FILM_API, {
        method: "GET",
        headers: {
          Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setItemPerPage(Math.max((window.innerWidth / 300 - 1) * 2, 2));
  }, []);

  const totalItems = movieData.length;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const currentMovies = movieData.slice(startIndex, endIndex);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  return (
    <div>
      <Row justify="center">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currentMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="movie-container"
              onMouseEnter={() => setHoveredMovie(index)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <div key={movie.id} style={{ marginRight: 10, marginTop: 10 }}>
                <Link
                  to={{ pathname: `${encodeURIComponent(movie.id)}` }}
                >
                  <Image
                    className="movie-image"
                    width={250}
                    height={350}
                    src={backendUrl(movie.poster)}
                    preview={false}
                  />
                </Link>
              </div>
              {hoveredMovie === index && (
                <div className="content">
                  <p>Tên: {movie.name}</p>
                  <p>Ngày ra mắt: {movie.release_date}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <Link className="addMovie" to={{ pathname: `add` }}>
          Thêm bộ phim
        </Link>
      </Row>

      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "red",
            },
          },
        }}
      >
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemPerPage}
          onChange={handleChangePage}
          showSizeChanger={false}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </ConfigProvider>
    </div>
  );
};

function ManageMovie() {
  return (
    <div className="manage-movie-container">
      <div className="movie-list">
        <MovieList />
      </div>
    </div>
  );
}

export default ManageMovie;
