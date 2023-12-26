//Hiển thị các chức năng cho Admin
import React from 'react';
import { Row, Col } from 'antd';
import "./AdminHome.scss"

const AdminHome = () => {


  return (
    <div className='admin-home-container'>
      <div>
        <h1 className='title-admin-home'>Management</h1>
      </div>
      <div className='admin-feature'>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className='feature' onClick={() => window.location.href = "./Admin/AddMovie"}>
              <a href="Admin/AddMovie" style={{ color: "white" }}>Add Movie</a>
            </div>
          </Col>
          <Col span={6}>
            <div className='feature' onClick={() => window.location.href = "./Admin/ManageMovie"}>
              <a href="Admin/ManageMovie" style={{ color: "white" }}>Manage Movie</a>
            </div>
          </Col>
        </Row>

      </div>
      <div className='admin-feature'>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className='feature' onClick={() => window.location.href = "./Admin/ManageUser"}>
              <a href="Admin/ManageUser" style={{ color: "white" }}>Manage User</a>
            </div>
          </Col>

        </Row>
      </div>
    </div>


  );
};

export default AdminHome;
