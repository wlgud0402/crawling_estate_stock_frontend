import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CommentEditPage = ({ location }) => {
  let history = useHistory();
  const [flag, setFlag] = useState(0);
  const [commentId, setCommentId] = useState("");
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    const commentId = location.pathname.split("/")[3];
    setCommentId(commentId);
    if (localStorage.getItem("user_token")) {
      let user_token = localStorage.getItem("user_token");
      setUserInfo(user_token);
    }
  }, []);

  useEffect(() => {
    const commentId = location.pathname.split("/")[3];
    const getPostComment = async () => {
      const res = await axios.get(`/api/post/comment/${commentId}`);
      setPost(res.data.post);
      setComment(res.data.comment);
      setCommentValue(res.data.comment.content);
    };
    getPostComment();
  }, [location, flag]);

  const onCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onEdit = async (e) => {
    if (commentValue.length === 0) {
      alert("빈 문자를 제출할수 없습니다. 내용을 추가해 주세요.");
      return;
    }
    const res = await axios.put(
      `/api/post/comment/${commentId}`,
      {
        content: commentValue,
      },
      { headers: { token: userInfo } }
    );
    alert(res.data.msg);
    history.push(`/myInfo/`);
  };

  const onDelete = async (e) => {
    const res = await axios.delete(`/api/post/comment/${commentId}`, {
      headers: { token: userInfo },
    });
    alert(res.data.msg);
    history.push(`/myInfo/`);
  };

  return (
    <DetailWrapper>
      <div className="contentWrapper">
        <ExtraInfo>
          <div className="titlebox">
            <h2 className="title_">{post.title}</h2>
          </div>
          <div className="subInfo">
            <div className="subInfoBox">
              <p className="writer_">{post.nickname}</p>
              <p className="divider">|</p>
              <p className="created_">{post.created_at}</p>
            </div>
          </div>
        </ExtraInfo>
        <MainContent>
          <h4 className="text_">{post.text}</h4>
        </MainContent>
        <CommentWrapper>
          <div>
            <form action={`/myInfo/`} className="formBox">
              <textarea
                type="text"
                className="commentInput"
                value={commentValue}
                onChange={onCommentChange}
              ></textarea>
              <div className="commentSubmitBtnBox">
                <button
                  id={comment.id}
                  className="commentSubmitBtn"
                  onClick={onEdit}
                >
                  수정
                </button>
                <button
                  id={comment.id}
                  className="commentDeleteBtn"
                  onClick={onDelete}
                >
                  삭제
                </button>
              </div>
            </form>
          </div>
        </CommentWrapper>
      </div>
    </DetailWrapper>
  );
};

export default CommentEditPage;
const DetailWrapper = styled.div`
  align-items: center;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  .contentWrapper {
    width: 800px;

    .titlebox {
      word-break: break-all;
    }
  }
`;

const ExtraInfo = styled.div`
  display: flex;
  flex-direction: column;
  .title_ {
    margin-bottom: 0;
  }
  .writer_ {
    margin-right: 20px;
  }
  .divier {
    margin-right: 20px;
  }

  .created_ {
    margin-left: 20px;
  }

  .subInfo {
    display: flex;
    flex-direction: row;
    .deleteBtnBox {
      display: flex;
      align-items: center;
    }
    .subInfoBox {
      display: flex;
      flex: 1;
    }
  }
`;
const MainContent = styled.div`
  margin-top: 40px;
  border-top: 1px solid;
  min-height: 300px;
  border-bottom: 1px solid;
  margin-bottom: 40px;
`;
const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .formBox {
    width: 100%;
    .commentSubmitBtnBox {
      display: flex;
      justify-content: flex-end;
      .commentSubmitBtn {
        font-size: 16px;
        padding: 8px;
        border: 1px solid;
        color: white;
        font-weight: bold;
        opacity: 0.6;
        margin-left: 45px;
        background-color: blue;
        &:hover {
          cursor: pointer;
        }
      }

      .commentDeleteBtn {
        font-size: 16px;
        background-color: black;
        padding: 8px;
        border: 1px solid;
        color: white;
        font-weight: bold;
        opacity: 0.6;
        margin-left: 45px;
        background-color: red;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .commentInput {
      width: 100%;
      height: 100px;
      resize: none;
      padding: 0px;
      padding-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }

    .commentSubmitBox {
      display: flex;
    }
  }
  .firstComment {
    display: flex;
    justify-content: center;
  }

  .commentBox {
    display: flex;
    flex-direction: row;
    padding-bottom: 8px;
    padding-top: 8px;
    border-bottom: 1px solid gray;

    .nickname_ {
      flex: 1.5;
      margin-right: 20px;
      color: gray;
    }
    .content_ {
      flex: 7;
    }
    .created_at {
      flex: 1.5;
      margin-left: 15px;
      color: gray;
    }
  }
`;
