import { Comment } from '@ant-design/compatible';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useState } from 'react';
import { Avatar, Button, Tooltip } from 'antd';

const CommentComponent = ({ children }) => {
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);
  const like = () => {
    setLikes(likes + 1);
    setAction('liked');
  };
  const dislike = () => {
    setLikes(likes - 1);
    setAction('disliked');
  };
  return (
    <Comment
      actions={[
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span onClick={dislike}>
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
      ]}
      author={<a>Han Solo</a>}
      avatar={<Avatar src="" alt="Han Solo" />}
      content={
        <p>
          Chúng tôi cung cấp một loạt nguyên tắc thiết kế, mẫu thực hành và nguồn thiết kế chất lượng cao
          (Sketch và Axure).
        </p>
      }
    >
      {children}
    </Comment>
  );
};

export default CommentComponent;
