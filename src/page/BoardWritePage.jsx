import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

const BoardWritePage = ({ location }) => {
  let history = useHistory();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let user_token = localStorage.getItem("user_token");
      setUserInfo(user_token);
    }
  }, []);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onWrite = async (e) => {
    if (text.length === 0 || title.length === 0) {
      alert("빈 문자를 제출할수 없습니다. 내용을 추가해 주세요.");
      return;
    }

    const res = await axios.post(
      `/api/post/`,
      {
        title: title,
        text: text,
      },
      { headers: { token: userInfo } }
    );

    alert(res.data.msg);
    history.push(`/board/`);
  };

  return (
    <WriteWrapper>
      <div className="contentWrapper">
        <ExtraInfo>
          <div>
            제목 :{" "}
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              className="titleinput"
              placeholder="제목을 입력해주세요......"
            />
          </div>
          <div className="subInfo">
            <div className="subInfoBox"></div>
            <div className="writeBtnBox">
              <button onClick={onWrite} className="submitbtn">
                등록
              </button>
            </div>
          </div>
        </ExtraInfo>
        <MainContent>
          <textarea
            className="textinput"
            value={text}
            onChange={onTextChange}
            placeholder="내용을 입력해 주세요...."
          />
        </MainContent>
      </div>
    </WriteWrapper>
  );
};

export default BoardWritePage;
const WriteWrapper = styled.div`
  align-items: center;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  .contentWrapper {
    width: 800px;
  }
`;

const ExtraInfo = styled.div`
  display: flex;
  flex-direction: column;
  .titleinput {
    margin-top: 25px;
    width: 400px;
    white-space: nowrap;
    height: 40px;
    font-weight: bold;
    font-size: 15px;
  }
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
    .writeBtnBox {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .submitbtn {
        opacity: 0.6;
        background-color: blue;
        padding: 10px;
        color: white;
        font-size: 17px;
        font-weight: bold;
        border-radius: 4px;
        &:hover {
          cursor: pointer;
        }
      }
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

  .textinput {
    width: 778px;
    min-height: 271px;
    font-size: 17px;
    padding: 0px;
    padding-top: 22px;
    padding-left: 22px;
  }
`;
