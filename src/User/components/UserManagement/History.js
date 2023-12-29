import React, { useEffect, useState } from 'react';
import { Typography, List, Avatar, Space, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const History = () => {
    const navigation = useNavigate()
  const { slug } = useParams();
  const [playlistData, setPlaylistData] = useState([
    {
      id: 0,
      time: '',
      film_episode: {
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
            }
        },
      user: '',
    },
  ]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    const timeFormatted = `${hours}:${minutes}`;
    const dateFormatted = `${day}-${month}-${year}`;
  
    return `${timeFormatted} ${dateFormatted}`;
  }

  const [deleteEpisodeId, setDeleteEpisodeId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteAllModalVisible, setIsDeleteAllModalVisible] = useState(false);

  const fetchPlaylistData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/history/`, {
        method: 'GET',
        headers: {
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // Đảo ngược mảng playlistData
      setPlaylistData(data.reverse());
    } catch (error) {
      console.error('Error fetching playlist data:', error.message);
    }
  };
  
  useEffect(() => {
    fetchPlaylistData();
  }, [slug]);

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
  const handleDelete = (episodeId) => {
    setDeleteEpisodeId(episodeId);
    setIsModalVisible(true);
  };



  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteAll = () => {
    // Xử lý logic xóa tất cả ở đây
    console.log('Deleting all episodes');
    setIsDeleteAllModalVisible(true);
  };

  const handleOkDeleteAll = async () => {
    try {
      for (const history of playlistData) {
        const episodeSlug = history.film_episode.slug;
  
        const response = await fetch(`http://localhost:8000/api/history/${episodeSlug}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error deleting episode with slug ${episodeSlug}`);
        }
      }
  
      console.log('All episodes deleted successfully');
      setIsDeleteAllModalVisible(false);
  
      // Fetch the updated playlist data after deletion
      fetchPlaylistData();
    } catch (error) {
      console.error('Error deleting all episodes:', error.message);
    }
  };

  const handleCancelDeleteAll = () => {
    setIsDeleteAllModalVisible(false);
  };

  const handleOk = async () => {
    try {
      // Get the episode slug from the selected history item
      const episodeSlug = playlistData.find(item => item.id === deleteEpisodeId)?.film_episode?.slug;
  
      // Check if the episode slug is available
      if (!episodeSlug) {
        console.error('Episode slug not found');
        return;
      }
  
      const response = await fetch(`http://localhost:8000/api/history/${episodeSlug}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log(`Episode with ID ${deleteEpisodeId} deleted successfully`);
      setIsModalVisible(false);
      
      // Fetch the updated playlist data after deletion
      fetchPlaylistData();
    } catch (error) {
      console.error('Error deleting episode:', error.message);
    }
  };
  

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'red', marginBottom: 10 }}>{"Lịch sử"}</h1>
      <div>
        {playlistData.length === 0 ? (
          <div style={{ height: 400 }}>
            <p style={{ fontSize: 20 }}>Không có gì ở đây cả...</p>
          </div>
        ) : (
          <div style={{ minHeight: 420 }}>
            {/* Xóa tất cả button */}
            <Button
              type="primary"
              onClick={handleDeleteAll}
              style={{ margin: '1em', backgroundColor: 'red' }}
            >
              Xóa tất cả
            </Button>

            <div style={{ borderTop: '1px solid gray', margin: '1em' }}></div>
            <List
              itemLayout="horizontal"
              dataSource={playlistData}
              renderItem={(history, index) => (
                <List.Item
                    
                  style={{
                    borderBottom: index < playlistData.length - 1 ? '1px solid gray' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '1em',
                    paddingBottom: '2em',

                  }}
                >
                  <div onClick={()=>{
                        window.localStorage.setItem('currentWatching', history.film_episode.episode)
                        navigation(`/watch/${getShortSlug(history.film_episode.slug)}`)
                    }} style={{cursor: 'pointer'}}>
                  <Avatar src={`http://localhost:8000${history.film_episode.poster}`} size={100} shape="square" />
                  <Space direction="vertical" style={{ marginLeft: '10em' }}>
                    <Text>{history.film_episode.description}</Text>
                    <Text>{formatDateTime(history.time)}</Text>
                  </Space>
                  </div>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(history.id)}
                    style={{ marginLeft: '5em', backgroundColor: 'red' }}
                  >
                    Xóa
                  </Button>
                </List.Item>
              )}
            />
            <div style={{ borderBottom: '1px solid gray', margin: '1em' }}></div>
          </div>
        )}
      </div>
      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa tập phim này trong lịch sử?</p>
      </Modal>

      {/* Modal Xóa tất cả */}
      <Modal
        title="Xác nhận xóa tất cả"
        visible={isDeleteAllModalVisible}
        onOk={handleOkDeleteAll}
        onCancel={handleCancelDeleteAll}
      >
        <p>Bạn có chắc chắn muốn xóa tất cả tập phim trong lịch sử?</p>
      </Modal>
    </div>
  );
};

export default History;
