import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      © 2021 Jihyung Kim CO., LTD. ALL RIGHTS RESERVED.
      <p>contact: 010-6805-0402</p>
    </FooterWrapper>
  );
};

export default Footer;
const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  color: #94949a;
  height: 90px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #1b1b1b;
`;
