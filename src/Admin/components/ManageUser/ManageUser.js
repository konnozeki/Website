//Hiển thị danh sách người dùng
//Có thể xóa người dùng
// UserList.js
import { DeleteFilled, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table, message, Popconfirm, ConfigProvider, Select } from 'antd';
import "./ManageUser.scss"
import { ADMIN_LIST_USER_API, ADMIN_UPDATE_DELETE_USER_API } from '../../../api';


const onConfirm = (e) => {
  message.success("Delete successfully!")
  console.log(e)
}

const ManageUser = () => {
  const [data, setData] = useState([]);

  const getUserInfor = async () => {
    try {
      const response = await fetch(ADMIN_LIST_USER_API, {
        method: 'GET',
        headers: {
          'Authorization': `TOKEN ${window.localStorage.getItem('token')}`
        },

      });
      const responseData = await response.json();
      console.log(responseData)
      const array = responseData.map(obj => ({ ...obj, role: 'User' }));
      const newDataSource = array.map((item) =>
        item.username === "administrator" ? { ...item, role: "Admin" } : item
      );
      // setData(...data, array)
      setData(newDataSource)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUserInfor()
  }, [])

  const handleDeleteUser = async (key) => {
    try {
      const response = await fetch(ADMIN_UPDATE_DELETE_USER_API(key), {
        method: 'DELETE',
        headers: {
          Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
        },
      })
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error)
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
      dataIndex: 'id',
      key: "id",
      width: "5%"
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      // width: '30%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // width: '30%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: "10%",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: "10%",
      render: (_, record, index) => (
        // Check if it's not the first row, then render the Popconfirm
        index !== 0 && (
          <Popconfirm
            title="Delete movie"
            description="Are you sure to delete this movie?"
            onConfirm={() => { handleDeleteUser(record.id); handleDeleteUser(); getUserInfor(); }}  // Assuming record.id is the identifier for the row
            okText="Yes"
            cancelText="No"
          >
            <DeleteFilled style={{ color: "black", fontSize: 20 }} />
          </Popconfirm>)
      )
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
            onClick: () => { handleUserDetail(record.username) },
          };
        }} />

      </ConfigProvider>
    </div>
  )
};
export default ManageUser;