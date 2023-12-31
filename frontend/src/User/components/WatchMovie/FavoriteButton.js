import React, { useState, useEffect } from "react";
import { Button, notification, Modal, Checkbox, Input, Select } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { CREATE_PLAYLIST_EPISODE_API, LIST_CREATE_PLAYLIST_API } from "../../../api";
const { Option } = Select;
const FavoriteButton = ({ film }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkboxOptions, setCheckboxOptions] = useState([]);
  const [episodeCount, setEpisodeCount] = useState(null);

  useEffect(() => {
    if (film && film.film_episodes) {
      setEpisodeCount(film.film_episodes.length);
    }
  }, [film]);
  console.log("Film:" + film.film.slug);
  useEffect(() => {
    // Fetch playlist data from API
    const fetchPlaylistData = async () => {
      try {
        
        const response = await fetch(LIST_CREATE_PLAYLIST_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCheckboxOptions(
            data.map((playlist) => ({
              label: playlist.name,
              value: playlist.slug,
            }))
          );
        } else {
          console.error("Failed to fetch playlist data");
        }
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const onChange = (checkedValues) => {
    setCheckedList(checkedValues);
    setIndeterminate(
      !!checkedValues.length && checkedValues.length < checkboxOptions.length
    );
    setCheckAll(checkedValues.length === checkboxOptions.length);
    
    // Cập nhật danh sách giá trị đã được chọn
    setSelectedValues(checkedValues);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(
      e.target.checked ? checkboxOptions.map((option) => option.label) : []
    );
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleClick = () => {
    setIsFilled(true);
    showModal();
  };

  const showNotification = (props) => {
    notification.open({
      message: props.content,
      duration: 2,
      icon: <HeartOutlined style={{ color: "red" }} />,
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setIsFilled(false);
  };

  const handleSave = () => {
    // Sử dụng danh sách giá trị đã được chọn
    console.log("Selected values:", selectedValues);
    console.log(film.film_episodes[episodeCount-1].slug)
    selectedValues.forEach( async (element) => {
      const response = await fetch(CREATE_PLAYLIST_EPISODE_API(element), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          film_episode_slug: film.film_episodes[episodeCount-1].slug
        })
      })
      if (response.ok) {
        showNotification({ content: "Đã thêm vào Playlist" });
        setModalVisible(false);
        setIsFilled(false);

      } else {
        console.error("Failed to fetch playlist data" + response.data);
      }
    });
    
  };

  return (
    <>
      <Button
        className="custombutton"
        type="primary"
        danger
        icon={isFilled ? <HeartFilled /> : <HeartOutlined />}
        onClick={handleClick}
        style={{ width: "10vh", height: "10vh", fontSize: "3vh" }}
      />
      <Modal
        title="Thêm vào Danh sách"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >

        <Checkbox.Group
          style={{ fontSize: 16 }}
          options={checkboxOptions}
          value={checkedList}
          onChange={onChange}
        />
        <Select
          style={{ marginTop: "20px", display: "block" }} // Điều chỉnh khoảng cách trên dropdown và chuyển về kiểu block
          placeholder="Chọn số tập phim"
          value={episodeCount}
          onChange={(value) => setEpisodeCount(value)}
        >
          {film.film_episodes &&
            film.film_episodes.map((episode) => (
              <Option key={episode.id} value={episode.episode}>
                Tập {episode.episode}
              </Option>
            ))}
        </Select>
      </Modal>
    </>
  );
};

export default FavoriteButton;