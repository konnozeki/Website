import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const FavoriteButton = () => {
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    if (!isFilled) {
      showNotification({ content: 'Đã thêm vào favorite' });
    } else {
      showNotification({ content: 'Đã xoá khỏi favorite' });
    }
    setIsFilled(!isFilled);
  };

  const showNotification = (props) => {
    notification.open({
      message: props.content,
      duration: 2,
      icon: <HeartOutlined style={{ color: 'red' }} />,
    });
  };

  return (
    <Button
      className="custombutton"
      type="primary"
      danger
      icon={isFilled ? <HeartFilled /> : <HeartOutlined />}
      onClick={handleClick}
      style={{ width: '60px', height: '60px', fontSize: '16px' }}
    >
      {isFilled}
    </Button>
  );
};

export default FavoriteButton;
