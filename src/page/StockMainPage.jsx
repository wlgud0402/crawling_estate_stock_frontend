import React, { useState, useRef, useMemo, useEffect } from "react";
import styled from "styled-components";
import Table from "../components/Table";
import axios from "axios";
import xlsx from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";

const StockMainPage = () => {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let user_token = localStorage.getItem("user_token");
      setUserInfo(user_token);
    }
  }, []);
  const [stockKind, setStockKind] = useState("");
  const [stockPage, setStockPage] = useState("");

  const columns = useMemo(
    () => [
      {
        accessor: "rank",
        Header: "순위",
      },
      {
        accessor: "name",
        Header: "주식명",
      },
      {
        accessor: "code",
        Header: "주식코드",
      },
      {
        accessor: "now_price",
        Header: "현재가",
      },
      {
        accessor: "total_price",
        Header: "시가총액",
      },
      {
        accessor: "trade_amount",
        Header: "거래량",
      },
      {
        accessor: "compare_yesterday_proportion",
        Header: "등락율",
      },
      {
        accessor: "compare_yesterday_money",
        Header: "전일대비",
      },
    ],
    []
  );

  const sosokRef = useRef();
  const stockCountRef = useRef();
  const [stockTrends, setStockTrends] = useState([
    {
      rank: "1",
      name: "삼성전자",
      link: "https://finance.naver.com/item/main.nhn?code=005930",
      code: "005930",
      now_price: "81,500",
      total_price: "4,865,373",
      trade_amount: "12,731,766",
      compare_yesterday_money: "300",
      compare_yesterday_proportion: "+0.37%",
    },
  ]);
  const getStockTrend = async () => {
    setStockKind(sosokRef.current.value);
    setStockPage(stockCountRef.current.value);
    const stocksTrendResp = await axios.post("/api/crawling/stock/trend/", {
      sosok: sosokRef.current.value,
      page: stockCountRef.current.value,
    });
    setStockTrends(stocksTrendResp.data.stocks_trend);
  };

  const onStockTrendDownload = () => {
    if (localStorage.getItem("user_token")) {
      const ws = xlsx.utils.json_to_sheet(stockTrends);
      [
        "순위",
        "이름",
        "코드",
        "현재가",
        "시가총액",
        "거래량",
        "전일대비",
        "등락율",
      ].forEach((x, idx) => {
        const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
        ws[cellAdd].v = x;
      });
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
      xlsx.writeFile(wb, "주식트랜드.xlsx");
    } else {
      alert("다운로드는 로그인이 필요합니다");
    }
  };
  const onSendMail = async () => {
    if (localStorage.getItem("user_token")) {
      const res = await axios.post(
        "/api/mail/send/stock/",
        {
          data: stockTrends,
          kind: stockKind,
          page: stockPage,
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
        <SearchKeyWord>
          종류 설정
          <select ref={sosokRef}>
            <option value={0}>코스피</option>
            <option value={1}>코스닥</option>
          </select>
        </SearchKeyWord>
        <SearchKeyWord>
          갯수 설정
          <select ref={stockCountRef}>
            <option value={2}>50</option>
            <option value={3}>100</option>
            <option value={4}>150</option>
            <option value={5}>200</option>
            <option value={6}>250</option>
            <option value={7}>300</option>
          </select>
        </SearchKeyWord>
        <SearchOption>
          <FontAwesomeIcon
            icon={faSearch}
            size="2x"
            className="FontSearchIcon"
            onClick={getStockTrend}
          />
          <div className="iconBox">
            <FontAwesomeIcon
              icon={faFileDownload}
              size="2x"
              className="FontIcon"
              onClick={onStockTrendDownload}
            />
            <FontAwesomeIcon
              icon={faEnvelopeSquare}
              size="2x"
              className="FontIcon"
              onClick={onSendMail}
            />
          </div>
        </SearchOption>
      </SearchWrapper>
      <StockTrendDataWrapper>
        {!stockTrends.length ? (
          <div>Loading..</div>
        ) : (
          <Table columns={columns} data={stockTrends} className="table" />
        )}
      </StockTrendDataWrapper>
    </StockWrapper>
  );
};

export default StockMainPage;

const StockWrapper = styled.div`
  min-height: 1000px;
`;

const SearchWrapper = styled.div`
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  padding-bottom: 60px;
`;

const SearchKeyWord = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  background-color: orange;
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 2px;
  select {
    font-size: 15px;
  }
`;

//매물검색 버튼, 버튼 눌렀을때 => 엑셀다운로드, 이메일 전송 버튼
const SearchOption = styled.div`
  display: flex;
  .FontSearchIcon {
    background-color: orange;
    color: white;
    padding: 3px;
    margin-right: 6px;
    height: 88%;
    border-radius: 0px 8px 8px 0px;
    &:hover {
      cursor: pointer;
      background-color: darkorange;
    }
  }

  .FontIcon {
    background-color: white;
    color: orange;
    padding: 3px;
    margin-right: 6px;
    margin-left: 6px;
    height: 88%;
    &:hover {
      cursor: pointer;
      color: darkorange;
    }
  }
`;

const StockTrendDataWrapper = styled.div`
  .table {
    overflow-x: auto;
    text-align: center;
  }
`;
