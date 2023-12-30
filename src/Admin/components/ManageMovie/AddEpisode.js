import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Form, Button, Select, Space, DatePicker, Upload } from "antd";
import { useNavigate } from "react-router-dom";

import {
  ADMIN_LIST_CREATE_CATEGORY_API,
  ADMIN_LIST_CREATE_FILM_API,
  ADMIN_LIST_CREATE_FILM_EPISODE_API,
  LIST_ACTOR_API,
  LIST_COUNTRY_API,
} from "../../../api";
import dayjs from "dayjs";

const AddEpisode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const token = window.localStorage.getItem("token");
  const { TextArea } = Input;

  const postData = () => {
    const formData = new FormData();
    formData.append("episode", episode);
    formData.append("release_date", releaseDate);
    formData.append("description", description);
    formData.append("link", link);
    if (false) {
      console.log(poster.file);
      formData.append("poster", poster.file);
    }
    fetch(ADMIN_LIST_CREATE_FILM_EPISODE_API(id), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `TOKEN ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        //navigate("/admin/movie/" + id);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };
  const [episode, setEpisode] = useState(1);
  const [link, setLink] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [loadings, setLoadings] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  useEffect(() => {}, []);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  return (
    <div className="all-container">
      <h1 style={{ textAlign: "center", marginBottom: 10, color: "red" }}>
        Thêm tập phim
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
          encType="multipart/form-data" // Thêm dòng này để đặt enctype là 'multipart/form-data'
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
              onChange={(value) => {
                setEpisode(value);
              }}
              placeholder="Tập"
              className="input-infor-movie"
              value={episode}
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
              onChange={(value) => setReleaseDate(value)}
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
              onChange={(value) => {
                setDescription(value);
              }}
              placeholder="Mô tả"
              className="input-description"
              style={{ width: "100%" }}
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
              onChange={(value) => {
                setLink(value);
              }}
              placeholder="Link"
              className="input-description"
              style={{ width: "100%" }}
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
              multiple={false}
              showUploadList={true}
              onChange={(value) => {
                setPoster(value);
              }}
              value={poster}
              maxCount={1}
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
                loading={loadings[0]}
                htmlType="submit" // Sử dụng htmlType để nút này hoạt động như một nút submit trong form
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
                Thêm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddEpisode;
