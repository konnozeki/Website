//Hiển thị các chức năng cho Admin
import React from 'react';
import { Row, Col } from 'antd';
import "./AdminHome.scss"

const AdminHome = () => {


  return (
    <div className="admin-home-container">
      <div>
        <h1 className="title-admin-home">Quản lý</h1>
      </div>
      <div className="admin-feature">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div
              className="feature"
              onClick={() => (window.location.href = "./admin/movie")}
            >
              <a href="admin/movie" style={{ color: "white" }}>
                Phim
              </a>
            </div>
          </Col>
          <Col span={6}>
            <div
              className="feature"
              onClick={() => (window.location.href = "./admin/actor")}
            >
              <a href="admin/actor" style={{ color: "white" }}>
                Diễn viên
              </a>
            </div>
          </Col>
        </Row>
      </div>
      <div className="admin-feature">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div
              className="feature"
              onClick={() => (window.location.href = "./admin/category")}
            >
              <a href="admin/category" style={{ color: "white" }}>
                Thể loại
              </a>
            </div>
          </Col>
          <Col span={6}>
            <div
              className="feature"
              onClick={() => (window.location.href = "./admin/user")}
            >
              <a href="admin/user" style={{ color: "white" }}>
                Người dùng
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminHome;
