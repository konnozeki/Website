import {React, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Tabs, Button } from 'antd';
import userIcon from "./UserIcon.png"
import "./Nav.scss"


const {TabPane} = Tabs;

const tabs = [
    { key: 'Home', title: 'Home', label:"Home",},
    { key: 'Movies', title: 'Movies', label:"Movies"},
    { key: 'TVSeries', title: 'TVSeries', label:"TVSeries"},
    { key: 'Search', title: 'Search', label:"Search"},

];

const Menus=[
    {key:"User/Profile", name:"Profile", url:"/User/Profile"},
    {key:"User/Favourite", name:"Favourite", url:'/User/Favourite'},
    {key:"Login", name:"Log out", url:"/Login"}
]

function Nav() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabChange = (url) => {
        setActiveTab(url);
        navigate(`/${url}`);
    };

    const loginNavigate = useNavigate();
    const handleLogin = () => {
        loginNavigate(`/Login`);
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
    
    const [checkLogin, setCheckLogin] = useState(false);
    const handleCheckLogin = () => {
        setCheckLogin(true);
    }
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
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    {tabs.map((tab) => (
                        <TabPane
                        tab={<span className='custom-tab'>{tab.title}</span>}
                        key={tab.key}
                        label={tab.label}
                        >
                        </TabPane>
                    ))}
                </Tabs>  
                </Col>
                {/* Check login. If login, display name user, else display Sign In button */}
                {/* Check Admin or User. If is Admin, url is "Admin" and UI is Admin's UI(avatar icon will be different) */}
                {/* If is User, display User's UI */}
                {checkLogin ? 
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
                                    // Menus.map((menu) => (
                                    //     <a href={menu.url}>
                                    //         <li key={menu.name} className="choice" onClick={handleUserChoice}>
                                    //             {menu.name}
                                    //         </li>
                                    //     </a> 
                                    // ))
                                    <Tabs tabPosition='left' activeKey={userActivateChoice} onChange={handleUserActivateChoice}>
                                        {Menus.map((menu) => (
                                            <TabPane 
                                            tab={<span className='choice' onClick={handleUserChoice}>{menu.name}</span>}
                                            key={menu.key}
                                            >
                                            </TabPane>
                                        ))}
                                    </Tabs> 
                                }
                            </ul>
                        </div>}
                    </div>
                    
                    </Col>    
                    :
                    <Col span={2}>
                    <Button className="signIn" onClick={() => {handleLogin(); handleCheckLogin();}} >Sign In</Button>
                </Col>}
            
            </Row>
            
        </div>
                
        </>
    )
}

export default Nav