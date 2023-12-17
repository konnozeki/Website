//Thêm phim, xóa phim
import React, { useState } from 'react'
import { Input, Form, InputNumber, Tooltip, Button, Upload, Select, Space } from 'antd'
import { UploadOutlined, PoweroffOutlined } from '@ant-design/icons';
import "./AddMovie.scss"

const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };
  const title = "Input a number"
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Year"
        maxLength={16}
      />
    </Tooltip>
  );
};
const typeMovie = [
  {
    label: "Hanh dong",
    value: "Hanh dong"
  },
  {
    label: "Tinh cam",
    value: "Tinh cam"
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
              <NumericInput
                style={{
                  width: 120,
                  height: 40,
                }}
                value={year}
                onChange={setYear}
              />

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
                  allowClear
                  style={{
                    width: 400,
                    height: 40,
                    borderRadius: 10,
                  }}
                  placeholder="Select type movie"
                  onChange={handleChangeTypeMovie}
                  options={typeMovie}
                />
              </Space>
            </Form.Item>

            {/* <Form.Item
              name="Description"
              rules={[
                {
                  required: true,
                  message: 'Please input Description!',
                },
              ]}
            >

            </Form.Item> */}
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

            <Upload>
              <Button icon={<UploadOutlined />} style={{ height: 40 }}>Upload Movie Image</Button>
            </Upload>
          </Form>
        </div>

        <div className='upload'>
          <Upload maxCount={1}>
            <Button icon={<UploadOutlined />} style={{ marginTop: 10, height: 40 }}>Upload Movie poster</Button>
          </Upload>
          <Upload>
            <Button icon={<UploadOutlined />} style={{ marginTop: 307, height: 40 }}>Upload Actors</Button>
          </Upload>

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