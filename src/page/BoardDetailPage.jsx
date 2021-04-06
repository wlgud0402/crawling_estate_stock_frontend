import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const BoardDetailPage = ({ location }) => {
  const [flag, setFlag] = useState(0);
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [writer, setWriter] = useState();
  const [created, setCreated] = useState();
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [boardId, setBoardId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const commentRef = useRef();

  const onCommentClick = async (e) => {
    e.preventDefault();
    if (commentValue.length === 0) {
      alert("댓글을 입력해주세요.");
      return;
    }
    if (userInfo.length === 0) {
      alert("로그인이 필요합니다.");
      return;
    }

    const res = await axios.post(
      "/api/post/comment/",
      {
        content: commentValue,
        board_id: boardId,
      },
      { headers: { token: userInfo } }
    );
    setFlag(flag + 1);
    alert(res.data.msg);
    setCommentValue("");
    commentRef.current.value = "";
    return;
  };

  const onCommentChange = (e) => {
    setCommentValue(e.target.value);
  };
  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let user_token = localStorage.getItem("user_token");
      setUserInfo(user_token);
    }
  }, []);

  useEffect(() => {
    const boardId = location.pathname.split("/")[2];
    const getPosts = async () => {
      const boardRes = await axios.get(`/api/post/${boardId}`);
      setComments(boardRes.data.comments);
      setBoardId(boardRes.data.id);
      setComments(boardRes.data.comments);
      setTitle(boardRes.data.title);
      setText(boardRes.data.text);
      setWriter(boardRes.data.user_nickname);
      setCreated(boardRes.data.created_at);
    };
    getPosts();
  }, [location, flag]);
  return (
    <DetailWrapper>
      <div className="contentWrapper">
        <ExtraInfo>
          <div className="titlebox">
            <h2 className="title_">{title}</h2>
          </div>
          <div className="subInfo">
            <div className="subInfoBox">
              <p className="writer_">{writer}</p>
              <p className="divider">|</p>
              <p className="created_">{created}</p>
            </div>
          </div>
        </ExtraInfo>
        <MainContent>
          <h4 className="text_">{text}</h4>
        </MainContent>
        <CommentWrapper>
          {comments.length === 0 ? (
            <div className="firstComment">
              <h2>첫번째로 댓글을 작성해 보세요!</h2>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <form action={`/board/${boardId}/`} className="formBox">
              <textarea
                type="text"
                className="commentInput"
                placeholder="바르고 고운말을 사용해서 댓글을 작성해 주세요!!"
                value={commentValue}
                onChange={onCommentChange}
                ref={commentRef}
              ></textarea>
              <div className="commentSubmitBtnBox">
                <button
                  onClick={onCommentClick}
                  id={boardId}
                  className="commentSubmitBtn"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
          {comments.map((comment) => {
            return (
              <div className="commentBox" key={comment.id}>
                <div className="nickname_">{comment.nickname}</div>
                <div className="content_">{comment.content}</div>
                <div className="created_at">{comment.created_at}</div>
              </div>
            );
          })}
        </CommentWrapper>
      </div>
    </DetailWrapper>
  );
};

export default BoardDetailPage;
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
        background-color: black;
        padding: 8px;
        border: 1px solid;
        color: white;
        font-weight: bold;
        opacity: 0.6;
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
