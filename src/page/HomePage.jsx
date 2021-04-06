import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomeWrapper>
      <div>
        <div className="img-container">
          <img
            className="each-img"
            src="https://photoshare-album.s3.ap-northeast-2.amazonaws.com/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB.png"
            alt="main img"
          />
        </div>
      </div>
      <div className="trend-mail">
        <div className="trend-container">
          <img
            className="trend-img"
            src="https://photoshare-album.s3.ap-northeast-2.amazonaws.com/%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3%E1%84%91%E1%85%B5.png"
            alt="trend img"
          />
        </div>
        <div className="mail-container">
          <img
            className="mail-img"
            src="https://photoshare-album.s3.ap-northeast-2.amazonaws.com/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.png"
            alt="mail img"
          />
        </div>
      </div>
      <div className="detail-graph">
        <div className="detail-container">
          <img
            className="detail-img"
            src="https://photoshare-album.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6.png"
            alt="detail img"
          />
        </div>
        <div className="graph-container">
          <img
            className="graph-img"
            src="https://photoshare-album.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%AE%E1%84%89%E1%85%B5%E1%86%A8%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%91%E1%85%B3.png"
            alt="graph img"
          />
        </div>
      </div>
      <div className="estate-board">
        <div className="estate-container">
          <img
            className="estate-img"
            src="https://photoshare-album.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%AE%E1%84%83%E1%85%A9%E1%86%BC%E1%84%89%E1%85%A1%E1%86%AB.png"
            alt="estate img"
          />
        </div>
        <div className="board-container">
          <img
            className="board-img"
            src="https://photoshare-album.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%A6%E1%84%89%E1%85%B5%E1%84%91%E1%85%A1%E1%86%AB.png"
            alt="board img"
          />
        </div>
      </div>
    </HomeWrapper>
  );
};

export default HomePage;
const HomeWrapper = styled.div`
  background-color: white;
  min-height: 1000px;

  .trend-mail {
    padding-top: 20px;
    display: flex;
    width: 100%;
    .trend-container {
      display: flex;
      width: 100%;
      .trend-img {
        width: 100%;
      }
    }
    .mail-container {
      display: flex;
      width: 100%;
      .mail-img {
        width: 100%;
      }
    }
  }

  .detail-graph {
    padding-top: 20px;
    display: flex;
    width: 100%;
    .detail-container {
      display: flex;
      width: 100%;
      .detail-img {
        width: 100%;
      }
    }
    .graph-container {
      display: flex;
      width: 100%;
      .graph-img {
        width: 100%;
      }
    }
  }

  .estate-board {
    display: flex;
    width: 100%;
    .estate-container {
      display: flex;
      width: 100%;
      .estate-img {
        width: 100%;
      }
    }
    .board-container {
      padding-top: 20px;
      display: flex;
      width: 100%;
      .board-img {
        width: 100%;
      }
    }
  }

  .img-container {
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;

    .each-img {
      height: 100%;
      width: 50%;
    }
  }
`;
