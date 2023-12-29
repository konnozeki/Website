import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';
import { ADMIN_LIST_USER_API } from "../../../api"
import userIcon from "../UserIcon.png";
import adminIcon from "../icon-admin.png"


function ManageUserDetail() {
    const pathname = window.location.pathname;
    const username = pathname.split("/").pop();
    const [dataUser, setDataUser] = useState([])
    const getUserInfor = async () => {
        try {
            const response = await fetch(ADMIN_LIST_USER_API, {
                method: 'GET',
                headers: {
                    Authorization: `TOKEN ${window.localStorage.getItem('token')}`
                },

            });
            const responseData = await response.json();
            console.log(responseData);
            const array = responseData.find(item => item.username === username);
            setDataUser(array);

            console.log(dataUser)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUserInfor();
    }, [])
    const items = [
        {
            key: '1',
            label: 'ID',
            children: dataUser?.id,
        },
        {
            key: '2',
            label: 'Role',
            children: username === "administrator" ? "Admin" : "User",
        },
        {
            key: '3',
            label: 'Email',
            children: "email",
        },
        {
            key: '4',
            label: 'Username',
            children: dataUser?.username,
        },
        {
            key: '5',
            label: 'Birthday',
            children: "31/12/2023",
        },
        {
            key: '4',
            label: 'Gender',
            children: "Nam",
        },
    ];
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