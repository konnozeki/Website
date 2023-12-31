import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { LOGIN_API } from '../../../api';

const { Text } = Typography;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const loginButtonNavigate = useNavigate();
  const handleSubmit = async () => {
    if (username === '' || password === '') {
      // Handle empty username or password
    } else {
      try {

        const response = await fetch(LOGIN_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.token !== '') {
          // Store the token in localStorage
          window.localStorage.setItem('token', responseData.token);
          window.localStorage.setItem('userId', responseData.user.id)
          loginButtonNavigate('/home');
          window.localStorage.setItem('isLogedin', true);
          window.localStorage.setItem('isUser', true);
          window.localStorage.setItem('currentTab', '/home');
          if (username === 'administrator') window.localStorage.setItem('isAdmin', true);
          else window.localStorage.setItem('isUser', true);
          window.localStorage.setItem('username', username);
        } else {
          alert('Wrong username or password!');
        }
      } catch (error) {
        console.error(error);
        alert('Error during login');
      }
    }
  };

  const registerNavigate = useNavigate();

  const handleRegister = () => {
    registerNavigate('/register');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', minHeight: "100vh", backgroundColor: "rgb(45,45,45)" }}>
      <div className="login-container">
        <div className="login-box" style={{ border: '1px solid gray', padding: '25px', width: 500, borderRadius: '10px', backgroundColor: "white" }}>
          <h1 style={{ color: 'red', textAlign: 'center', marginBottom: '10%' }}>Đăng nhập</h1>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input type="text" value={username} onChange={handleUsernameChange} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password type="password" value={password} onChange={handlePasswordChange} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
              <Button
                type="primary"
                style={{ backgroundColor: 'red' }}
                htmlType="submit"
                className="button-login"
                onClick={handleSubmit}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex' }}>
                <p style={{ paddingLeft: '10%' }}>Người dùng mới? </p>
                <a href='/register' style={{ marginLeft: '10%' }}>
                  Đăng ký ngay
                </a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
