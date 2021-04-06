import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import Table from "../components/Table";
import xlsx from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";

const StockDetailPage = () => {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let user_token = localStorage.getItem("user_token");
      setUserInfo(user_token);
    }
  }, []);
  const [stockName, setStockName] = useState("");
  const [firstName, setFirstName] = useState("삼성전자 -예시");
  const [stockDetail, setStockDetail] = useState([
    {
      now_price: "802,000",
      sell_price: "802,000",
      buy_price: "801,000",
      compare_yesterday_proportion: "+1.78%",
      compare_yesterday_money: "상승 14,000",
      yesterday_price: "788,000",
      trade_amount: "362,028",
      start_price: "795,000",
      high_price: "806,000",
      low_price: "781,000",
      income_momey: "288,383",
      face_price: "5,000원",
      high_limit: "1,024,000",
      yesterday_high_limit: "1,019,000",
      low_limit: "552,000",
      yesterday_low_limit: "549,000",
      PER: "122.46",
      EPS: "6,549",
      high_52: "1,050,000",
      low_52: "280,000",
      total_price: "566,151억원",
      market_sale_count: "70,592,343",
      foreigner: "31,179천주",
      have_momey: "352,961백만",
    },
  ]);
  const onStockNameChange = (e) => {
    setStockName(e.target.value);
  };

  const getStockDetail = async (e) => {
    e.preventDefault();
    setFirstName(stockName);
    const stocksDetailResp = await axios.post("/api/crawling/stock/detail/", {
      stock_name: stockName,
    });
    setStockDetail(stocksDetailResp.data.stock_detail);
  };

  const getStockDraw = () => {
    axios.post("/api/crawling/stock/detail/draw/", {
      stock_name: stockName,
    });
  };

  const onStockDetailDownload = () => {
    if (localStorage.getItem("user_token")) {
      const ws = xlsx.utils.json_to_sheet(stockDetail);
      [
        "현재가",
        "매도호가",
        "매수호가",
        "등락율",
        "전일대비",
        "전일가",
        "거래량",
        "시가",
        "고가",
        "저가",
        "거래대금(천)",
        "액면가",
        "상한가",
        "하한가",
        "전일상한",
        "전일하한",
        "PER",
        "EPS",
        "high_52",
        "low_52",
        "시가총액",
        "상장주식수",
        "외국인현재",
        "자본금",
      ].forEach((x, idx) => {
        const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
        ws[cellAdd].v = x;
      });
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
      xlsx.writeFile(wb, `${stockName}_상세정보.xlsx`);
    } else {
      alert("다운로드는 로그인이 필요합니다");
    }
  };

  const onSendMail = async () => {
    if (localStorage.getItem("user_token")) {
      const res = await axios.post(
        "/api/mail/send/stock/detail/",
        {
          data: stockDetail,
          name: stockName,
        },
        { headers: { token: userInfo } }
      );
      alert(res.data.msg);
    } else {
      alert("메일발송은 로그인이 필요합니다.");
    }
  };

  return (
    <StockWrapper>
      <SearchWrapper>
        <div className="titleText">검색종목</div>
        <form action="/stock/detail/" className="formBox">
          <input
            type="text"
            placeholder="주식 종목으로 검색..."
            value={stockName}
            onChange={onStockNameChange}
          />
          <button
            type="submit"
            onClick={getStockDetail}
            className="searchIconBtn"
          >
            <FontAwesomeIcon className="searchIcon" icon={faSearch} size="2x" />
          </button>
        </form>
        <div className="iconBox">
          <FontAwesomeIcon
            icon={faFileDownload}
            size="2x"
            className="fontIcon"
            onClick={onStockDetailDownload}
          />
          <FontAwesomeIcon
            icon={faEnvelopeSquare}
            size="2x"
            className="fontIcon"
            onClick={onSendMail}
          />
          <FontAwesomeIcon
            icon={faChartLine}
            size="2x"
            className="fontIcon"
            onClick={getStockDraw}
          />
        </div>
      </SearchWrapper>
      <StockTitle>
        <h1>- {firstName} -</h1>
      </StockTitle>
      <StockDetailDataWrapper>
        <table>
          <tbody>
            <tr>
              <th>현재가</th>
              <td>{stockDetail[0].now_price}</td>
            </tr>
            <tr>
              <th>전일대비</th>
              <td>{stockDetail[0].compare_yesterday_money}</td>
            </tr>
            <tr>
              <th>등락률(%)</th>
              <td>{stockDetail[0].compare_yesterday_proportion}</td>
            </tr>
            <tr>
              <th>거래량</th>
              <td>{stockDetail[0].trade_amount}</td>
            </tr>
            <tr>
              <th>거래대금(백만)</th>
              <td>{stockDetail[0].income_momey}</td>
            </tr>
            <tr>
              <th>액면가</th>
              <td>{stockDetail[0].face_price}</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
            </tr>
            <tr>
              <th>상한가</th>
              <td>{stockDetail[0].high_limit}</td>
            </tr>
            <tr>
              <th>하한가</th>
              <td>{stockDetail[0].low_limit}</td>
            </tr>
            <tr>
              <th>PER</th>
              <td>{stockDetail[0].PER}</td>
            </tr>
            <tr>
              <th>52주 최고</th>
              <td>{stockDetail[0].high_52}</td>
            </tr>
            <tr>
              <th>시가총액</th>
              <td>{stockDetail[0].total_price}</td>
            </tr>
            <tr>
              <th>외국인현재</th>
              <td>{stockDetail[0].foreigner}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>매도호가</th>
              <td>{stockDetail[0].sell_price}</td>
            </tr>
            <tr>
              <th>매수호가</th>
              <td>{stockDetail[0].buy_price}</td>
            </tr>
            <tr>
              <th>전일가</th>
              <td>{stockDetail[0].yesterday_price}</td>
            </tr>
            <tr>
              <th>시가</th>
              <td>{stockDetail[0].start_price}</td>
            </tr>
            <tr>
              <th>고가</th>
              <td>{stockDetail[0].high_price}</td>
            </tr>
            <tr>
              <th>저가</th>
              <td>{stockDetail[0].low_price}</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
            </tr>
            <tr>
              <th>전일상한</th>
              <td>{stockDetail[0].yesterday_high_limit}</td>
            </tr>
            <tr>
              <th>전일하한</th>
              <td>{stockDetail[0].yesterday_low_limit}</td>
            </tr>
            <tr>
              <th>EPS</th>
              <td>{stockDetail[0].EPS}</td>
            </tr>
            <tr>
              <th>52주 최저</th>
              <td>{stockDetail[0].low_52}</td>
            </tr>
            <tr>
              <th>상장주식수</th>
              <td>{stockDetail[0].market_sale_count}</td>
            </tr>
            <tr>
              <th>자본금</th>
              <td>{stockDetail[0].have_momey}</td>
            </tr>
          </tbody>
        </table>
      </StockDetailDataWrapper>
    </StockWrapper>
  );
};

export default StockDetailPage;

const StockWrapper = styled.div`
  min-height: 1000px;
`;

const SearchWrapper = styled.div`
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  padding-bottom: 60px;

  .iconBox {
    height: 39px;

    .fontIcon {
      color: orange;
      background-color: white;
      height: 100%;
      margin-left: 10px;
      &:hover {
        color: darkorange;
        cursor: pointer;
      }
    }
  }

  .titleText {
    margin-right: 10px;
    font-weight: bold;
  }

  .formBox {
    display: flex;
    width: 250px;
    margin-right: 10px;
    input {
      width: 100%;
      font-size: 17px;
      border: 1px solid orange;
      border-radius: 8px 0px 0px 8px;
    }
    .searchIconBtn {
      all: unset;
      background-color: orange;
      color: white;
      padding: 3px;
      border-radius: 0px 8px 8px 0px;
      &:hover {
        cursor: pointer;
        background-color: darkorange;
      }
    }
  }
`;

const StockDetailDataWrapper = styled.div`
  display: flex;
  table th {
    /* background-color: lightskyblue;
    opacity: 0.9; */
  }
`;

const StockTitle = styled.div`
  display: flex;
  justify-content: center;
`;
