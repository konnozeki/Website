import React, { useState, useEffect } from 'react';
import { Dropdown, Space, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const CommentDropdown = ({ film, selectedEpisode }) => {
  const { film_episodes } = film;
  const [localSelectedEpisode, setLocalSelectedEpisode] = useState(null);

  useEffect(() => {
    setLocalSelectedEpisode(selectedEpisode);
  }, [selectedEpisode]);

  const handleSelectEpisode = (episode) => {
    setLocalSelectedEpisode(episode);
    // You can add any other logic here when an episode is selected
  };

  const menuItems = film_episodes.map((episode) => (
    <Menu.Item key={episode.slug}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={episode.link}
        onClick={(e) => {
          e.preventDefault();
          handleSelectEpisode(episode.episode);
        }}
      >
        Tập {episode.episode}
      </a>
    </Menu.Item>
  ));

  return (
    <Dropdown overlay={<Menu>{menuItems}</Menu>}>
      <a onClick={(e) => e.preventDefault()} style={{ color: "white" }}>
        <Space>
          {localSelectedEpisode ? `Tập ${localSelectedEpisode}` : 'All'} <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default CommentDropdown;
