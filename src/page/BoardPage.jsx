import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "react-bootstrap/Table";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const BoardPage = ({ location }) => {
  const [boards, setBoards] = useState([]);
  const [pages, setPages] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getBoard = async () => {
      const page = queryString.parse(location.search).page;
      if (page === undefined) {
        history.push("/board?page=1");
      }
      const boardRes = await axios.get(`/api/post/?page=${page}`);
      setPages(boardRes.data.page_count);
      setBoards(boardRes.data.boards);
    };
    getBoard();
  }, [location]);
  return (
    <>
      <BoardHeardWrapper>
        <h1>자유게시판</h1>
        <div className="writeboard">
          <Link to="/board/write" className="writelink">
            새글쓰기
          </Link>
        </div>
      </BoardHeardWrapper>

      <BoardWrapper>
        <Table responsive="sm" className="tableBox">
          <thead>
            <tr>
              <th className="telse">글번호</th>
              <th>글 제목</th>
              <th className="telse">작성자</th>
              <th className="telse">작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => {
              return (
                <>
                  {boards.length === 0 ? (
                    <div>
                      <h1>게시글이 존재하지 않습니다.</h1>
                    </div>
                  ) : (
                    <tr key={board.id}>
                      <td className="td">{board.id}</td>
                      <td className="title">
                        <Link to={`/board/${board.id}`} className="titlelink">
                          {board.title}
                        </Link>
                      </td>
                      <td className="td">{board.nickname}</td>
                      <td className="td">{board.created_at}</td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
          <tfoot className="tfoot">
            <tr className="tfoot">
              <td colSpan="4" className="page">
                <div>
                  <ul className="pages">
                    {pages.map((page) => {
                      return (
                        <li className="pageli">
                          <Link
                            className="pagelink"
                            to={{ pathname: "/board", search: `?page=${page}` }}
                          >
                            {page}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
      </BoardWrapper>
    </>
  );
};

export default BoardPage;

const BoardHeardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .writeboard {
    margin-left: 790px;
    margin-bottom: 10px;

    .writelink {
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const BoardWrapper = styled.div`
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex-direction: row;

  .tableBox {
    min-width: 860px;
    max-width: 1000px;
  }
  .telse {
    width: 100px;
  }

  th {
    background-color: whitesmoke;
    color: black;
    border-left: none;
    border-right: none;
  }

  .td {
    overflow: hidden;
    background-color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 100px;
    /* max-width: 600px; */
    padding: 8px;
    border-left: none;
    border-right: none;
    /* &:hover {
      background-color: #ddd;
    } */
  }

  .title {
    overflow: hidden;
    background-color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 100px;
    max-width: 600px;
    padding: 8px;
    border-left: none;
    text-align: left;
    text-decoration: none;
    border-right: none;
    &:hover {
      background-color: #ddd;
    }

    .titlelink {
      text-decoration: none;
      color: black;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .page {
    /* background-color: blue; */
    border-left: none;
    border-right: none;
  }
  .pages {
    margin: 0;
    display: flex;
    list-style: none;
    justify-content: center;
  }

  .pageli {
    margin: 0px 8px 0px 0px;
  }
  .pagelink {
    text-decoration: none;
  }
  .tfoot {
    background-color: white;
    &:hover {
      background-color: white;
    }
  }
`;
