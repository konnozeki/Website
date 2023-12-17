//Giao diện Profile

import React, { useState } from 'react'
import { Button, Descriptions, Modal, Form, Input, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import userIcon from "../Nav/UserIcon.png"
import "./UserProfile.scss"

const items = [
  {
    key: '1',
    label: 'ID',
    children: '#1',
  },
  {
    key: '2',
    label: 'Email',
    children: 'Vuong12345@gmail.com',
  },
  {
    key: '3',
    label: 'Username',
    children: 'Vuong',
  },
  {
    key: '4',
    label: 'DOB',
    children: '2003/1/1',
  },

];


function UserProfile() {
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
            <Button className='edit-profile' onClick={showModalProfile}> Edit Profile</Button>
          </div>
          <Modal title="Edit Profile" open={isModalProfileOpen} onOk={handleOk} onCancel={handleCancel} style={{ marginTop: 100, marginLeft: "28%" }}>
            <Form
              name="basic"
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
                <Input type="text" size='large' defaultValue={items[1].children} />
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
                <Input type="text" size='large' defaultValue={items[2].children} />
              </Form.Item>

              <Form.Item
                label="DOB"
                name="DOB"
                rules={[
                  {
                    required: true,
                    message: "Select your birth!",
                  }
                ]}>
                <DatePicker size='large' style={{ bordered: true, borderColor: "black" }} />
              </Form.Item>
            </Form>
          </Modal>
          <Descriptions className="information" column={1}
            contentStyle={{ fontSize: 20, marginTop: 20, marginRight: 20 }}
            labelStyle={{ fontSize: 20, marginTop: 20 }} title="" items={items} />

          <Button className='change-password' onClick={showModalChangePW}>Change Password</Button>
          <Modal title="Change Password" open={isModalChangePWOpen} onOk={handleOkChangePW} onCancel={handleCancelChangePW} style={{ marginTop: 80, marginLeft: "28%" }}>
            <Form name="basic"
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
                  placeholder="input password"
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
                  placeholder="input password"
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