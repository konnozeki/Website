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
} from "antd";
import { useNavigate } from "react-router-dom";

import {
  ADMIN_LIST_CREATE_CATEGORY_API,
  ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API,
  LIST_ACTOR_API,
  LIST_COUNTRY_API,
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
      country: 1,
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
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categoriesArray, setCategoriesArray] = useState([]);

  const token = window.localStorage.getItem("token");
  const { TextArea } = Input;

  const postData = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("release_date", releaseDate);
    categoriesArray.forEach((category) =>
      formData.append("categories", category)
    );
    formData.append("description", description);
    actorsArray.forEach((actor) => formData.append("actors", actor));
    formData.append("age_restriction", ageRestriction);
    if (false) {
      console.log(poster.file);
      formData.append("poster", poster.file);
    }

    fetch(ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API(id), {
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
        navigate("/admin/movie/"+id);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  const [actors, setActors] = useState([]);
  const [country, setCountry] = useState(85);
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

    fetch(LIST_COUNTRY_API)
      .then((response) => response.json())
      .then((data) => {
        setCountries(
          data.map((country) => ({
            label: country.name,
            value: country.id,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
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
        setCategoriesArray(data.film.categories);
        setDescription(data.film.description);
        setReleaseDate(data.film.release_date);
        setCountry(data.film.country);
        setActorsArray(data.film.actors);
        setAgeRestriction(data.film.age_restriction);
        form.setFieldsValue({
          name: data.film.name,
          release_date: dayjs(data.film.release_date, "YYYY-MM-DD"),
          description: data.film.description,
          country: data.country.name,
          age_restriction: data.film.age_restriction,
        });
      })
      .catch((error) => {
        console.error("Error fetching actor data:", error);
      });
  }, []);
  useEffect(() => {}, []);

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [actorsArray, setActorsArray] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [ageRestriction, setAgeRestriction] = useState(0);
  const [name, setName] = useState("");
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
        Chỉnh sửa bộ phim
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
            label="Giới hạn độ tuổi"
            name="age_restriction"
            rules={[
              {
                required: true,
                message: "Please input age restriction!",
              },
            ]}
          >
            <Input
              onChange={(value) => setAgeRestriction(value)}
              type="number"
              placeholder="Giới hạn độ tuổi"
              className="input-infor-movie"
              value={ageRestriction}
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
            label="Thể loại"
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
                placeholder="Thể loại"
                onChange={(value) => {
                  console.log(value);
                  setCategoriesArray(value);
                }}
                options={categories}
                value={categoriesArray}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Diễn viên"
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
                placeholder="Diễn viên"
                onChange={(value) => {
                  setActorsArray(value);
                }}
                options={actors}
                value={actorsArray}
              />
            </Space>
          </Form.Item>
          <Form.Item
            label="Quốc gia"
            name="country"
            rules={[
              {
                required: true,
                message: "Please select country!",
              },
            ]}
          >
            <Select
              size="large"
              allowClear
              style={{
                width: "100%",
                borderRadius: 10,
              }}
              placeholder="Quốc gia"
              onChange={(value) => {
                setCountry(value);
              }}
              options={countries}
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
                Sửa
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangeMovie;
