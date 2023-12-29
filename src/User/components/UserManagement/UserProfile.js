import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Modal, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import userIcon from "../Nav/UserIcon.png";
import "./UserProfile.scss";
import { UPDATE_DELETE_USER_API, CHANGE_PASSWORD_API } from '../../../api';

function UserProfile() {
  const token = window.localStorage.getItem('token');
  const [userInfor, setUserInfor] = useState([]);
  const userId = window.localStorage.getItem('userId');
  const username = window.localStorage.getItem('username');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Set the email state when component mounts
    setEmail("example@gmail.com"); // You can replace this with the actual email
  }, []);

  const updateUserProfile = async () => {
    try {
      if (!userId) {
        console.error("User ID not found.");
        return;
      }

      const response = await fetch(UPDATE_DELETE_USER_API(userId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `TOKEN ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("User profile updated successfully.");
        // You may choose to do something here, e.g., close the modal or show a success message.
      } else {
        console.error("Failed to update user profile.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch(CHANGE_PASSWORD_API, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `TOKEN ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          old_password,
          new_password,
        }),
      }
      )
      const responseData = await response.json();
      console.log(responseData)
    } catch (error) {
      console.error(error)
    }
  }
  const items = [
    {
      key: '1',
      label: 'ID',
      children: `#${userId}`,
    },
    {
      key: '2',
      label: 'Role',
      children: "User",
    },
    {
      key: '3',
      label: 'Email',
      children: email,
    },
    {
      key: '4',
      label: 'Username',
      children: username,
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
    handleChangePassword();
    setIsModalChangePWOpen(false);
  };
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const ModalButtonChangePW = () => (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" onClick={() => { handleOkChangePW(); }}>
        Save Change
      </Button>
    </div>
  );
  const ModalButtons = () => (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" onClick={() => { handleOk(); updateUserProfile(); }}>
        Save Changes
      </Button>
    </div>
  );

  return (
    <>
      <div className="Profile-container">
        <div className="Profile">
          <div className="title">
            <img src={userIcon} className="user-avatar" alt=""></img>
          </div>

          <Descriptions
            className="information"
            column={1}
            contentStyle={{ fontSize: 20, marginTop: 20, marginRight: 20 }}
            labelStyle={{ fontSize: 20, marginTop: 20 }}
            title=""
            items={items}
          />

          <Button className="change-password" onClick={showModalProfile}>
            Edit Profile
          </Button>

          <Modal
            title="Edit Profile"
            open={isModalProfileOpen}
            onOk={() => { handleOk(); updateUserProfile(); }}
            onCancel={handleCancel}
            style={{ marginTop: 100, marginLeft: "28%" }}
            footer={<ModalButtons />}
          >
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
              autoComplete="off"
            >
              <Form.Item
                label="ID"
                name="ID"
                styles={{ marginTop: 20 }}
              >
                <Input type="text" disabled={true} size="large" defaultValue={items[0].children} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  type="text"
                  size="large"
                  defaultValue={items[2].children}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                <Input type="text" disabled={true} size="large" defaultValue={items[3].children} />
              </Form.Item>
            </Form>
          </Modal>

          <Button className='change-password' onClick={showModalChangePW}>Change Password</Button>
          <Modal
            title="Change Password"
            open={isModalChangePWOpen}
            style={{ marginTop: 80, marginLeft: "28%" }}
            footer={<ModalButtonChangePW />}
          >
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
                  onChange={(e) => setOldPassword(e.target.value)}
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
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>

        </div>
      </div>
    </>
  );
}

export default UserProfile;
