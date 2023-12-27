import { React, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Tabs, ConfigProvider, Button } from 'antd';
import userIcon from "./UserIcon.png"
import adminIcon from "./icon-admin.png"
import "./Nav.scss"


const { TabPane } = Tabs;

const tabs = [
    { key: 'Home', title: 'Home', label: "Trang chủ", },
    { key: 'Movies', title: 'Movies', label: "Khám phá" },
    { key: 'Search', title: 'Search', label: "Tìm kiếm" },
    { key: 'User/Favourite', title: 'Favourite', label: "Danh sách phát" },

];

const Menus = [
    { key: "User/Profile", name: "Profile", url: "/User/Profile" },
    { key: 'History', name: 'Lịch sử', url: "/History" },
    { key: "Login", name: "Đăng xuất", url: "/Login" }
]

const MenusAdmin = [
    { key: "Admin/Profile", name: "Profile", url: "/Admin/Profile" },
    { key: "Admin", name: "Quản lý", url: '/Admin' },
    { key: 'History', name: 'Lịch sử', url: "/History" },
    { key: "Login", name: "Đăng xuất", url: "/Login" }
]
function Nav() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabChange = (url) => {
        setActiveTab(url);
        navigate(`/${url}`);
    };

    const [openUserChoice, setOpenUserChoice] = useState(false);
    const handleUserChoice = () => {
        setOpenUserChoice(!openUserChoice);
    }
    const menuRef = useRef();
    const imgRef = useRef();
    window.addEventListener("click", (e) => {
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpenUserChoice(false);
        }
    })

    const handleCheckLogin = (name) => {
        if (name === "Log out") {
            window.localStorage.removeItem("isLogedin")
            window.localStorage.removeItem("isAdmin")
            window.localStorage.removeItem("isUser")
            window.localStorage.removeItem("username");
            handleLogin();
        }
    }
    const admin = window.localStorage.getItem("isAdmin");
    const loginNavigate = useNavigate();
    const handleLogin = () => {
        loginNavigate(`/Login`);
    };
    const userNavigate = useNavigate();
    const [userActivateChoice, setUserActivateChoice] = useState(null);
    const handleUserActivateChoice = (url) => {
        setUserActivateChoice(url)
        userNavigate(`/${url}`);
    }

    return (
        <>
            <div>
                <Row justify="space-around" className="NavBar">
                    <a href="/Home">
                        <h1 className="navbar-logo">NETFLEX</h1>
                    </a>
                    <Col span={16}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Tabs: {
                                        itemColor: "white",
                                        itemHoverColor: "red",
                                        inkBarColor: "red",

                                    },
                                },
                            }}
                        >
                            <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabs}>
                            </Tabs>
                        </ConfigProvider>
                    </Col>

                    {(window.localStorage.getItem("isLogedin")) ?
                        <Col span={2}>
                            <div>
                                <img
                                    ref={imgRef}
                                    onClick={handleUserChoice}
                                    src={admin ? adminIcon : userIcon}
                                    alt="user"
                                    className="user-icon" />
                                {openUserChoice && <div className='user-choices' ref={menuRef}>

                                    <Tabs tabPosition='left' activeKey={userActivateChoice} onChange={handleUserActivateChoice}>

                                        {(admin) ? MenusAdmin.map((menu) => (
                                            <TabPane
                                                tab={<span className='choice' onClick={() => { handleCheckLogin(menu.name); handleUserActivateChoice(`Admin/${menu.name}`) }}>{menu.name}</span>}
                                                key={menu.key}
                                            >
                                            </TabPane>
                                        )) :
                                            Menus.map((menu) => (
                                                <TabPane
                                                    tab={<span className='choice' onClick={() => { handleCheckLogin(menu.name); handleUserActivateChoice(`User/${menu.name}`) }}>{menu.name}</span>}
                                                    key={menu.key}
                                                >
                                                </TabPane>
                                            ))
                                        }
                                    </Tabs>

                                </div>}
                            </div>

                        </Col>
                        :
                        <Col span={2}>
                            <Button className="signIn" onClick={() => { handleLogin(); handleCheckLogin(); }} >Sign In</Button>
                        </Col>
                    }

                </Row>

            </div>

        </>
    )
}

export default Nav;