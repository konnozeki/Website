import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Input,
  Form,
  Button,
  Select,
  Space,
  DatePicker,
  Upload,
  message,
} from "antd";
import {
  ADMIN_LIST_CREATE_ACTOR_API,
  ADMIN_LIST_CREATE_CATEGORY_API,
  ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API,
  LIST_ACTOR_API,
} from "../../../api";
import dayjs from "dayjs";

const ChangeMovie = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    film: {
      id: 0,
      name: "",
      slug: "",
      description: "",
      actors: [],
      categories: [],
      country: 0,
      poster: "",
      age_restriction: 0,
      release_date: "2000-01-01",
    },
    actors: [],
    categories: [],
    country: {
      id: 0,
      name: "Vietnam",
      flag: "https://flagcdn.com/w320/vn.png",
      slug: "vietnam",
    },
  });
  const [form] = Form.useForm();
  const [categoriesArray, setCategoriesArray] = useState([]);

  const token = window.localStorage.getItem("token");
  const { TextArea } = Input;

  const postData = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("release_date", year.format("YYYY-MM-DD"));
    formData.append("categories", categoriesArray);

    console.log("Category:", categoriesArray);
    formData.append("description", description);
    formData.append("actors", actorsArray);
    formData.append("age_restriction", 0);
    console.log(file);
    formData.append("poster", file.file);

    fetch("http://localhost:8000/api/admin/film/", {
      method: "POST",
      headers: {
        Authorization: `TOKEN ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  const [actors, setActors] = useState([]);
  useEffect(() => {
    fetch(LIST_ACTOR_API, {
      headers: {
        Authorization: `TOKEN ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setActors(
          data.actors.map((actor) => ({
            label: actor.name,
            value: actor.id,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching actor data:", error);
      });
    fetch(ADMIN_LIST_CREATE_CATEGORY_API, {
      headers: {
        Authorization: `TOKEN ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(
          data.map((category) => ({
            label: category.name,
            value: category.id,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });

    fetch(ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API(id), {
      method: "GET",
      headers: {
        Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        console.log(data);
        setName(data.film.name);
        form.setFieldsValue({
          name: data.film.name,
          release_date: dayjs(data.film.release_date, "YYYY-MM-DD"),
          description: data.film.description,
        });
      })
      .catch((error) => {
        console.error("Error fetching actor data:", error);
      });
  }, []);
  useEffect(() => {}, []);

  const [categories, setCategories] = useState([]);
  const [actorsArray, setActorsArray] = useState([]);
  const [year, setYear] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [country, setCountry] = useState(85);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
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
        Chỉnh sửa bộ phim
      </h1>
      <div className="add-movie-container">
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            margin: "0 auto",
          }}
          autoComplete="off"
          onFinish={postData}
          encType="multipart/form-data" // Thêm dòng này để đặt enctype là 'multipart/form-data'
          initialValues={{
            ["name"]: name,
          }}
        >
          <Form.Item
            label="Tên bộ phim"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Movie name!",
              },
            ]}
          >
            <Input
              onChange={(value) => setName(value)}
              type="text"
              placeholder="Tên bộ phim"
              className="input-infor-movie"
            />
          </Form.Item>

          <Form.Item
            label="Ngày phát hành"
            name="release_date"
            rules={[
              {
                required: true,
                message: "Please input Year product!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%", height: 40, fontSize: 16 }}
              format="YYYY-MM-DD"
              placeholder="Ngày phát hành"
              onChange={(value) => setYear(value)}
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
            label="Chọn thể loại"
            name="categories"
            rules={[
              {
                required: true,
                message: "Please select movie type!",
              },
            ]}
          >
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                size="large"
                allowClear
                style={{
                  width: "100%",
                  borderRadius: 10,
                }}
                placeholder="Chọn thể loại"
                onChange={(value) => {
                  setCategoriesArray(value);
                }}
                options={categories}
                value={movieData.categories.map((category) => category.name)}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Chọn diễn viên"
            name="actors"
            rules={[
              {
                required: true,
                message: "Please select actors!",
              },
            ]}
          >
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                size="large"
                allowClear
                style={{
                  width: "100%",
                  borderRadius: 10,
                }}
                placeholder="Chọn thể loại"
                onChange={(value) => {
                  setActorsArray(value);
                }}
                options={actors}
                value={movieData.actors.map((category) => category.name)}
              />
            </Space>
          </Form.Item>
          <Form.Item
            label="Poster"
            name="Poster"
            rules={[
              {
                required: true,
                message: "Please upload movie poster!",
              },
            ]}
          >
            <Input
              onChange={(value) => setFile(value)}
              type="text"
              placeholder="URL Poster"
            />
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

export default ChangeMovie;
