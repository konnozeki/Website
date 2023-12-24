//Giao diện login
//Có thể gộp chung với register
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd';
import "./Login.scss"

const { Text } = Typography;
function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const loginNavigate = useNavigate();
  const handleLogin = () => {
    loginNavigate('/Login');
  }
  return (
    <>
      <div className='login-container'>
        <div className='login' style={{ paddingTop: "5%" }}>
          <div className='title'>Forgot Password</div>
          <Form
            name="basic"
            labelCol={{
              span: 10,
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
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input type="text"
                value={username}
                onChange={handleUsernameChange} />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="new-password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
            >
              <Input.Password type="password"
                value={newPassword}
                onChange={handleNewPasswordChange} />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm-password"
              rules={[
                {
                  required: true,
                  message: 'Please input confirm password!',
                },
              ]}
            >
              <Input.Password type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className='button-login' onClick={handleLogin}>
                Submit
              </Button>
            </Form.Item>

            <Form.Item>
              <Text style={{ paddingLeft: "10%", color: "white" }}>
                Already member? <Text>
                  <p className='forgot-password' onClick={handleLogin}>Login</p>
                </Text>
              </Text>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>

  )
}

export default ForgotPassword