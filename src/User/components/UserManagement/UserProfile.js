import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Modal, Form, Input, DatePicker, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import userIcon from "../Nav/UserIcon.png";
import "./UserProfile.scss";
import { UPDATE_DELETE_USER_API, CHANGE_PASSWORD_API, } from '../../../api';

function UserProfile() {
  const [form] = Form.useForm();
  const [userInfor, setUserInfor] = useState([]);
  const userId = window.localStorage.getItem('userId');
  const username = window.localStorage.getItem('username');

  const [email, setEmail] = useState('');
  const [gender, setGender] = useState("M");
  const [birth, setBirth] = useState("");
  // const [items, setItems] = useState([])

  const getUserInfor = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/", {
        method: "GET",
        headers: {
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`
        }
      })
      const responseData = await response.json();
      setUserInfor(responseData)


      console.log(responseData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserInfor();
  }, [])
  const updateUserProfile = async () => {

    try {
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
      const body = {};
      if (email !== "") {
        body.email = email;
      }
      if (gender !== "") {
        body.gender = gender;
      }
      if (birth !== "") {
        body.birth = birth;
      }
      const response = await fetch("http://localhost:8000/api/user/", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          gender: "F"
        }),
      });

      const responseData = await response.json();
      console.log(responseData)
      if (response.ok) {
        console.log("User profile updated successfully.");
        getUserInfor()
        // You may choose to do something here, e.g., close the modal or show a success message.
      } else {
        console.error("Failed to update user profile.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleChangePassword = async () => {
    if (old_password === "" || new_password === "") {

    } else if (new_password !== confirmPassword) {
      alert("Wrong confirm password")
    } else {
      try {
        const response = await fetch(CHANGE_PASSWORD_API, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `TOKEN ${window.localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            old_password,
            new_password,
          }),
        }
        )
        const responseData = await response.json();
        if (responseData.message === "password incorrect") {
          alert("Wrong old password")
        } else {
          setTimeout(() => {
            window.location.href = "../login"
          }, 1000)
        }
        console.log(responseData)
      } catch (error) {
        console.error(error)
      }
    }
  }
  const [item, setItems] = useState([])
  useEffect(() => {
    if (userInfor && Object.keys(userInfor).length > 0) {
      setItems([
        {
          key: '1',
          label: 'ID',
          children: userInfor.user.id,
        },
        {
          key: '2',
          label: 'Role',
          children: userInfor.user.username === 'administrator' ? 'Admin' : 'User',
        },
        {
          key: '3',
          label: 'Email',
          children: userInfor.user.email,
        },
        {
          key: '4',
          label: 'Username',
          children: userInfor.user.username,
        },
        {
          key: '5',
          label: 'First name',
          children: userInfor.user.first_name,
        },
        {
          key: '6',
          label: 'Birthday',
          children: userInfor.birth,
        },
        {
          key: '7',
          label: 'Gender',
          children: userInfor.gender[0] === "M" ? "Male" : "Female",
        },
      ]);
    }
  }, [userInfor])


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
  const handleCancelModalChangePW = () => {
    setIsModalChangePWOpen(false);
  }
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
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
            items={item}
          />

          <Button className="change-password" onClick={() => { showModalProfile(); form.setFieldsValue(item) }}>
            Edit Profile
          </Button>

          <Modal
            title="Edit Profile"
            open={isModalProfileOpen}
            onOk={() => { handleOk(); updateUserProfile(); }}
            onCancel={handleCancel}
            style={{ marginLeft: "28%" }}
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
                name="id"
                styles={{ marginTop: 20 }}
              >
                <Input type="text" disabled={true} size="large" defaultValue={userId} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"

              >
                <Input
                  type="text"
                  size="large"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
              >
                <Select
                  style={{
                    width: 120,
                  }}
                  size='large'
                  onChange={(value) => setGender(value)}
                  options={[
                    {
                      value: 'M',
                      label: 'Male',
                    },
                    {
                      value: 'F',
                      label: 'Female',
                    },

                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Birth"
                name="birth"

              >
                <DatePicker size="large" onChange={(date, dateString) => { setBirth(dateString); console.log(dateString) }} />
              </Form.Item>
              {/* <Form.Item
                label=""
                name="notice"
              > */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p style={{}}>*Để trống nếu không cần sửa</p>

              </div>
              {/* </Form.Item> */}
            </Form>
          </Modal>

          <Button className='change-password' onClick={showModalChangePW}>Change Password</Button>
          <Modal
            title="Change Password"
            open={isModalChangePWOpen}
            onCancel={handleCancelModalChangePW}
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
                    message: 'Please input your old password!',
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
                    message: 'Please input your new password!',
                  },
                ]}>
                <Input.Password
                  style={{ marginLeft: 20 }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Confirm"
                name="confirm password"
                rules={[
                  {
                    required: true,
                    message: 'Please input confirm password!',
                  },
                ]}>
                <Input.Password
                  style={{ marginLeft: 20 }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
