import {React, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Tabs, Button } from 'antd';
import userIcon from "./UserIcon.png"
import "./Nav.scss"


const {TabPane} = Tabs;

const tabs = [
    { key: 'Home', title: 'Home', label:"Trang chủ",},
    { key: 'Movies', title: 'Movies', label:"Khám phá"},
    { key: 'Search', title: 'Search', label:"Tìm kiếm"},
    { key: 'User/Favourite', title: 'Favourite', label:"Danh sách phát"},

];

const Menus=[
    {key:"User/Profile", name:"Profile", url:"/User/Profile"},
    {key: 'History', name: 'Lịch sử', url:"/History"},
    {key:"Login", name:"Đăng xuất", url:"/Login"}
]

const MenusAdmin=[
    {key:"Admin/Profile", name:"Profile", url:"/Admin/Profile"},
    {key:"Admin", name:"Quản lý", url:'/Admin'},
    {key: 'History', name: 'Lịch sử', url:"/History"},
    {key:"Login", name:"Đăng xuất", url:"/Login"}
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
        if(e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpenUserChoice(false);
        }
    })
    
    const handleCheckLogin = (name) => {
        if(name === "Log out") {
            window.localStorage.removeItem("isLogedin")
            window.localStorage.removeItem("isAdmin")
            window.localStorage.removeItem("isUser")
            handleLogin();
        }
    }
    const login = window.localStorage.getItem("isLogedin");
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
        <>{window.localStorage.getItem("isLogedin") ? 
            <div>
                <Row justify="space-around" className="NavBar">
                    <a href="/Home">
                        <h1 className="navbar-logo">NETFLEX</h1>
                    </a>
                    <Col span={16}>
                    <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabs}>
                    </Tabs>  
                    </Col>
                    {/* Check login. If login, display name user, else display Sign In button */}
                    {/* Check Admin or User. If is Admin, url is "Admin" and UI is Admin's UI(avatar icon will be different) */}
                    {/* If is User, display User's UI */}
                    {/* {checkLogin ?  */}
                    {  
                        <Col span={2}>
                            <div>
                                <img 
                                    ref={imgRef}
                                    onClick={handleUserChoice}
                                    src={userIcon} 
                                    alt="user"
                                    className="user-icon" />
                                {openUserChoice && <div className='user-choices' ref={menuRef}>
                                    <ul>
                                        {

                                            <Tabs tabPosition='left' activeKey={userActivateChoice} onChange={handleUserActivateChoice}>
                                                
                                                {/*Muon doi sang Admin thi thay Menus -> MenusAdmin */}
                                                { (login && admin) ?  MenusAdmin.map((menu) => (
                                                    <TabPane 
                                                    tab={<span className='choice' onClick={() => {handleCheckLogin(menu.name); handleUserActivateChoice()}}>{menu.name}</span>}
                                                    key={menu.key}
                                                    >
                                                    </TabPane>
                                                )) :
                                                Menus.map((menu) => (
                                                    <TabPane 
                                                    tab={<span className='choice' onClick={() => {handleCheckLogin(menu.name); handleUserActivateChoice()}}>{menu.name}</span>}
                                                    key={menu.key}
                                                    >
                                                    </TabPane>
                                                ))
                                                }
                                            </Tabs>
                                            
                                        }
                                    </ul>
                                </div>}
                            </div>
                        
                        </Col>    
                        // :
                        // <Col span={2}>
                        //     <Button className="signIn" onClick={() => {handleLogin(); handleCheckLogin();}} >Sign In</Button>
                        // </Col> 
                    }
                
                </Row>
            
            </div>
        : <></>} 
        
                
        </>
    )
}

export default Nav;