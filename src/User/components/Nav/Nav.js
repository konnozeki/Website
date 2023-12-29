import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Tabs, ConfigProvider, Button } from 'antd';
import userIcon from "./UserIcon.png";
import adminIcon from "./icon-admin.png";
import "./Nav.scss";

const { TabPane } = Tabs;

const tabs = [
  { key: 'home', title: 'Home', label: "Trang chủ" },
  { key: 'movies', title: 'Movies', label: "Khám phá" },
  { key: 'search', title: 'Search', label: "Tìm kiếm" },
  { key: 'user/playlist', title: 'Favourite', label: "Danh sách phát" },
];

const tabsNotSignIn = [
  { key: 'home', title: 'Home', label: "Trang chủ" },
  { key: 'movies', title: 'Movies', label: "Khám phá" },
  { key: 'search', title: 'Search', label: "Tìm kiếm" },
];

const Menus = [
  { key: "user/profile", name: "Profile", url: "/user/profile" },
  { key: 'history', name: 'Lịch sử', url: "/history" },
  { key: "login", name: "Đăng xuất", url: "/login" },
];

const MenusAdmin = [
  { key: "admin/profile", name: "Profile", url: "/Admin/Profile" },
  { key: "admin", name: "Quản lý", url: '/Admin' },
  { key: 'history', name: 'Lịch sử', url: "/history" },
  { key: "login", name: "Đăng xuất", url: "/login" },
];

function Nav() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(window.localStorage.getItem('currentTab'));
  
  const handleTabChange = (url) => {
    setUserActivateChoice('')
    setActiveTab(url);
    window.localStorage.setItem('currentTab', url)
    navigate(`${url}`)

  };

  const [openUserChoice, setOpenUserChoice] = useState(false);
  const handleUserChoice = () => {
    setOpenUserChoice(!openUserChoice);
  };

  const menuRef = useRef();
  const imgRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpenUserChoice(false);
    }
  });

  const handleCheckLogin = (name) => {
    if (name === "Đăng xuất") {
      window.localStorage.removeItem("isLogedin");
      window.localStorage.removeItem("isAdmin");
      window.localStorage.removeItem("isUser");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("token");
      navigate('/home');
    }
  };

  const admin = window.localStorage.getItem("isAdmin");
  const loginNavigate = useNavigate();
  const handleLogin = () => {
    loginNavigate(`/login`);
    handleCheckLogin();
  };


  const [userActivateChoice, setUserActivateChoice] = useState(null);
  const handleUserActivateChoice = (url) => {
    setUserActivateChoice(url);
    setActiveTab('')
    window.localStorage.setItem('currentTab', url)
    navigate(`${url}`)
  };

  const username = window.localStorage.getItem("token");
  console.log(username);

  return (
    <>
      <div>
        <Row justify="space-around" className="NavBar">
          <a href="/home">
            <h1 className="navbar-logo">NETFLEX</h1>
          </a>
          <Col span={16}>
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    itemColor: "black",
                    itemHoverColor: "red",
                    inkBarColor: "red",
                  },
                },
              }}
            >
              {window.localStorage.getItem("token") !== null ? (
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  {tabs.map((tab) => (
                    <TabPane key={tab.key} tab={tab.label}>
                      {/* Content of each tab */}
                    </TabPane>
                  ))}
                </Tabs>
              ) : (
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  {tabsNotSignIn.map((tab) => (
                    <TabPane key={tab.key} tab={tab.label}>
                      {/* Content of each tab */}
                    </TabPane>
                  ))}
                </Tabs>
              )}
            </ConfigProvider>
          </Col>
          {username ? (
            <Col span={2}>
              <div>
                <img
                  ref={imgRef}
                  onClick={handleUserChoice}
                  src={admin ? adminIcon : userIcon}
                  alt="user"
                  className="user-icon"
                />
                {openUserChoice && (
                  <div className='user-choices' ref={menuRef}>
                    <Tabs tabPosition='left' activeKey={userActivateChoice} onChange={handleUserActivateChoice}>
                      {admin ? MenusAdmin.map((menu) => (
                        <TabPane key={menu.key} tab={<span className='choice' onClick={() => { handleCheckLogin(menu.name) }}>{menu.name}</span>}>
                          {/* Content of each menu item */}
                        </TabPane>
                      )) : Menus.map((menu) => (
                        <TabPane key={menu.key} tab={<span className='choice' onClick={() => { handleCheckLogin(menu.name) }}>{menu.name}</span>}>
                          {/* Content of each menu item */}
                        </TabPane>
                      ))}
                    </Tabs>
                  </div>
                )}
              </div>
            </Col>
          ) : (
            <Col span={2}>
              <Button type='primary' className="signIn" onClick={handleLogin}>Đăng nhập</Button>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default Nav;
