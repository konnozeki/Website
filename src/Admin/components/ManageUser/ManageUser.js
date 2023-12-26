//Hiển thị danh sách người dùng
//Có thể xóa người dùng
// UserList.js
import { DeleteFilled, SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { Button, Input, Space, Table, message, Popconfirm, ConfigProvider, Select } from 'antd';
import "./ManageUser.scss"

const onConfirm = (e) => {
  message.success("Delete successfully!")
}
const generateData = (count) => {
  const data = [];

  for (let i = 1; i <= count; i++) {
    data.push({
      key: `${i}`,
      name: `Student ${i}`,
      sex: Math.random() < 0.5 ? "Male" : "Female",
      birth: "20/10/2023",
      role: Math.random() < 0.5 ? "Admin" : "User"
    });
  }

  return data;
};

const ManageUser = () => {
  const [data, setData] = useState(generateData(21));

  const handleRoleChange = (value, record) => {
    // Find the index of the updated record in the data array
    const dataIndex = data.findIndex(item => item.key === record.key);

    // Create a new copy of the data array
    const newData = [...data];

    // Update the role of the corresponding record
    newData[dataIndex] = {
      ...newData[dataIndex],
      role: value,
    };

    // Update the state with the modified data
    setData(newData);

    // Log the updated record
    console.log('Updated Record:', newData[dataIndex]);
  };
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
      dataIndex: 'key'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
      width: '20%',
      sorter: (a, b) => a.sex.localeCompare(b.sex)
    },
    {
      title: 'Birthday',
      dataIndex: 'birth',
      key: 'birth',
      width: '20%',

    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: "10%",
      render: (text, record) => (
        <Select
          defaultValue={record.role}
          style={{
            width: 120,
          }}
          onChange={(value) => handleRoleChange(value, record)}
          bordered={false}
          options={[
            {
              value: 'Admin',
              label: 'Admin',
            },
            {
              value: 'User',
              label: 'User',
            },

          ]}
        />
      ),
      sorter: (a, b) => a.role.localeCompare(b.role)
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: () => (
        <Popconfirm
          title="Delete movie"
          description="Are you sure to delete this movie?"
          onConfirm={onConfirm}
          okText="Yes"
          cancelText="No"
        >
          <DeleteFilled style={{ color: "black", fontSize: 20 }} />
        </Popconfirm>
      )
    }
  ];
  return (
    <div className='manage-user-container'>
      <div className='manage-user-header'>
        <h1 className='manage-user-title'>Mangage User</h1>
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
        <Table columns={columns} dataSource={data} />

      </ConfigProvider>
    </div>
  )
};
export default ManageUser;