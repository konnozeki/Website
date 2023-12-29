import { Comment } from "@ant-design/compatible";
import React, { createElement, useState, useEffect } from "react";
import { Avatar, Button, Dropdown, Form, Input, Menu, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./CommentComponent.scss";
import { CREATE_COMMENT_FOR_FILM_API, LIST_COMMENT_FOR_FILM_API, UPDATE_DELETE_COMMENT_FOR_FILM_API } from "../../../api";

const CommentBox = (props) => {
  const [parent_comment, setParent_comment] = useState(props.parent_comment);

  const [replyVisible, setReplyVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [comments, setComments] = useState([
    {
      content: "",
      id: 0,
      parent_comment: null,
      user: 0,
    },
  ]);

  //Xử lý reply
  const handleReply = () => {
    const postData = async () => {
      try {
        const response = await fetch(
          
          CREATE_COMMENT_FOR_FILM_API(props.film.film.slug),
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
          props.updateComments(props.film.film.slug);
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
        setReplyVisible(!replyVisible)
      }}
    >
      {replyVisible ? "Bỏ trả lời " : "Trả lời " } Người dùng số {props.user}
    </span>,
  ];




  //Xử lý delete comment
  const [commentToDelete, setCommentToDelete] = useState(0);
  const handleDeleteClick = (commentId) => {
    // Hiển thị modal xác nhận xóa và truyền ID của comment
    setIsDeleteModalVisible(true);
    setCommentToDelete(commentId);
  };


  const deleteComment = async (commentId) => {
    try {
      
      const response = await fetch(
        UPDATE_DELETE_COMMENT_FOR_FILM_API(props.film.film.slug, commentId),
        {
          method: "DELETE",
          headers: {
            Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.ok) {
        // Handle success if needed
        console.log("Comment deleted successfully");
        // Cập nhật danh sách comments
        props.updateComments(props.film.film.slug);
      } else {
        // Handle error if needed
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };



  const handleModalDeleteOk = (commentId) => {
    // Xử lý xóa bình luận ở đây
    deleteComment(commentId);
    setIsDeleteModalVisible(false);
  };




  //Xử lý update comment
  const handleEditClick = () => {
    // Trước khi mở modal chỉnh sửa, đặt giá trị của bình luận vào state editedComment
    setEditedComment(props.content);
    // Hiển thị modal chỉnh sửa
    setIsEditModalVisible(true);
  };


  const updateComment = async (commentId) => {
    try {
      const response = await fetch(
        UPDATE_DELETE_COMMENT_FOR_FILM_API(props.film.film.slug, commentId),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `TOKEN ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: editedComment,
          }),
        }
      );
  
      if (response.ok) {
        // Handle success if needed
        console.log("Comment updated successfully");
        // Cập nhật danh sách comments
        props.updateComments(props.film.film.slug);
      } else {
        // Handle error if needed
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleModalUpdateOk = (commentId) => {
    updateComment(commentId)
    setIsEditModalVisible(false);
  };


  //Dùng để đóng cả 2 modal
  const handleModalCancel = () => {
    // Đóng modal khi bấm Cancel
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={handleEditClick}>
        Chỉnh sửa
      </Menu.Item>
      <Menu.Item onClick={handleDeleteClick} key="delete">
        Xóa
      </Menu.Item>
    </Menu>
  );

  return (
    <Comment
      actions={[
        parent_comment === null ? [...actions] : "",
        window.localStorage.getItem("userId") == props.user ? (
          <Dropdown key="dropdown" overlay={menu} placement="bottomRight">
            <EllipsisOutlined style={{ fontSize: "20px" }} />
          </Dropdown>
        ) : (
          ""
        ),
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
      <Modal
        title="Xác nhận xóa"
        visible={isDeleteModalVisible}
        onOk={() => handleModalDeleteOk(props.id)}
        onCancel={handleModalCancel}
      >
        <p style={{ textAlign: "center" }}>
          Bạn có chắc chắn muốn xóa bình luận này của bạn không?
        </p>
      </Modal>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa bình luận"
        visible={isEditModalVisible}
        onOk={() => handleModalUpdateOk(props.id)}
        onCancel={handleModalCancel}
      >
        <Input.TextArea
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          placeholder="Nhập nội dung chỉnh sửa"
        />
      </Modal>
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

  const updateComments = (filmSlug) => {
    
    fetch(LIST_COMMENT_FOR_FILM_API(filmSlug))
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  useEffect(() => {

    updateComments(props.film.film.slug);
  }, [props.film.film.slug]);

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
                updateComments={updateComments} 
              >
                {comments.map(
                  (childComment) =>
                    childComment.parent_comment === comment.id && (
                      <CommentBox
                        film={props.film}
                        key={childComment.id}
                        {...childComment}
                        setReplyToID={props.setReplyToID}
                        handleAddCommentButtonClick={
                          props.handleAddCommentButtonClick
                        }
                        updateComments={updateComments} 
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
