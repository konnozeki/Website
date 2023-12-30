import React, { useEffect, useState, useCallback } from 'react'
import { Descriptions } from 'antd';
import { ADMIN_LIST_USER_API } from "../../../api"
import userIcon from "../UserIcon.png";
import adminIcon from "../icon-admin.png"
import { useParams } from 'react-router-dom';


function ManageUserDetail() {
    const params = useParams();
    const pathname = window.location.pathname;
    const username = pathname.split("/").pop();
    console.log(username)
    const [dataUser, setDataUser] = useState([])
    const [items, setItems] = useState([]);

    const getUserInfor = useCallback(async () => {
        let data = []
        try {
            const response = await fetch(ADMIN_LIST_USER_API, {
                method: 'GET',
                headers: {
                    Authorization: `TOKEN ${window.localStorage.getItem('token')}`
                },

            });
            const responseData = await response.json();
            console.log(responseData);
            data = responseData.find(item => item.user.username === username);

            setDataUser(data);

            console.log(dataUser)
        } catch (error) {
            console.error(error)
        }
    }, [params.id]);

    useEffect(() => {
        getUserInfor();
    }, [getUserInfor])
    useEffect(() => {
        // Conditionally set items when dataUser is not empty
        if (dataUser && Object.keys(dataUser).length > 0) {
            setItems([
                {
                    key: '1',
                    label: 'ID',
                    children: dataUser.user.id,
                },
                {
                    key: '2',
                    label: 'Role',
                    children: dataUser.user.username === 'administrator' ? 'Admin' : 'User',
                },
                {
                    key: '3',
                    label: 'Email',
                    children: dataUser.user.email,
                },
                {
                    key: '4',
                    label: 'Username',
                    children: dataUser.user.username,
                },
                {
                    key: '5',
                    label: 'Birthday',
                    children: dataUser.birth,
                },
                {
                    key: '6',
                    label: 'Gender',
                    children: dataUser.gender[0] === "M" ? "Male" : "Female",
                },
            ]);
        }
    }, [dataUser]);
    return (
        <div className="Profile-container">
            <div className="Profile">
                <div className="title">
                    <img src={username === "administrator" ? adminIcon : userIcon} className="user-avatar" alt=""></img>
                </div>

                <Descriptions
                    className="information"
                    column={1}
                    contentStyle={{ fontSize: 20, marginTop: 20, marginRight: 20 }}
                    labelStyle={{ fontSize: 20, marginTop: 20 }}
                    title=""
                    items={items}
                />


            </div>
        </div>
    )
}

export default ManageUserDetail