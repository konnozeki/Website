import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Form, Button, Select, Space, DatePicker, Upload } from "antd";
import { useNavigate } from "react-router-dom";

import {
  ADMIN_LIST_CREATE_CATEGORY_API,
  ADMIN_LIST_CREATE_FILM_API,
  LIST_ACTOR_API,
  LIST_COUNTRY_API,
} from "../../../api";
import dayjs from "dayjs";

const AddMovie = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [posterFile, setPosterFile] = useState(null);

  const token = window.localStorage.getItem("token");
  const { TextArea } = Input;

  const postData = () => {
    const formData = new FormData();

    formData.append("name", name);
    console.log("name:" + name)
    console.log("release_date:" + releaseDate)
    console.log("age:" + ageRestriction)
    formData.append("release_date", releaseDate);
    categoriesArray.forEach((category) =>
      formData.append("categories", category)
    );
    console.log("category:" + categories)
    formData.append("country", country);
    formData.append("description", description);
    actorsArray.forEach((actor) => formData.append("actors", actor));
    console.log("actor" +  actors)
    formData.append("age_restriction", ageRestriction);

    if (posterFile) {
      formData.append("poster", posterFile);
    }


    fetch(ADMIN_LIST_CREATE_FILM_API, {
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
        navigate("/admin/movie/");
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
        Thêm bộ phim
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
              onChange={(e) => {
                console.log(e.target.value);
                setName(e.target.value);
              }}
              value={name}
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
              onChange={(moment, dateString) => setReleaseDate(dateString)}
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
              onChange={(e) => setAgeRestriction(parseInt(e.target.value, 10))}
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

                  setCategoriesArray(value);
                  console.log(categoriesArray);
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
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([file])
                setPosterFile(file); // Set the file to posterFile state
                return false;
              }}
              onRemove={() => {
                setFileList([]);
                setPosterFile(null); // Reset the posterFile state
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

export default AddMovie;
