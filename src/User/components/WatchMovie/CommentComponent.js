import { Comment } from "@ant-design/compatible";
import React, { createElement, useState, useEffect } from "react";
import { Avatar, Button, Dropdown, Form, Input, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./CommentComponent.scss";

const CommentBox = (props) => {
  const [parent_comment, setParent_comment] = useState(props.parent_comment);

  const [replyVisible, setReplyVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  

  const handleReply = () => {
    const postData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/film/${props.film.film.slug}/comments/create/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              user: window.localStorage.getItem("userId"),
              content: replyContent,
              parent_comment: props.id,
            }),
          }
        );

        if (response.ok) {
          // Handle success if needed
          console.log("Reply posted successfully");
        } else {
          // Handle error if needed
          console.error("Failed to post reply");
        }
      } catch (error) {
        console.error("Error posting reply:", error);
      }
    };

    postData();
    setReplyVisible(!replyVisible);
  };

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };
  const actions = [
    <span
      key="comment-basic-reply-to"
      onClick={() => {
        props.setReplyToID(parent_comment === null ? props.id : parent_comment);
        handleReply(); // Call your handleReply function here
      }}
    >
      Trả lời Người dùng số {props.user}
    </span>,
  ];

  const menu = (
    <Menu>
      <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
      <Menu.Item key="delete">Xóa</Menu.Item>
    </Menu>
  );

  return (
    <Comment
      actions={[
        parent_comment === null ? [...actions] : "",
        window.localStorage.getItem('userId') == props.user ? <Dropdown key="dropdown" overlay={menu} placement="bottomRight">
          <EllipsisOutlined style={{ fontSize: "20px" }} />
        </Dropdown> : "",
      ]}
      author={<a>{"Người dùng số " + props.user}</a>}
      avatar={<Avatar src={props.user.avatar} alt="Han Solo" />}
      content={<p>{props.content}</p>}
      datetime={<span>{props.time}</span>}
      style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
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
              style={{ marginTop: 10, backgroundColor: "red" }}
              type="primary"
              onClick={() => {
                props.handleAddCommentButtonClick(replyContent);
                handleReply();
              }}
            >
              Trả lời
            </Button>
          </span>
        </Form.Item>
      )}
      {props.children}
    </Comment>
  );
};

const CommentComponent = (props) => {
  const [comments, setComments] = useState([
    {
      content: "",
      id: 0,
      parent_comment: null,
      user: 0,
    },
  ]);

  useEffect(() => {
    // Fetch comments when the component mounts
    fetch(`http://localhost:8000/api/film/${props.film.film.slug}/comments/`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [props.film.film.slug]);
  console.log(comments);
  return (
    <>
      {comments &&
        comments.map(
          (comment) =>
            comment.parent_comment == null && (
              <CommentBox
                key={comment.id}
                film={props.film}
                {...comment}
                setReplyToID={props.setReplyToID}
                handleAddCommentButtonClick={props.handleAddCommentButtonClick}
              >
                {comments.map(
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
