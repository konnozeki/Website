import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { REGISTER_API } from '../../../api';

const { Text } = Typography;

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const registerButtonNavigate = useNavigate();

  const handleSubmit = async () => {
    if (username === '' || password === '' || email === '') {
      // Handle empty fields
    } else if (!email.includes('@gmail.com')) {
      alert('Invalid email format');
    } else {
      if (username.toLowerCase() === 'admin') {
        alert("Username mustn't be 'admin'");
      } else {
        try {
          const response = await fetch(REGISTER_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
            }),
          });
  
          if (!response.ok) {
            // Check if the response status is 400 (Bad Request)
            if (response.status === 400) {
              const data = await response.json();
              if (data.username) {
                alert(`Username already exists.`);
              } else {
                alert('Account already exists!');
              }
            } else {
              // Handle other errors
              console.error(`Server error: ${response.status}`);
            }
            return;
          }
  
          const data = await response.json();
  
          if (data.token) {
            alert('Successful!');
            registerButtonNavigate('/login');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <div className="register-container">
        <div className="register-box" style={{ border: '1px solid gray', padding: '25px', width: 500, borderRadius: '10px' }}>
          <h1 style={{ color: 'red', textAlign: 'center', marginBottom: '10%' }}>Đăng ký</h1>
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
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="text" value={email} onChange={handleEmailChange} />
            </Form.Item>

            <Form.Item
              label="Password"
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
                className="button-register"
                onClick={handleSubmit}
              >
                Đăng ký
              </Button>
            </Form.Item>

            <Form.Item>
              <Text style={{ paddingLeft: '10%' }}>
                Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
              </Text>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
