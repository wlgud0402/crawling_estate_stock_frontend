import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const MyInfo = () => {
  let history = useHistory();
  const [mail, setMail] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [flag, setFlag] = useState(0);
  const user_token = localStorage.getItem("user_token");

  useEffect(() => {
    const getInfos = async () => {
      const infoRes = await axios.get("/api/user/info/", {
        headers: { token: user_token },
      });

      setMail(infoRes.data.userInfos.email);
      setJoinDate(infoRes.data.userInfos.created_at);
      setPosts(infoRes.data.userInfos.posts);
      setComments(infoRes.data.userInfos.comments);
    };
    getInfos();
  }, [flag]);

  const onDeleteUser = async () => {
    const res = await axios.delete(`/api/user/`, {
      headers: { token: user_token },
    });
    alert(res.data.msg);
    localStorage.clear();
    history.push("/");
  };

  return (
    <InfoWrapper>
      <div className="infobox">
        <div className="myinfo">
          <div className="mymail">
            이메일: {mail}
            <div className="deleteuser">
              <button className="deleteuserbtn" onClick={onDeleteUser}>
                회원탈퇴
              </button>
            </div>
          </div>
          <div className="joindate">가입일 : {joinDate} </div>
        </div>
        <div className="myactivites">
          <div>
            <h3>내가쓴 글</h3>
          </div>
          <div className="myposts">
            <table>
              <thead>
                <tr>
                  <th>글번호</th>
                  <th className="mytitlepost">글제목</th>
                  <th>작성일</th>
                  <th>수정</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  return (
                    <>
                      {posts.length === 0 ? (
                        <div>
                          <h1>게시글이 존재하지 않습니다.</h1>
                        </div>
                      ) : (
                        <tr key={post.id}>
                          <td className="td">{post.id}</td>
                          <td className="title">
                            <Link
                              to={`/board/${post.id}`}
                              className="titlelink"
                            >
                              {post.title}
                            </Link>
                          </td>
                          <td className="td">{post.created_at}</td>
                          <td className="td">
                            <Link
                              to={`/board/edit/${post.id}`}
                              className="editbtn"
                            >
                              수정
                            </Link>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <h3>내가쓴 댓글</h3>
          </div>
          <div className="mycomments">
            <table>
              <thead>
                <tr>
                  <th>글번호</th>
                  <th>댓글내용</th>
                  <th>작성일</th>
                  <th>수정</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => {
                  return (
                    <>
                      {comments.length === 0 ? (
                        <div>
                          <h1>댓글이 존재하지 않습니다.</h1>
                        </div>
                      ) : (
                        <tr key={comment.post_id}>
                          <td className="td">{comment.post_id}</td>
                          <td className="title">
                            <Link
                              to={`/board/${comment.post_id}`}
                              className="titlelink"
                            >
                              {comment.content}
                            </Link>
                          </td>
                          <td className="td">{comment.created_at}</td>
                          <td className="td">
                            <Link
                              to={`/comment/edit/${comment.id}`}
                              className="editcomment"
                            >
                              수정
                            </Link>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </InfoWrapper>
  );
};

export default MyInfo;

const InfoWrapper = styled.div`
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;

  th {
    min-width: 100px;
    background-color: gray;
  }

  .infobox {
    min-width: 700px;
  }

  .myinfo {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .mymail {
      font-size: 25px;
      display: flex;
      flex-direction: row;
      .deleteuser {
        width: 14%;
        display: flex;
        justify-content: flex-end;
        .deleteuserbtn {
          border: none;
          color: red;
          &:hover {
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }

  .myactivites {
    display: flex;
    flex-direction: column;

    .myposts {
      height: 400px;
      overflow-y: auto;
      .editbtn {
        text-decoration: none;
        color: blue;
        &:hover {
          text-decoration: underline;
        }
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: white;
        display: flex;
        max-width: 400px;
        padding: 5px;
        .titlelink {
          text-decoration: none;
          color: black;
          &:hover {
            text-decoration: underline;
          }
        }

        &:hover {
          background-color: whitesmoke;
        }
      }

      .td {
        background-color: white;
      }

      .mytitlepost {
        min-width: 371px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          background-color: white;
          padding: 5px;
          max-width: 400px;

          &:hover {
            background-color: whitesmoke;
          }
        }
      }
    }
    .mycomments {
      height: 400px;
      overflow-y: auto;

      .td {
        background-color: white;

        .editcomment {
          text-decoration: none;
          color: blue;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .title {
        overflow: hidden;
        min-width: 371px;
        background-color: white;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        max-width: 400px;
        padding: 5px;
        .titlelink {
          text-decoration: none;
          color: black;
          &:hover {
            text-decoration: underline;
          }
        }
        &:hover {
          /* cursor: pointer; */
          background-color: whitesmoke;
        }
      }
    }
  }
`;
