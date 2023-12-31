import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Form, Button, Select, Space, DatePicker, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import isValidUrl from 'valid-url';

import {
  ADMIN_UPDATE_DELETE_FILM_EPISODE_API,
} from "../../../api";
import dayjs from "dayjs";

const ChangeEpisode = () => {
  const { film_id, episode_id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [posterFile, setPosterFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [episodeData, setEpisodeData] = useState({
    episode: 1,
    link: "",
    releaseDate: "",
    description: "",
  });

  const token = window.localStorage.getItem("token");
  const { TextArea } = Input;

  useEffect(() => {
    fetch(ADMIN_UPDATE_DELETE_FILM_EPISODE_API(film_id, episode_id), {
      method: "GET",
      headers: {
        Authorization: `TOKEN ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEpisodeData({
          episode: data.episode,
          link: data.link,
          releaseDate: data.release_date,
          description: data.description,
        });
        console.log(data.releaseDate)
        form.setFieldsValue({
          episode: data.episode,
          link: data.link,
          release_date: dayjs(data.release_date, "YYYY-MM-DD"),
          description: data.description,
        });
      })
      .catch((error) => {
        console.error("Error fetching episode data:", error);
      });
  }, [film_id, episode_id, form, token]);

  const postData = () => {
    const formData = new FormData();
    formData.append("episode", episodeData.episode);
    formData.append("release_date", episodeData.releaseDate);
    formData.append("description", episodeData.description);
    formData.append("link", episodeData.link);
    
    if (posterFile) {
      formData.append("poster", posterFile);
    }

    fetch(ADMIN_UPDATE_DELETE_FILM_EPISODE_API(film_id, episode_id), {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `TOKEN ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        message.success("Episode updated successfully");
        navigate("/admin/movie/" + film_id);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        message.error("Failed to update episode");
      });
  };

  return (
    <div className="all-container">
      <h1 style={{ textAlign: "center", marginBottom: 10, color: "red" }}>
        Chỉnh sửa tập phim
      </h1>
      <div className="add-movie-container">
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            marginLeft: "200px",
            marginRight: "200px",
          }}
          autoComplete="off"
          onFinish={postData}
          encType="multipart/form-data"
        >
          <Form.Item
            label="Tập"
            name="episode"
            rules={[
              {
                required: true,
                message: "Please input episode!",
              },
            ]}
          >
            <Input
              type="number"
              onChange={(e) => setEpisodeData({ ...episodeData, episode: parseInt(e.target.value, 10) })}
              placeholder="Tập"
              className="input-infor-movie"
              value={episodeData.episode}
            />
          </Form.Item>

          <Form.Item
            label="Ngày phát hành"
            name="release_date"
            rules={[
              {
                required: true,
                message: "Please input Release date!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%", height: 40, fontSize: 16 }}
              format="YYYY-MM-DD"
              placeholder="Ngày phát hành"
              onChange={(value) => setEpisodeData({ ...episodeData, releaseDate: value.format("YYYY-MM-DD") })}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input movie description!",
              },
            ]}
          >
            <TextArea
              rows={5}
              onChange={(e) => setEpisodeData({ ...episodeData, description: e.target.value })}
              placeholder="Mô tả"
              className="input-description"
              style={{ width: "100%" }}
              value={episodeData.description}
            />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                message: "Please input episode link!",
              },
            ]}
          >
            <TextArea
              onChange={(e) => setEpisodeData({ ...episodeData, link: isValidUrl.isWebUri(e.target.value) ? e.target.value : '' })}
              placeholder="Link"
              className="input-description"
              style={{ width: "100%" }}
              value={episodeData.link}
            />
          </Form.Item>

          <Form.Item
            label="Poster"
            name="Poster"
            rules={[
              {
                required: false,
                message: "Please upload movie poster!",
              },
            ]}
          >
            <Upload
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([file]);
                setPosterFile(file);
                return false;
              }}
              onRemove={() => {
                setFileList([]);
                setPosterFile(null);
              }}
              showUploadList={{ showRemoveIcon: true }}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <div
              className="button-submit"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <Button
                htmlType="submit"
                style={{
                  color: "white",
                  borderColor: "red",
                  backgroundColor: "red",
                  width: 130,
                  height: 50,
                  fontSize: 20,
                  marginBottom: 10,
                }}
                onClick={postData}
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangeEpisode;
