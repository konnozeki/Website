//Giao diện Profile
//Có thể gộp chung với register
import React, { useState } from 'react'
import { Descriptions, Form, Input, Button, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import adminIcon from "../icon-admin.png"
import "./AdminProfile.scss"

const items = [
  {
    key: '1',
    label: 'ID',
    children: '#Admin',
  },
  {
    key: '2',
    label: 'Role',
    children: '#Admin',
  },
  {
    key: '3',
    label: 'Email',
    children: 'Vuong12345@gmail.com',
  },
  {
    key: '4',
    label: 'Username',
    children: 'Vuong',
  },
  {
    key: '5',
    label: 'DOB',
    children: '2003/1/1',
  },

];


function AdminProfile() {
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
      <div className='admin-profile-container'>
        <div className='admin-profile'>
          <div className='title'><img src={adminIcon} className='user-avatar' alt=''></img>
          </div>
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

export default AdminProfile;