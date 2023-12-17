
//Sửa thông tin phim(tên, năm, mô tả phim, diễn viên,...)
import React, { useState } from 'react'
import { Image, Input, Pagination, Row, message, Popconfirm, Button, ConfigProvider, } from 'antd'
import "./ManageMovie.scss"
import imageMovie from "../UserIcon.png";
import { Link } from 'react-router-dom';

const movieData = [
  {
    key: 1,
    id: 1,
    src: "https://i.pinimg.com/564x/20/2a/a2/202aa259454320d63365817ea1128023.jpg",
    title: "Hello1"
  },
  {
    key: 2,
    id: 2,
    src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-12-12/files/eos-6d-mark-ii-sample-image_1723-1.jpg",
    title: "Hello2"
  },
  {
    key: 3,
    id: 3,
    src: imageMovie,
    title: "Hello3"
  },
  {
    key: 4,
    id: 4,
    src: imageMovie,
    title: "Hello4"
  },
  {
    key: 5,
    id: 5,
    src: imageMovie,
    title: "Hello5"
  },
  {
    key: 6,
    id: 6,
    src: imageMovie,
    title: "Hello6"
  },
  {
    key: 7,
    id: 7,
    src: imageMovie,
    title: "Hello7"
  },
  {
    key: 8,
    id: 8,
    src: imageMovie,
    title: "Hello8"
  },
  {
    key: 9,
    id: 9,
    src: imageMovie,
    title: "Hello9"
  },
  {
    key: 10,
    id: 10,
    src: imageMovie,
    title: "Hello10"
  }, {
    key: 11,
    id: 11,
    src: imageMovie,
    title: "Hello11"
  },
  {
    key: 12,
    id: 12,
    src: imageMovie,
    title: "Hello12"
  },
  {
    key: 13,
    id: 13,
    src: imageMovie,
    title: "Hello13"
  },
  {
    key: 14,
    id: 14,
    src: imageMovie,
    title: "Hello14"
  },
  {
    key: 15,
    id: 15,
    src: imageMovie,
    title: "Hello5"
  },
  {
    key: 16,
    id: 16,
    src: imageMovie,
    title: "Hello16"
  },
  {
    key: 17,
    id: 17,
    src: imageMovie,
    title: "Hello17"
  },
  {
    key: 18,
    id: 18,
    src: imageMovie,
    title: "Hello18"
  },
]

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Your list of movies (replace this with your actual data)
  const movieList = movieData.map((movie) => (
    <div key={movie.key} style={{ marginRight: 10, marginTop: 10 }} >
      <Link to={{ pathname: `Detail/${encodeURIComponent(movie.title)}` }}>
        <Image className='movie-image' width={250} height={350} src={movie.src} preview={false} />
      </Link>
    </div>
  ));

  const totalItems = movieList.length;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentMovies = movieList.slice(startIndex, endIndex);

  const confirm = (e) => {
    message.success('Delete successfully!');
  };
  const [hoveredMovie, setHoveredMovie] = useState(null);

  return (
    <div>
      <Row justify="center">

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent: "center" }}>
          {currentMovies.map((movie, index) => (
            <div
              key={movie.key}
              className="movie-container"
              onMouseEnter={() => setHoveredMovie(index)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {movie}
              {hoveredMovie === index &&
                (<div className='content'>
                  <p>Name: {movie.title}</p>
                  <p>Year: 2030</p>
                  <p>Type: Romantic asdhkasdhs askhdasdlshdsa jjjjjjjj jjjjjjjj</p>

                </div>)}

              <Popconfirm
                title="Delete movie"
                description="Are you sure to delete this movie?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ backgroundColor: "red", color: "white", marginLeft: 85 }} key={index}>Delete</Button>
              </Popconfirm>
            </div>

          ))}
        </div>

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
          pageSize={itemsPerPage}
          onChange={handleChangePage}
          showSizeChanger={false}
          style={{ marginTop: '16px', textAlign: 'center', }}
        />
      </ConfigProvider>
    </div>
  );
};


const { Search } = Input
function ManageMovie() {
  return (
    <div className="manage-movie-container">
      <div className='manage-search'>
        <div>
          <Search placeholder="Search Movie" enterButton="Search" size="large" />
        </div>
      </div>

      <div className='movie-list'>
        <MovieList />
      </div>
    </div>
  )
}

export default ManageMovie