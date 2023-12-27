//Giao diện Profile

import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Modal, Form, Input, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import userIcon from "../Nav/UserIcon.png"
import "./UserProfile.scss"
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const params = useParams()
  const [userInfor, setUserInfor] = useState([]);
  const userUserName = window.localStorage.getItem("username")
  const userEmail = window.localStorage.getItem("email")
  const getUserInfor = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/generic/user/")
      console.log(response.data)
      setUserInfor(response.data.filter(item => item.username === userUserName));
      console.log(userInfor[0]?.id)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserInfor();
  }, [params.id])

  const items = [
    {
      key: '1',
      label: 'ID',
      children: `#${userInfor[0]?.id}`,
    },
    {
      key: '2',
      label: 'Role',
      children: "User",
    },
    {
      key: '3',
      label: 'Email',
      children: userEmail ? userEmail : "Vuong123@gmail.com",
    },
    {
      key: '4',
      label: 'Username',
      children: userUserName,
    },

  ];
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const showModalProfile = () => {
    setIsModalProfileOpen(true);
  };
  const handleOk = () => {
    setIsModalProfileOpen(false);
  };
  const handleCancel = () => {
    setIsModalProfileOpen(false);
  };

  const [isModalChangePWOpen, setIsModalChangePWOpen] = useState(false);
  const showModalChangePW = () => {
    setIsModalChangePWOpen(true);
  };
  const handleOkChangePW = () => {
    setIsModalChangePWOpen(false);
  };
  const handleCancelChangePW = () => {
    setIsModalChangePWOpen(false);
  };

  return (
    <>
      <div className='Profile-container'>
        <div className='Profile'>

          <div className='title'><img src={userIcon} className='user-avatar' alt=''></img>
          </div>

          <Descriptions className="information" column={1}
            contentStyle={{ fontSize: 20, marginTop: 20, marginRight: 20 }}
            labelStyle={{ fontSize: 20, marginTop: 20 }} title="" items={items} />

          <Button className='change-password' onClick={showModalProfile}> Edit Profile</Button>
          <Modal title="Edit Profile" open={isModalProfileOpen} onOk={handleOk} onCancel={handleCancel} style={{ marginTop: 100, marginLeft: "28%" }}>
            <Form
              name="change information"
              labelCol={{
                span: 6,
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
                label="ID"
                name="ID"
                styles={{ marginTop: 20 }}
              >
                <Input type="text" disabled={true} size='large' placeholder='#1' />
              </Form.Item>

              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type="text" size='large' defaultValue={items[2].children} />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input type="text" size='large' defaultValue={items[3].children} />
              </Form.Item>

            </Form>
          </Modal>


          <Button className='change-password' onClick={showModalChangePW}>Change Password</Button>
          <Modal title="Change Password" open={isModalChangePWOpen} onOk={handleOkChangePW} onCancel={handleCancelChangePW} style={{ marginTop: 80, marginLeft: "28%" }}>
            <Form name="change password"
              labelCol={{
                span: 6,
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
              <Form.Item label="Old Password"
                name="old password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}>
                <Input.Password
                  style={{ marginLeft: 20 }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item label="New Password"
                name="new password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}>
                <Input.Password
                  style={{ marginLeft: 20 }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>

  )
}

export default UserProfile;