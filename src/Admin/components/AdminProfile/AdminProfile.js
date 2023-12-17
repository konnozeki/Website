//Giao diện Profile
//Có thể gộp chung với register
import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Button, Descriptions, Modal, Form, Input, DatePicker } from 'antd';

import userIcon from "../UserIcon.png"
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
  
  
function AdminProfile() {
  return (
    <>
      <div className='Profile-container'>
      <div className='Profile'>
      <div className='title'><img src={adminIcon} className='user-avatar' alt=''></img>
        </div>
        <Descriptions className="information" column={1} 
                        contentStyle={{fontSize: 20, marginTop: 20, marginRight: 20}} 
                        labelStyle={{fontSize: 20, marginTop: 20}} title="" items={items} />
        
      </div>    
      </div>
    </>
    
    )
}

export default AdminProfile;