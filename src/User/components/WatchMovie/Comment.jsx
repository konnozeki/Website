
import React from 'react';
import { Avatar } from 'antd';
import { Comment } from '@ant-design/compatible';
const CommentSection = ({ data }) => {
  return (
    <div>
      {data.map(comment => (
        
        <Comment
          key={comment.author}
          author={comment.author}
          avatar={<Avatar src={comment.avatar} alt={comment.author} />}
          content={<p>{comment.content}</p>}
        >
          {comment.children && <CommentSection data={comment.children} />}
        </Comment>
        
      ))}
    </div>
  );
};

export default Comment;
