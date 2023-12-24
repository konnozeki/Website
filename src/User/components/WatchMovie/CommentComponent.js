import { Comment } from "@ant-design/compatible";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import React, { createElement, useState, useEffect } from "react";
import { Avatar, Button, Tooltip, Form, Input } from "antd";
import "./CommentComponent.scss";

const CommentBox = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [parent_comment, setParent_comment] = useState(props.parent_comment);
  const [action, setAction] = useState(null);

  const [replyVisible, setReplyVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const like = () => {
    if (action !== "liked") {
      setLikes(likes + 1);
      setAction("liked");
    }
  };
  const dislike = () => {
    if (action !== "disliked") {
      setLikes(likes - 1);
      setAction("disliked");
    }
  };

  const handleReply = () => {
    setReplyVisible(!replyVisible);
  };

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
      </span>
    </Tooltip>,
    <span
      key="comment-basic-reply-to"
      onClick={() => {
        props.setReplyToID(parent_comment === null ? props.id : parent_comment);
        handleReply(); // Call your handleReply function here
      }}
    >
      Reply to
    </span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a>{props.user.name}</a>}
      avatar={<Avatar src={props.user.avatar} alt="Han Solo" />}
      content={<p>{props.content}</p>}
      datetime={<span>{props.time}</span>}
      style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
    >
      {replyVisible && (
        <Form.Item>
          <Input.TextArea
            rows={2}
            value={replyContent}
            onChange={handleReplyContentChange}
          />
          <span>
            <Button
              type="primary"
              onClick={() => {
                props.handleAddCommentButtonClick(replyContent);
                handleReply();
              }}
            >
              Reply
            </Button>
          </span>
        </Form.Item>
      )}
      {props.children}
    </Comment>
  );
};

const CommentComponent = (props) => {
  return (
    <>
      {props.comments &&
        props.comments.map(
          (comment) =>
            comment.parent_comment == null && (
              <CommentBox
                key={comment.id}
                {...comment}
                setReplyToID={props.setReplyToID}
                handleAddCommentButtonClick={props.handleAddCommentButtonClick}
              >
                {props.comments.map(
                  (childComment) =>
                    childComment.parent_comment === comment.id && (
                      <CommentBox
                        key={childComment.id}
                        {...childComment}
                        setReplyToID={props.setReplyToID}
                        handleAddCommentButtonClick={
                          props.handleAddCommentButtonClick
                        }
                      />
                    )
                )}
              </CommentBox>
            )
        )}
    </>
  );
};

export default CommentComponent;
