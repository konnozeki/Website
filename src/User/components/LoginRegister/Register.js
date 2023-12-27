//Giao diện login
//Có thể gộp chung với register
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd';
import "./Register.scss"
import axios from 'axios';

const { Text } = Typography;
function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const registerButtonNavigate = useNavigate();
  const handleSubmit = async () => {

    if (username === '' || password === '' || email === '') {
    } else if (!email.includes("@gmail.com")) {
      alert("Invalid email format")
    }
    else {
      if ((username === 'admin' || username === "Admin")) {
        alert("Username mustn't be 'admin' or 'Admin'")
      } else {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/register/', {
            username,
            email,
            password,
          })
          console.log(response.data.user.id)
          if (response.data.token) {
            alert("Successfull!");
            registerButtonNavigate("/Home")
            window.localStorage.setItem("isLogedin", true)
            window.localStorage.setItem("isUser", true)
            window.localStorage.setItem("username", username)
            window.localStorage.setItem("email", email)
          }
        } catch (error) {
          alert("Account already exists!")
          console.error(error)
        }
      }
    }

  };

  return (
    <div className='register-container'>
      <div className='register'>
        <div className='title'>Register</div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 18,
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}

          >
            <Input type="text"
              value={email}
              onChange={handleEmailChange} />
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
            <Button type="primary" htmlType="submit" className='button-register' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>

          <Form.Item>
            <Text style={{ paddingLeft: "10%", color: "white" }}>
              Have account? <a href="/Login" className='sign-in-now'>Sign in now</a>
            </Text>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}

export default Register