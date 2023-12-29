import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

function UserFavourite() {
  const [index, setIndex] = useState(0);
  const [playlistData, setPlaylistData] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const showCreateModal = () => {
    setCreateModalVisible(true);
  };
  const navigation = useNavigate();
const fetchPlaylistData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/playlist/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPlaylistData(data);
    } else {
      console.error('Failed to fetch playlist data');
    }
  } catch (error) {
    console.error('Error fetching playlist data:', error);
  }
};

useEffect(() => {
  // Fetch playlist data when the component mounts
  fetchPlaylistData();
}, []); // The empty dependency array ensures that this effect runs only once when the component mounts

// Function to handle creating a new playlist
const handleCreatePlaylist = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/playlist/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        user: window.localStorage.getItem('userid'),
        name: newPlaylistName,
      }),
    });

    if (response.ok) {
      const newPlaylist = await response.json();
      setPlaylistData((prevData) => [...prevData, newPlaylist]);
      setCreateModalVisible(false);
      setNewPlaylistName(''); // Clear the input field

      // Fetch the updated playlist data
      fetchPlaylistData();
    } else {
      console.error('Failed to create playlist');
    }
  } catch (error) {
    console.error('Error creating playlist:', error);
  }
};

  

  const handleDeletePlaylist = async () => {
    try {
      // Send a DELETE request to remove the playlist
      const response = await fetch(`http://localhost:8000/api/playlist/${selectedPlaylist.slug}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        // Remove the playlist from the state if the request is successful
        setPlaylistData((prevData) => prevData.filter((playlist) => playlist.id !== selectedPlaylist.id));
        setDeleteModalVisible(false);
      } else {
        console.error('Failed to delete playlist');
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };
  

  const showDeleteModal = (playlist) => {
    setSelectedPlaylist(playlist);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '10px', color: '#ee0000' }}>Danh sách phát</h1>

      <Row style={{ margin: 20 }}>
        {playlistData.length !== 0 ? playlistData.map((playlist) => (
          <Col key={playlist.id} style={{alignItems: 'center'}} span={playlistData.length<=2?12:8}>
            <Card
              onClick={() => navigation(`/playlist/${playlist.slug}`)}
              hoverable
              style={{ width: '30vw', margin: '1px' }}
              cover={<img alt="playlist" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" style={{ height: 200 }} />}
            >
              <Meta title={playlist.name} />
              <Button
                type="primary"
                
                style={{ marginTop: '10px', backgroundColor: 'red' }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  showDeleteModal(playlist);
                }}
              >
                Xóa
              </Button>
            </Card>
          </Col>
        )) : 
        <div style={{height: 350}}>
          <p style={{fontSize: 20}}>Không có gì ở đây cả...</p>

        </div>
        }
      </Row>

      <Button
        type="primary"
        style={{ backgroundColor: 'red', borderColor: 'red', width: 200, color: 'white', margin: 20 }}
        onClick={showCreateModal}
        title='Tạo danh sách mới'
      >
        Tạo danh sách mới
      </Button>

      {/* Delete Playlist Modal */}
      <Modal
        title="Xóa Playlist"
        visible={deleteModalVisible}
        onOk={handleDeletePlaylist}
        onCancel={hideDeleteModal}
        okText="Xóa"
        
        cancelText="Hủy"
      >
        <p style={{textAlign: 'center'}}>Bạn có chắc chắn muốn xóa danh sách phát "<strong>{selectedPlaylist?.name}</strong>" không?</p>
      </Modal>


      <Modal
        title="Tạo danh sách mới"
        visible={createModalVisible}
        onOk={handleCreatePlaylist}
        onCancel={() => setCreateModalVisible(false)}
        okText="Tạo"
        cancelText="Hủy"
      >
        <p>Tên danh sách phát:</p>
        <Input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default UserFavourite;
