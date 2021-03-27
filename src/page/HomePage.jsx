import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomeWrapper>
      <div>내용</div>
    </HomeWrapper>
  );
};

export default HomePage;
const HomeWrapper = styled.div`
  background-color: yellow;
  height: 100%;
  /* height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: gray;
  color: white; */
`;
