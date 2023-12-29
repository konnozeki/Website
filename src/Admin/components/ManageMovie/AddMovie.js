import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Select, Space, DatePicker, Upload, message } from 'antd';
import { ADMIN_LIST_CREATE_FILM_API, LIST_ACTOR_API, LIST_CATEGORY_API } from '../../../api';

const AddMovie = () => {
  const [form] = Form.useForm();
  const [categoriesArray, setCategoriesArray] = useState([]); 

  const token = window.localStorage.getItem('token');
  const { TextArea } = Input;

  const postData = () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('release_date', year.format('YYYY-MM-DD'));
    formData.append('categories', categoriesArray);

    console.log("Category:", categoriesArray);
    formData.append('description', description);
    formData.append('actors', actor);
    formData.append('age_restriction', 0);
    console.log(file)
    formData.append('poster', file.file)
  
    fetch(ADMIN_LIST_CREATE_FILM_API, {
      method: 'POST',
      headers: {
        Authorization: `TOKEN ${token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };
  

  const [actors, setActors] = useState([]);
  useEffect(() => {
    fetch(LIST_ACTOR_API)
      .then(response => response.json())
      .then(data => {
        setActors(data.actors);
      })
      .catch(error => {
        console.error('Error fetching actor data:', error);
      });
  }, []);

  
  useEffect(() => {
    fetch(LIST_CATEGORY_API)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
  }, []);
  const [categories, setCategories] = useState([])
  const [actor, setActor] = useState([])
  const [year, setYear] = useState('');
  const [loadings, setLoadings] = useState([]);
  const [country, setCountry] = useState(85)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

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
    <div className='all-container'>
      <h1 style={{ textAlign: 'center', marginBottom: 10, color: 'red' }}>Thêm bộ phim</h1>
      <div className='add-movie-container'>
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
              margin: '0 auto',
            }}
            autoComplete="off"
            onFinish={postData}
            encType="multipart/form-data" // Thêm dòng này để đặt enctype là 'multipart/form-data'
          >
          <Form.Item
            label="Tên bộ phim"
            name="Name"
            rules={[
              {
                required: true,
                message: 'Please input Movie name!',
              },
            ]}
          >
            <Input onChange={(value)=>setName(value)} type="text" placeholder='Tên bộ phim' className='input-infor-movie' />
          </Form.Item>

          <Form.Item
            label="Ngày phát hành"
            name="release_date"
            rules={[
              {
                required: true,
                message: 'Please input Year product!',
              },
            ]}
          >
            <DatePicker style={{ width: '100%', height: 40, fontSize: 16 }} format="YYYY-MM-DD" placeholder="Ngày phát hành" onChange={(value)=>setYear(value)} />
          </Form.Item>

          <Form.Item
            label="Chọn thể loại"
            name="Type"
            rules={[
              {
                required: true,
                message: 'Please select movie type!',
              },
            ]}
          >
            <Space
              style={{
                width: '100%',
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                size="large"
                allowClear
                style={{
                  width: '100%',
                  borderRadius: 10,
                }}
                placeholder="Chọn thể loại"
                onChange={(value)=>{setCategoriesArray(value)}}
                options={categories.map(category => ({ label: category.name, value: category.id }))}
              />
            </Space>
          </Form.Item>


          <Form.Item
            label="Mô tả"
            name="Description"
            rules={[
              {
                required: true,
                message: 'Please input movie description!',
              },
            ]}
          >
            <TextArea rows={5} onChange={(value)=>{setDescription(value)}} placeholder='Mô tả' className='input-description' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Diễn viên"
            name="Actors"
            rules={[
              {
                required: true,
                message: 'Please select actors!',
              },
            ]}
          >
            <Select
              mode="multiple"
              size="large"
              allowClear
              style={{
                width: '100%',
                borderRadius: 10,
              }}
              placeholder="Chọn diễn viên"
              options={actors.map(actor => ({ label: actor.name, value: actor.id }))}
              onChange={(value)=>{setActor(value)}}
            />
          </Form.Item>


          <Form.Item
            label="Poster"
            name="Poster"
            valuePropName="fileList"
            rules={[
              {
                required: true,
                message: 'Please upload movie poster!',
              },
            ]}
          >
            <Input onChange={(value)=>setFile(value)} type="text" placeholder='URL Poster' />
          </Form.Item>


          <Form.Item>
            <div className='button-submit' style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                loading={loadings[0]}
                htmlType="submit" // Sử dụng htmlType để nút này hoạt động như một nút submit trong form
                style={{
                  color: 'white',
                  borderColor: 'red',
                  backgroundColor: 'red',
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
