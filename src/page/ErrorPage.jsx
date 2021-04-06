import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <div>
      <ErrorBody>
        <div className="errorCard">
          <h1>이 페이지는 유효하지 않습니다.</h1>
          <h2>This is not the web page you are looking for</h2>
        </div>
      </ErrorBody>
    </div>
  );
};

export default ErrorPage;

const ErrorBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 1000px;

  .errorCard {
    width: 73%;
    height: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
