import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Link to="/" className="logo">
          Money Collector
        </Link>
      </LogoContainer>
      <MenuConatiner>
        <Link to="/estate" className="menu">
          부동산
        </Link>
        <Link to="/stock" className="menu">
          주식
        </Link>
      </MenuConatiner>
      <LoginContainer>
        {true ? (
          <Link to="/login">로그인되있음</Link>
        ) : (
          <Link to="/needtologin">안되있어</Link>
        )}
      </LoginContainer>
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled.div`
  background-color: orange;
  align-items: center;
  height: 65px;
  display: flex;
  flex-direction: row;
`;

const LogoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  .logo {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
  }
`;

const MenuConatiner = styled.div`
  flex-grow: 8;
  justify-content: space-evenly;
  display: flex;
  .menu {
    text-decoration: none;
  }
`;
const LoginContainer = styled.div`
  flex-grow: 1;
`;
