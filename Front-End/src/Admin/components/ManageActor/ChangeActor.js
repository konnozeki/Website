import React, { useEffect, useState } from "react";
import { Input, Form, Button, Select, Space, Upload, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_UPDATE_DELETE_ACTOR_API, LIST_COUNTRY_API } from "../../../api";
import { UploadOutlined } from "@ant-design/icons";

const ChangeActor = () => {
  const navigate = useNavigate();
  const { actor_id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [defaultCountry, setDefaultCountry] = useState(85);

  const token = window.localStorage.getItem("token");
  const { TextArea } = Input;

  const postData = () => {
    form
      .validateFields()
      .then(async (values) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("gender", values.gender);
        formData.append("country", values.country);
        console.log(values.description)
        if (avatarFile) {
          formData.append("avatar", avatarFile);
        }

        try {
          const response = await fetch(
            
            ADMIN_UPDATE_DELETE_ACTOR_API(actor_id),
            {
              method: "PUT",
              headers: {
                Authorization: `TOKEN ${token}`,
              },
              body: formData,
            }
          );

          if (response.ok) {
            message.success("Actor changed successfully");
            navigate("/admin/actor");
          } else {
            message.error("Failed to change actor");
          }
        } catch (error) {
          console.error("Error posting data:", error);
        }
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const [countries, setCountries] = useState([]);
  useEffect(() => {
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
      
    fetch(ADMIN_UPDATE_DELETE_ACTOR_API(actor_id), {
      method: "GET",
      headers: {
        Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDefaultCountry(data.country.id);

        form.setFieldsValue({
          name: data.name,
          gender: data.gender,
          description: data.description,
          country: data.country.id,
        });
      })
      .catch((error) => {
        console.error("Error fetching actor data:", error);
      });
  }, [actor_id, form]);

  return (
    <div className="all-container">
      <h1 style={{ textAlign: "center", marginBottom: 10, color: "red" }}>
        Chỉnh sửa diễn viên
      </h1>
      <div className="add-actor-container">
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
          initialValues={{
            country: defaultCountry,
          }}
        >
          <Form.Item
            label="Tên diễn viên"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input actor name!",
              },
            ]}
          >
            <Input type="text" placeholder="Tên diễn viên" />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="M">Nam</Select.Option>
              <Select.Option value="F">Nữ</Select.Option>
            </Select>
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
              placeholder="Chọn quốc gia"
              onChange={(value) => {
                setDefaultCountry(value);
              }}
              options={countries}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input actor description!",
              },
            ]}
          >
            <TextArea rows={5} placeholder="Mô tả" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Ảnh đại diện"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[
              {
                required: false,
                message: "Please upload actor avatar!",
              },
            ]}
          >
            <Upload
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([file]);
                setAvatarFile(file);
                return false;
              }}
              onRemove={() => {
                setFileList([]);
                setAvatarFile(null);
              }}
              showUploadList={{ showRemoveIcon: true }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <div
              className="button-submit"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: 130,
                  height: 50,
                  fontSize: 20,
                  marginBottom: 10,
                  backgroundColor: 'red'
                }}
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

export default ChangeActor;
