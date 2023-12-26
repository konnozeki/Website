//Thêm phim, xóa phim
import React, { useState } from 'react'
import { Input, Form, InputNumber, Button, Select, Space } from 'antd'
import "./AddMovie.scss"

const typeMovie = [
  {
    label: "Action",
    value: "Action"
  },
  {
    label: "Romance",
    value: "Romance"
  },
  {
    label: "Comedy",
    value: "Comedy"
  },
  {
    label: "Science Fiction",
    value: "Science Fiction"
  },
  {
    label: "Adventure",
    value: "Adventure"
  },
  {
    label: "Horror",
    value: "Horror"
  },
  {
    label: "Thriller",
    value: "Thriller"
  },
  {
    label: "Family",
    value: "Family"
  },
  {
    label: "Drama",
    value: "Drama"
  },
  {
    label: "School",
    value: "School"
  }
];

const handleChangeTypeMovie = (value) => {
  console.log(`selected ${value}`);
};


const { TextArea } = Input
function AddMovie() {
  const [year, setYear] = useState('');

  const [loadings, setLoadings] = useState([]);
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
      <div className='manage-title'>
        Add Movie
      </div>
      <div className='add-movie-container'>
        <div className='add-infor-movie'>
          <Form name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}

            autoComplete="off">

            <Form.Item
              name="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input Movie name!',
                },
              ]}
            >
              <Input type="text" placeholder='Movie name' className='input-infor-movie' />

            </Form.Item>
            <Form.Item
              name="Year"
              rules={[
                {
                  required: true,
                  message: 'Please input Year product!',
                },
              ]}
            >

              <InputNumber style={{ width: 120, height: 40, fontSize: 16 }} placeholder="Year" onChange={setYear} value={year} />

            </Form.Item>
            <Form.Item
              name="Type"

            >
              {/* <Input type="text" placeholder='Movie type' className='input-infor-movie' /> */}
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
                    width: 400,
                    borderRadius: 10,
                  }}
                  placeholder="Select type movie"
                  onChange={handleChangeTypeMovie}
                  options={typeMovie}
                />
              </Space>
            </Form.Item>


            <TextArea rows={5} placeholder='Description' required={true} className='input-description' style={{ width: 400 }} />


            <Form.Item
              name="Actors"
              rules={[
                {
                  required: false
                }
              ]}
            >
              <Input type="text" placeholder='Name Actors' className='input-infor-movie' />
            </Form.Item>

            <Form.Item
              name="trailer"
              rules={[
                {
                  required: true,
                  message: "Link trailer youtube."
                }
              ]}
            >
              <Input type="text" placeholder='Link trailer' className='input-infor-movie' />
            </Form.Item>

            {/* <Upload>
              <Button icon={<UploadOutlined style={{ color: "red" }} />} style={{ height: 40 }}>Upload Movie Image</Button>
            </Upload> */}
            <Input style={{ width: 400, height: 40, marginBottom: 20 }} placeholder='Link picture movie' size='medium' />

          </Form>
        </div>

        <div className='upload'>
          {/* <Upload maxCount={1}>
            <Button icon={<UploadOutlined style={{ color: "red" }} />} style={{ marginTop: 10, height: 40 }}>Upload Movie poster</Button>
          </Upload> */}
          <Input style={{ width: 400, marginTop: 10, height: 40 }} placeholder='Link picture movie poster' size='medium' />

          {/* <Upload>
            <Button icon={<UploadOutlined style={{ color: "red" }} />} style={{ marginTop: 307, height: 40 }}>Upload Actors</Button>
          </Upload> */}

        </div>
      </div>

      <div className='button-submit'>
        <Button loading={loadings[0]} onClick={() => enterLoading(0)} style={{ color: "white", backgroundColor: "red", width: 130, height: 50, fontSize: 20 }}>
          Submit
        </Button>
      </div>
    </div>

  )
}

export default AddMovie