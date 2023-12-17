
//Sửa thông tin phim(tên, năm, mô tả phim, diễn viên,...)
import React, { useState } from 'react'
import { Image, Input, Pagination, Row, Col, message, Popconfirm, Button, ConfigProvider } from 'antd'
import "./DeleteMovie.scss"
import imageMovie from "../UserIcon.png";

const movieData = [
    {
        key: 1,
        id: 1,
        src: "https://i.pinimg.com/564x/20/2a/a2/202aa259454320d63365817ea1128023.jpg",
    },
    {
        key: 2,
        id: 2,
        src: "https://d1hjkbq40fs2x4.cloudfront.net/2017-12-12/files/eos-6d-mark-ii-sample-image_1723-1.jpg",
    },
    {
        key: 3,

        id: 3,
        src: imageMovie,
    },
    {
        key: 4,

        id: 4,
        src: imageMovie,
    },
    {
        key: 5,

        id: 5,
        src: imageMovie,
    },
    {
        key: 6,

        id: 6,
        src: imageMovie,
    },
    {
        key: 7,

        id: 7,
        src: imageMovie,
    },
    {
        key: 8,

        id: 8,
        src: imageMovie,
    },
    {
        key: 9,

        id: 9,
        src: imageMovie,
    },
    {
        key: 10,

        id: 10,
        src: imageMovie,
    }, {
        key: 11,

        id: 11,
        src: imageMovie,
    },
    {
        key: 12,

        id: 12,
        src: imageMovie,
    },
    {
        key: 13,

        id: 13,
        src: imageMovie,
    },
    {
        key: 14,

        id: 14,
        src: imageMovie,
    },
    {
        key: 15,

        id: 15,
        src: imageMovie,
    }, {
        key: 16,

        id: 16,
        src: imageMovie,
    },
    {
        key: 17,

        id: 17,
        src: imageMovie,
    },
]

const MovieList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Your list of movies (replace this with your actual data)
    const movieList = movieData.map((movie) => (
        <div key={movie.key} style={{ marginRight: 10, marginBottom: 10 }} >
            <a href={`/Admin/ManageMovie/Detail/${movie.id}`}>
                <Image className='movie-image' width={250} height={350} src={movie.src} preview={false} />
            </a>
        </div>
    ));

    const totalItems = movieList.length;

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentMovies = movieList.slice(startIndex, endIndex);

    return (
        <div>
            <Row justify="center">
                {currentMovies.length === 1 ? (
                    currentMovies.map((movie, index) => (
                        <div key={index}>
                            <Col span={24}>
                                {movie}
                            </Col>
                            <Popconfirm
                                title="Delete movie"
                                description="Are you sure to delete this movie?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ backgroundColor: "red", color: "white", marginLeft: 85 }}>Delete</Button>

                            </Popconfirm>

                        </div>
                    ))
                ) : currentMovies.length === 2 ? (
                    currentMovies.map((movie, index) => (
                        <div key={index}>
                            <Col span={12}>
                                {movie}
                            </Col>
                            <Popconfirm
                                title="Delete movie"
                                description="Are you sure to delete this movie?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ backgroundColor: "red", color: "white", marginLeft: 85 }}>Delete</Button>

                            </Popconfirm>

                        </div>

                    ))
                ) : currentMovies.length === 3 ? (
                    currentMovies.map((movie, index) => (
                        <div key={index}>
                            <Col span={8}>
                                {movie}
                            </Col>
                            <Popconfirm
                                title="Delete movie"
                                description="Are you sure to delete this movie?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ backgroundColor: "red", color: "white", marginLeft: 85 }}>Delete</Button>

                            </Popconfirm>

                        </div>

                    ))
                ) :
                    currentMovies.map((movie, index) => (
                        <div key={index}>
                            <Col span={2}>
                                {movie}
                            </Col>
                            <Popconfirm
                                title="Delete movie"
                                description="Are you sure to delete this movie?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ backgroundColor: "red", color: "white", marginLeft: 85 }}>Delete</Button>
                            </Popconfirm>
                        </div>

                    ))
                }
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

const confirm = (e) => {
    console.log(e);
    message.success('Delete successfully!');
};

const { Search } = Input
function DeleteMovie() {
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

export default DeleteMovie