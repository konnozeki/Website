import React, { useEffect, useState } from 'react';
import { Typography, List, Avatar, Space, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { RETRIEVE_UPDATE_DELETE_PLAYLIST_API, UPDATE_DELETE_PLAYLIST_EPISODE_API, backendUrl } from '../../../api';

const { Title, Text } = Typography;

const PlaylistDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const getShortSlug = (fullSlug) => {
    // Tìm vị trí của ký tự cuối cùng trước số
    const lastNonNumericIndex = fullSlug.search(/\D(?=\d*$)/);

    // Nếu tìm thấy ký tự không phải số, cắt chuỗi từ đầu đến ký tự đó
    if (lastNonNumericIndex !== -1) {
      return fullSlug.slice(0, lastNonNumericIndex);
    }

    // Nếu không tìm thấy ký tự không phải số, trả về chuỗi ban đầu
    return fullSlug;
  };
  const [playlistData, setPlaylistData] = useState({
    play_list: {
      id: 0,
      name: '',
      slug: '',
      user: '',
    },
    episodes: [
      {
        id: 0,
        play_list: 0,
        film_episode: {
          id: 0,
          film: 0,
          slug: "",
          episode: 0,
          poster: "",
          release_date: "",
          link: "",
          description: ""
        },
        index: 0,
      },
    ],
  });

  const [deleteEpisodeId, setDeleteEpisodeId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        RETRIEVE_UPDATE_DELETE_PLAYLIST_API(slug)
        const response = await fetch(RETRIEVE_UPDATE_DELETE_PLAYLIST_API(slug), {
          method: 'GET',
          headers: {
            Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPlaylistData(data);
      } catch (error) {
        console.error('Error fetching playlist data:', error.message);
      }
    };

    fetchPlaylistData();
  }, [slug]);

  const handleDelete = async (episodeId) => {
    try {
      // Send a DELETE request to remove the episode

      const response = await fetch(UPDATE_DELETE_PLAYLIST_EPISODE_API(slug, episodeId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Remove the episode from the state if the request is successful
        setPlaylistData((prevData) => ({
          ...prevData,
          episodes: prevData.episodes.filter((episode) => episode.id !== episodeId),
        }));
        setIsModalVisible(false);
      } else {
        console.error('Failed to delete episode');
      }
    } catch (error) {
      console.error('Error deleting episode:', error);
    }
  };

  const handleOk = () => {
    // Xử lý logic xóa ở đây
    handleDelete(deleteEpisodeId);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEpisodeClick = (episode) => {
    // Sử dụng navigate để điều hướng mà không thay đổi URL
    window.localStorage.setItem('currentWatching', episode.film_episode.episode)
    navigate(`/watch/${getShortSlug(episode.film_episode.slug)}`);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: "rgb(28,28,28)", height: "auto", minHeight: "100vh" }}>
      <h1 style={{ color: 'red' }}>
        {playlistData.play_list.name}
      </h1>
      <div>
        {playlistData.episodes.length !== 0 ? <Title level={2}>Danh sách</Title> : <></>}
        {playlistData.episodes.length === 0 ?
          <div style={{ height: 390 }}>
            <p style={{ fontSize: 20 }}>Không có gì ở đây cả...</p>
          </div> :
          <div style={{ minHeight: 390 }}>
            <div style={{ borderTop: '1px solid gray', margin: '1em' }}></div>
            <List
              itemLayout="horizontal"
              dataSource={playlistData.episodes}
              renderItem={(episode, index) => (
                <List.Item
                  style={{
                    borderBottom: index < playlistData.episodes.length - 1 ? '1px solid gray' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '1em',
                    paddingBottom: '2em',
                  }}
                >
                  <div onClick={() => handleEpisodeClick(episode)} style={{ cursor: 'pointer' }}>
                    <Avatar src={backendUrl(episode.film_episode.poster)} size={100} shape="square" />
                    <Space direction="vertical" style={{ marginLeft: '10em' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tập phim {episode.index}</Text>
                      <Text>{episode.film_episode.description}</Text>
                    </Space>
                  </div>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setDeleteEpisodeId(episode.id);
                      setIsModalVisible(true);
                    }}
                    style={{ marginLeft: '5em', backgroundColor: 'red' }}
                  >
                    Xóa
                  </Button>
                </List.Item>

              )}
            />
            <div style={{ borderBottom: '1px solid gray', margin: '1em' }}></div>
          </div>
        }
      </div>
      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p style={{ textAlign: 'center' }}>Bạn có chắc chắn muốn xóa tập phim này khỏi danh sách phát?</p>
      </Modal>
    </div>
  );
};

export default PlaylistDetail;
