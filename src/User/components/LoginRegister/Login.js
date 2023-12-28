//Giao diện login
//Có thể gộp chung với register
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd';
import "./Login.scss"
import axios from 'axios';

const { Text } = Typography;
function Login() {
  const [token, setToken] = useState("")
  window.localStorage.removeItem("isLogedin")
  window.localStorage.removeItem("isAdmin")
  window.localStorage.removeItem("isUser")

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
    } else if ((username === 'admin' || username === 'Admin') && password === '123') {
      // Handle admin login
      loginButtonNavigate('/Home');
      window.localStorage.setItem('isLogedin', true);
      window.localStorage.setItem('isAdmin', true);
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
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
          loginButtonNavigate('/Home');
          window.localStorage.setItem('isLogedin', true);
          window.localStorage.setItem('isUser', true);
          if(username === 'administrator') window.localStorage.setItem('isAdmin', true);
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
    registerNavigate('/Register');
  }
  return (
    <>
      <div className='login-container'>
        <div className='login'>
          <div className='title'>LOGIN</div>
          <Form
            name="basic"
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
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password type="password"
                value={password}
                onChange={handlePasswordChange} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className='button-login' onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>

            <Form.Item>

              <Text style={{ paddingLeft: "10%", color: "white" }}>
                New member? <p className='sign-up-now' onClick={handleRegister}>Sign up now</p>
              </Text>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>

  )
}

export default Login