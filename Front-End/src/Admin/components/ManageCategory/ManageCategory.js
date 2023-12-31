//Hiển thị danh sách người dùng
//Có thể xóa người dùng
// UserList.js
import { DeleteFilled, SearchOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table, message, Popconfirm, ConfigProvider, Form, Modal } from 'antd';
import "./ManageCategory.scss"
import { ADMIN_LIST_CREATE_CATEGORY_API, LIST_CATEGORY_API, ADMIN_DELETE_CATEGORY_API, CATEGORY_INFO_API } from "../../../api"

const onConfirmDelete = (e) => {
    message.success("Delete successfully!")
    console.log(e)
}
const onConfirmChange = (e) => {
    message.success("Change successfully!")
}

const ManageCategory = () => {
    const [formEdit] = Form.useForm();

    const [isModalAddCategoryOpen, setIsModalAddCategoryOpen] = useState(false);
    const showModal = () => {
        setIsModalAddCategoryOpen(true);
    };
    const handleOk = () => {
        if (name === "" || description === "") {
            alert("Fill all fields")
        } else {
            message.success("Add successfully!")
            handleAddCategory();
            getListCategory();
            setIsModalAddCategoryOpen(false);

        }

    };
    const handleCancel = () => {
        setIsModalAddCategoryOpen(false);
        setName("")
        setDescription("")
    };

    const [data, setData] = useState([]);

    const getListCategory = async () => {
        try {
            const response = await fetch(LIST_CATEGORY_API, {
                method: 'GET',
                headers: {
                    Authorization: `TOKEN ${window.localStorage.getItem('token')}`

                },

            });

            const responseData = await response.json();
            const array = responseData.map((item, index) => ({ ...item, index: index + 1 }));
            console.log(responseData);
            setData(array);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getListCategory()
    }, [])

    const [name, setName] = useState("");
    const [description, setDescription] = useState("")

    const handleAddCategory = async () => {
        if (name === "" || description === "") {

        } else {
            try {
                const response = await fetch(ADMIN_LIST_CREATE_CATEGORY_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `TOKEN ${window.localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        name,
                        description,
                    }),
                });
                const responseData = await response.json();
                console.log(responseData)
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleDeleteCategory = async (key) => {
        try {
            const response = await fetch(ADMIN_DELETE_CATEGORY_API(key), {
                method: "DELETE",
                headers: {
                    Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
                }
            })
            const responseData = await response.json();
            console.log(responseData)
        } catch (error) {
            console.error(error)
        }
    }
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [nameCategoryEdit, setCategoryEdit] = useState("");
    const [descriptionEdit, setDescriptionEdit] = useState("")
    const [isModalEditCategoryOpen, setIsModalEditCategoryOpen] = useState(false);
    const showModalEditCategory = () => {
        setIsModalEditCategoryOpen(true);
    }
    const handleCancelShowModalEditCategory = () => {
        setIsModalEditCategoryOpen(false);
        setCategoryEdit("");
        setDescriptionEdit("")
        setSelectedCategory(0);
    }
    const handleEditCategory = async (key) => {

        try {
            const response = await fetch(ADMIN_DELETE_CATEGORY_API(key), {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `TOKEN ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: nameCategoryEdit + "",
                    description: descriptionEdit + "",
                }),
            })
            const responseData = await response.json();
            console.log(responseData)
        } catch (error) {
            console.error(error)
        }

        getListCategory();
        setIsModalEditCategoryOpen(false)
        setSelectedCategory(0)
        setIsModalEditCategoryOpen(false)

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
            title: 'Tên thể loại',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "10%",
            render: (_, record, index) => (
                <>

                    <EditOutlined style={{ color: "black", fontSize: 20, marginRight: "50%", cursor: "pointer" }}
                        onClick={() => {
                            setSelectedCategory(record.id); showModalEditCategory();
                            formEdit.setFieldsValue(record); setCategoryEdit(record.name);
                            setDescriptionEdit(record.description)
                        }} />

                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => { onConfirmDelete(record.id); handleDeleteCategory(record.id); getListCategory(); getListCategory() }}  // Assuming record.id is the identifier for the row
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteFilled style={{ color: "black", fontSize: 20, }} />
                    </Popconfirm>
                </>


            )
        }
    ];

    return (
        <div className='manage-category-container'>
            <div className='manage-category-header'>
                <h1 className='manage-category-title'>Mangage Category</h1>
            </div>
            <Button onClick={() => { showModal(); console.log(name, description) }} icon={<PlusOutlined />}>Add category</Button>
            <Modal

                title="Add Category"
                open={isModalAddCategoryOpen}
                onOk={() => { handleOk(); getListCategory() }}
                onCancel={handleCancel}
                afterClose={() => { setName(""); setDescription(""); }}
                style={{ marginTop: 100, marginLeft: "28%" }}
            >
                <Form
                    name="add category"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Tên thể loại"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input category!',
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            size="large"

                            onChange={(e) => setName(e.target.value)}
                            allowClear={true}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description!',
                            },
                        ]}
                    >
                        <Input.TextArea rows={5} size="large" onChange={(e) => setDescription(e.target.value)} allowClear={true} />
                    </Form.Item>
                </Form>
            </Modal>

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
            <Modal
                title="Edit Category"
                open={isModalEditCategoryOpen}
                onOk={() => { handleEditCategory(selectedCategory); }}
                onCancel={handleCancelShowModalEditCategory}
                afterClose={() => { setCategoryEdit(""); setDescriptionEdit("") }}
                style={{ marginTop: 100, marginLeft: "28%" }}
            >
                <Form
                    name="change information category"
                    form={formEdit}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="ID"
                        name="id"

                    >
                        <Input
                            type="text"
                            size="large"
                            disabled={true}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input category!',
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            size="large"
                            value={formEdit.name}
                            onChange={(e) => setCategoryEdit(e.target.value + "")}
                            allowClear={true}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description!',
                            },
                        ]}
                    >
                        {/* <Input type="text" size="large"
                            onChange={(e) => setDescriptionEdit(isModalEditCategoryOpen ? e.target.value : "")} /> */}
                        <Input.TextArea rows={5} value={formEdit.description}
                            onChange={(value) => { setDescriptionEdit(value.target.value) }} size='large' allowClear={true} />

                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};
export default ManageCategory;