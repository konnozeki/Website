import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const TrailerButton = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="custombutton"
        type="primary"
        danger
        icon={<CaretRightOutlined />}
        style={{ width: '180px', height: '60px', fontSize: '16px' }}
        onClick={showModal}
      >
        Trailer
      </Button>

      <Modal
        title="Trailer"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        <iframe
        width="100%"
        height="550vh"
        src={props.TrailerLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ display: "block", margin: "auto" }}
      ></iframe>
      </Modal>
    </>
  );
};

export default TrailerButton;
