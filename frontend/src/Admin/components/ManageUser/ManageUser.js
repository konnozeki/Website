// Hiển thị danh sách người dùng
// Có thể xóa người dùng
// UserList.js
import { DeleteFilled, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Input, Space, Table, message, Popconfirm, ConfigProvider } from 'antd';
import "./ManageUser.scss"
import { ADMIN_LIST_USER_API, ADMIN_UPDATE_DELETE_USER_API } from '../../../api';

const ManageUser = () => {
  const [data, setData] = useState([]);

  const getUserInfor = useCallback(async () => {
    try {
      const response = await fetch(ADMIN_LIST_USER_API, {
        method: 'GET',
        headers: {
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`
        },
      });

      const responseData = await response.json();
      console.log(responseData);

      const array = responseData.map((obj, index) => ({
        ...obj,
        role: 'User',
        index: index + 1,
      }));

      const newDataSource = array.map((item) =>
        item.user.username === "administrator" ? { ...item, role: "Admin" } : item
      );

      const tableData = newDataSource.map(item => ({
        index: item.index,
        id: item.user.id,
        username: item.user.username,
        email: item.user.email,
        birth: item.birth,
        gender: item.gender,
        role: item.role, // Default role, modify as needed
      }));

      setData(tableData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getUserInfor();
  }, [getUserInfor]);

  const handleDeleteUser = async (key) => {
    try {
      const response = await fetch(ADMIN_UPDATE_DELETE_USER_API(key), {
        method: 'DELETE',
        headers: {
          Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
        },
      });

      const responseData = await response.json();
      getUserInfor()
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? 'black' : "grey",
          fontSize: 16
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      text
  });

  const columns = [
    {
      title: "ID",
      dataIndex: 'index',
      key: "index",
      width: "5%"
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Birth',
      dataIndex: 'birth',
      key: 'birth',
      ...getColumnSearchProps('birth'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      ...getColumnSearchProps('gender'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: "10%",
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "delete",
      width: "10%",
      render: (_, record, index) => (
        // Check if it's not the first row, then render the Popconfirm
        index !== 0 && (
          <a>
            <DeleteFilled style={{ color: "black", fontSize: 20 }} onClick={() => { handleDeleteUser(record.id); getUserInfor(); getUserInfor(); }} />
          </a>
        )
      ),
    }
  ];

  const handleUserDetail = (username) => {
    window.location.href = `/admin/user/detail/${username}`
  }

  return (
    <div className='manage-user-container'>
      <div className='manage-user-header'>
        <h1 className='manage-user-title'>Manage User</h1>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "red"
            },
            Table: {
              borderColor: "black",
            }
          },
        }}>
        <Table columns={columns} dataSource={data} onRow={(record) => {
          return {
            onClick: (e) => {
              // Check if the clicked element is not the "Delete" column
              if (!e.target.closest("a")) {
                handleUserDetail(record.username);
              }
            },
          };
        }} />
      </ConfigProvider>
    </div>
  )
};

export default ManageUser;
