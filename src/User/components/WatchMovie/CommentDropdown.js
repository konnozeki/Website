// Trong CommentDropdown.js
import React, { useState, useEffect } from 'react';
import { Dropdown, Space, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const CommentDropdown = ({ movie, selectedEpisode }) => {
  const { Episode_List } = movie;
  const [localSelectedEpisode, setLocalSelectedEpisode] = useState(null);

  useEffect(() => {
    setLocalSelectedEpisode(selectedEpisode);
  }, [selectedEpisode]);

  const handleSelectEpisode = (episode) => {
    setLocalSelectedEpisode(episode);
    
  };

  const menuItems = Episode_List.map((episode) => (
    <Menu.Item key={episode.Episode.toString()}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={episode.Link}
        onClick={(e) => {
          e.preventDefault();
          handleSelectEpisode(episode.Episode);
        }}
      >
        Tập {episode.Episode}
      </a>
    </Menu.Item>
  ));

  return (
    <Dropdown overlay={<Menu>{menuItems}</Menu>}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {localSelectedEpisode ? `Tập ${localSelectedEpisode}` : 'All'} <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default CommentDropdown;
