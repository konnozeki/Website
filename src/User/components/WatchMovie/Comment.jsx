
import React from 'react';
import { Avatar } from 'antd';
import { Comment } from '@ant-design/compatible';
import avatar from "../Nav/UserIcon.png"
const CommentSection = ({ data }) => {
  return (
    <div>
      {data.map(comment => (

        <Comment
          key={comment.author}
          author={comment.author}
          avatar={<Avatar src={avatar} alt={comment.author} />}
          content={<p>{comment.content}</p>}
          style={{ borderRadius: 1 }}
        >
          {comment.children && <CommentSection data={comment.children} />}
        </Comment>

      ))
      }
    </div >
  );
};

export default Comment;
