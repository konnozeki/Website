import { Button, Image, Input, Popconfirm, message, Modal, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./MovieDetail.scss"
import { ADMIN_GET_FILM_API } from '../../../api';

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
    message.success('Change successfully!');
};


function MovieDetail() {
    const [espisodeList, setEspisodesList] = useState(generateEpisodes(40));
    const { id } = useParams();
    const titleMovie = decodeURIComponent(id);
      const fetchData = async () => {
        try {
          const response = await fetch(ADMIN_GET_FILM_API (id), {
            method: "GET",
            headers: {
              Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);


    const [selectedEpisodes, setSelectedEpisodes] = useState([]);

    const handleEpisodeClick = (episodeId) => {
        if (selectedEpisodes.includes(episodeId)) {
            setSelectedEpisodes(selectedEpisodes.filter((id) => id !== episodeId));
        } else {
            setSelectedEpisodes([...selectedEpisodes, episodeId])
        }
    };
    const handleDeleteEpisode = () => {
    }
    const handleAddEpisode = () => {
        showModal()
    }
    const handleReset = () => {
        setSelectedEpisodes([])
    }

    const EpisodeDisplay = () => {
        return (
            <div className="episode-container">
                {espisodeList.map((episode) => (
                    <div key={episode.id}
                        className={`episode-card ${selectedEpisodes.includes(episode.id) ? "selected" : ""}`}
                        onClick={() => handleEpisodeClick(episode.id)}
                    >
                        <p style={{ color: `${selectedEpisodes.includes(episode.id) ? "red" : "white"}` }}>{episode.id}</p>
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
        message.success("Add successfully!")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const confirmDeleteEpisode = (e) => {
        message.success("Delete successfully!")
    }
    return (
        <div>
            <div className='movie-detail-container'>
                <div className='image-movie'>
                    <Image className='movie-image' width={300} height={420}
                        src="https://i.pinimg.com/564x/20/2a/a2/202aa259454320d63365817ea1128023.jpg" />
                </div>

                {/* <div className='space-gap'>Hello</div> */}
                <div className='detail-movie'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                        <p style={{ color: "white", fontSize: 24, }}>Thong tin phim</p>

                    </div>
                    <div className='detail-children'>
                        <Input className="detail-infor" placeholder='Name Movie' size='large' defaultValue={decodeURIComponent(titleMovie)} />
                    </div>
                    <div className='detail-children'>
                        <Input className="detail-infor" placeholder='Year Production' size='large' />
                    </div>
                    <div className='detail-children'>
                        <Input.TextArea className="detail-infor" placeholder='Description' rows={5} size='large' />
                    </div>
                    <div className='detail-children'>
                        <Input className="detail-infor" placeholder='Type' size='large' />
                    </div>
                    <div>
                        <Popconfirm
                            title="Change information"
                            description="Are you sure to change?"
                            onConfirm={confirmChangeInformation}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className='button-children'>Change</Button>

                        </Popconfirm>
                    </div>


                </div>
            </div>
            <div className='movie-espisode'>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 30 }}>
                    <p style={{ color: "white", fontSize: 25 }}>Episodes List</p>
                </div>
                <EpisodeDisplay />
                <div className='button-function'>
                    <Popconfirm
                        title="Delete episodes"
                        description="Are you sure to delete these episodes?"
                        onConfirm={confirmDeleteEpisode}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className='button-children'
                            onClick={() => { handleDeleteEpisode() }}>
                            Delete</Button>

                    </Popconfirm>

                    <Button className='button-children'
                        onClick={() => { handleReset() }}>
                        Reset</Button>


                    <Button className='button-children'
                        onClick={() => { handleAddEpisode() }}>
                        Add episode</Button>
                    <Modal title="Add episode" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <InputNumber placeholder='Tap' defaultValue={espisodeList.length + 1} className='add-episode' />
                        <Input placeholder='Link Tap' size='large' />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail