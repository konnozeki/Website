//Giao diện login
//Có thể gộp chung với register
import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd';
import "./Register.scss"

const {Text} = Typography;
function Register() {

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const registerButtonNavigate = useNavigate();
  const handleSubmit = () => {
    
    if(username === '' || password === '' || confirmPassword === '') {
    } else {
      if(username === 'admin' && password !== '' && confirmPassword !== '') {
        alert("Username mustn't be 'admin' or 'Admin'")
      } else if (password !== confirmPassword) {
        alert("Wrong password!")
      } else {
        alert("Successful")
        registerButtonNavigate("/Home")
        window.localStorage.setItem("isLogedin", true)
        window.localStorage.setItem("isUser", true)
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
              message:  'Please input your username!',
            },
          ]}
          
        >
        <Input  type="text"
                value={username}
                onChange={handleUsernameChange}/>
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
                          onChange={handlePasswordChange}/>
        </Form.Item>

        <Form.Item
          label="Confirm"
          name="confirm-password"
          rules={[
            {
              required: true,
              message: 'Confirm password!',
            },
          ]}
        >
          <Input.Password type="password"
                          value={confirmPassword}
                          onChange={handleConfirmPassword}/>
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
          <Text style={{paddingLeft: "10%"}}>
            Have account? <a href="/Login" className='sign-in-now'>Sign in now</a>
          </Text>
        </Form.Item>
      </Form>
    </div>    
    </div>
    
    )
}

export default Register