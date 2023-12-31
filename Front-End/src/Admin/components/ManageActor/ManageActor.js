import React, { useEffect, useState } from "react";
import { Table, Image, Popconfirm, Button } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import {ADMIN_UPDATE_DELETE_ACTOR_API, LIST_ACTOR_API, backendUrl} from './../../../api'
import "./ManageActor.scss";

const ManageActor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actorData, setActorData] = useState([
    {
      id: 7,
      name: "Việt Thắng",
      description: "Đây là nội dung mô tả diễn viên Việt Thắng",
      slug: "viet-thang",
      gender: "M",
      country: {
          id: 113,
          name: "Vietnam",
          flag: "https://flagcdn.com/w320/vn.png",
          slug: "vietnam"
      },
      avatar: "/media/actors/viet-thang.jpg"
   },

  ]);

  const columns = [
    {
      title: "Diễn viên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (text, record) => (
        <Image width={30} src={backendUrl(record.avatar)} preview={false} />
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (text, record) => (
        record.gender === 'M' ? 'Nam' : 'Nữ'
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Quốc tịch",
      dataIndex: "country.name", // Access the name property of the country object
      key: "country.name",
      align: "center",
      render: (text, record) => (
        record.country
      ),
    },
    {
      title: "Tương tác",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div>
          <Link to={{ pathname: `/admin/actor/${record.id}` }}>
            <EditFilled style={{ color: "black", fontSize: 25, margin: 10 }} />
          </Link>
          <Popconfirm
            title="Xóa diên viên"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteActor(record.id)}
          >
            <DeleteFilled
              style={{ color: "black", fontSize: 25, margin: 10 }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  

  const fetchActorData = async () => {
    try {
      
      const response = await fetch(LIST_ACTOR_API);
      const data = await response.json();

      setActorData(data.actors);

      // Log giá trị mới của actorData
      console.log(data.actors);
    } catch (error) {
      console.error("Error fetching actor data:", error);
    }
  };

  useEffect(() => {
    fetchActorData();
  }, []);

  const handleDeleteActor = async (actor_id) => {
    try {
      // Gửi yêu cầu DELETE đến API
      
      const response = await fetch(ADMIN_UPDATE_DELETE_ACTOR_API(actor_id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Các headers khác nếu cần thiết
          Authorization: `TOKEN ${window.localStorage.getItem('token')}`
        },
        // Các thông tin khác nếu cần thiết
      });

      if (response.ok) {
        console.log(`Actor with ID ${actor_id} deleted successfully.`);
        // Sau khi xóa, cập nhật lại danh sách actor
        fetchActorData();
      } else {
        console.error(`Error deleting actor with ID ${actor_id}.`);
      }
    } catch (error) {
      console.error('Error deleting actor:', error);
    }
  };

  return (
    <div className="movie-detail-container">
      <div className="movie-episode">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 30,
          }}
        >
          <p style={{ color: "white", fontSize: 25, fontWeight: 'bold', marginBottom: 20, marginTop:20 }}>Danh sách diễn viên</p>
          <div style={{ width: "90%" }}>
          <Table
            columns={columns}
            dataSource={actorData}
            style={{ width: '100%' }} // Đặt chiều rộng 100%
          />
          </div>
          <Link
            className="link"
            to={{ pathname: `/admin/actor/add` }}
          >
            <Button style={{borderColor: 'red', width:200, height: 50}} className="button add">Thêm diễn viên</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageActor;
