import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();

  const [userInfo, setUserInfo] = useState("");
  const [userDecodeInfo, setUserDecodeInfo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let user_token = localStorage.getItem("user_token");
      let info = jwt_decode(user_token);
      setUserInfo(user_token);
      setUserDecodeInfo(info);
    }
  }, []);

  const responseGoogle = async (response) => {
    const loginRes = await axios.post("/api/user/", {
      googleId: response.profileObj.googleId,
      email: response.profileObj.email,
    });
    localStorage.setItem("user_token", loginRes.data.user_token);
    let user_token = localStorage.getItem("user_token");
    let info = jwt_decode(user_token);
    setUserInfo(user_token);
    setUserDecodeInfo(info);
  };
  const responseGoogleError = (error) => {
    alert(
      "로그인 에러가 발생했습니다. 시크릿 모드를 취소하시거나 새로고침을 눌러주세요."
    );
  };
  const onLogout = (e) => {
    localStorage.clear();
    setUserInfo("");
    setUserDecodeInfo("");
    history.push("/");
  };
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Link to="/" className="logo">
          Money Collector $
        </Link>
      </LogoContainer>
      <MenuConatiner>
        <Link to="/estate" className="menu">
          부동산
        </Link>
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="menu"
          >
            주식
          </Dropdown.Toggle>

          <Dropdown.Menu className="divider">
            <Dropdown.Item className="textdeco">
              <Link to="/stock" className="dropmenu">
                주식 트렌드
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider className="divider" />
            <Dropdown.Item className="textdeco">
              <Link to="/stock/detail" className="dropmenu">
                주식 상세정보
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/board?page=1" className="menu">
          게시판
        </Link>
      </MenuConatiner>
      <LoginContainer>
        {userInfo === "" ? (
          <GoogleLogin
            clientId="374075298681-g3s166507q5fmg0t25fav7sceu7edqvn.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="loginBtn"
                // style={{ background: "red" }}
              >
                로그인
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogleError}
            cookiePolicy={"single_host_origin"}
          />
        ) : (
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="menu"
            >
              {userDecodeInfo.nickname}
            </Dropdown.Toggle>

            <Dropdown.Menu className="divider">
              <Dropdown.Item variant="secondary" className="textdeco">
                <Link to="/myInfo" className="dropmenu">
                  내정보
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider className="divider" />
              <Dropdown.Item
                variant="secondary"
                onClick={onLogout}
                className="textdeco"
              >
                <button className="dropmenu">로그아웃</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </LoginContainer>
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled.div`
  /* background-color: white; */
  background-color: whitesmoke;
  align-items: center;
  height: 65px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid gray;
`;

const LogoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  .logo {
    color: black;
    font-weight: bold;
    font-style: italic;
    text-decoration: none;
    font-size: 30px;
    &:hover {
      color: black;
    }
  }
`;

const MenuConatiner = styled.div`
  flex-grow: 8;
  justify-content: left;
  display: flex;

  .divider {
    margin-top: 12px;
    margin-bottom: 22px;
  }
  .dropmenu {
    /* color: darkorange; */
    color: gray;
    /* opacity: 0.4; */
    text-decoration: none;
    margin-bottom: 30px;
    border: 1px solid gray;
    font-weight: bold;
    padding: 10px;
    background-color: white;
    &:hover {
      cursor: pointer;
      /* background-color: orange; */
      color: black;
    }
  }
  .textdeco {
    text-decoration: none;
  }

  .menu {
    all: unset;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-module-fg, #111);
    opacity: 0.4;
    /* color: darkorange; */
    /* background-color: white; */
    padding: 6px;
    /* border: 1px solid white; */
    /* border-radius: 17px; */
    cursor: pointer;

    &:hover {
      opacity: 1;
      /* color: white; */
      /* background-color: darkorange; */
    }
  }
`;
const LoginContainer = styled.div`
  flex-grow: 1;
  .loginBtn {
    all: unset;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    color: gray;
    background-color: white;
    padding: 6px;
    border: 1px solid gray;
    border-radius: 17px;
    cursor: pointer;

    &:hover {
      color: black;
      /* color: green; */
      /* background-color: greenyellow; */
    }
  }

  .divider {
    margin-top: 10px;
  }
  .dropmenu {
    color: gray;
    text-decoration: none;
    margin-bottom: 30px;
    border: 1px solid gray;
    font-weight: bold;
    padding: 10px;
    background-color: white;
    /* color: var(--color-module-fg, #111); */
    /* opacity: 0.4; */
    &:hover {
      cursor: pointer;
      background-color: white;
      color: black;
    }
  }
  .textdeco {
    text-decoration: none;
  }

  .menu {
    all: unset;
    text-decoration: none;
    font-size: 20px;
    /* font-weight: bold; */
    color: black;
    /* background-color: white; */
    padding: 6px;
    /* border: 1px solid white; */
    border-radius: 17px;
    cursor: pointer;

    &:hover {
      color: skyblue;
      /* background-color: darkorange; */
    }
  }
`;
