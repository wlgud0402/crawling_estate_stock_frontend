import React, { useState } from "react";
import styled from "styled-components";
import { useMemo } from "react";
import axios from "axios";
import Table from "../components/Table";
import xlsx from "xlsx";

const EstateMainPage = () => {
  const columns = useMemo(
    () => [
      {
        Header: "대표이미지",
        accessor: "repImgUrl",
        maxWidth: 70,
        minWidth: 70,
        Cell: ({ cell: { value } }) => <img src={value} width={60} />,
      },
      {
        accessor: "hscpNm",
        Header: "아파트명",
      },
      {
        accessor: "hscpTypeCd",
        Header: "건물타입",
      },
      {
        accessor: "hscpTypeNm",
        Header: "빌딩타입",
      },
      {
        accessor: "totDongCnt",
        Header: "동수",
      },
      {
        accessor: "totHsehCnt",
        Header: "세대수",
      },
      {
        accessor: "useAprvYmd",
        Header: "사용승인일",
      },
      // {
      //   accessor: "repImgUrl",
      //   Header: "대표이미지",
      // },
      {
        accessor: "dealCnt",
        Header: "가용매매",
      },
      {
        accessor: "leaseCnt",
        Header: "가용전세",
      },
      {
        accessor: "rentCnt",
        Header: "가용월세",
      },
      {
        accessor: "strmRentCnt",
        Header: "가용단기",
      },
      {
        accessor: "totalAtclCnt",
        Header: "총가용",
      },
      {
        accessor: "minSpc",
        Header: "최소면적",
      },
      {
        accessor: "maxSpc",
        Header: "최대면적",
      },
      {
        accessor: "dealPrcMin",
        Header: "최소매매가",
      },
      {
        accessor: "dealPrcMax",
        Header: "최대매매가",
      },
      {
        accessor: "leasePrcMin",
        Header: "최소전세가",
      },
      {
        accessor: "leasePrcMax",
        Header: "최대전세가",
      },
    ],
    []
  );

  //검색할 지역
  const [location, setLocation] = useState("");
  const [estateInfos, setEstateInfos] = useState([
    {
      // hscpNo: "1267",
      hscpNm: "대림우성2차",
      hscpTypeCd: "A03",
      hscpTypeNm: "아파트",
      totDongCnt: 2,
      totHsehCnt: 118,
      useAprvYmd: "1987.12.11.",
      repImgUrl: "",
      dealCnt: 3,
      leaseCnt: 4,
      rentCnt: 2,
      strmRentCnt: 6,
      totalAtclCnt: 3,
      minSpc: "73.04",
      maxSpc: "73.04",
      dealPrcMin: "4억 8,000",
      dealPrcMax: "5억",
    },
  ]);
  //입력받은 지역을 django서버로 보낸후 데이터를 받아옵니다.
  const getEstate = async () => {
    const estateInfosData = await axios.post("/api/crawling/estate/", {
      location: location,
    });
    setEstateInfos(estateInfosData.data.all_danji_resp);
  };

  const onLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const onDownload = () => {
    const ws = xlsx.utils.json_to_sheet(estateInfos);
    [
      "아파트명",
      "건물타입",
      "빌딩타입",
      "동수",
      "세대수",
      "사용승인일",
      "대표이미지",
      "가용매매",
      "가용전세",
      "가용월세",
      "가용단기",
      "총가용",
      "최소면적",
      "최대면적",
      "최소매매가",
      "최대매매가",
      "최소전세가",
      "최대전세가",
    ].forEach((x, idx) => {
      const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
      ws[cellAdd].v = x;
    });
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "Test.xlsx");
  };

  return (
    <EstateWrapper>
      <h1>부동산 매물찾기</h1>
      <SearchWrapper>
        <SearchKeyWord>
          검색지역
          <input
            type="text"
            placeholder="검색지역"
            value={location}
            onChange={onLocationChange}
          />
        </SearchKeyWord>
        <SearchKeyWord>
          이미지 설정
          <select>
            <option>O</option>
            <option>X</option>
          </select>
        </SearchKeyWord>
        <SearchOption>
          <button onClick={getEstate} className="searchButton">
            매물검색
          </button>
          {true ? (
            <button className="searchButton" onClick={onDownload}>
              엑셀다운로드
            </button>
          ) : (
            <button>엑셀다운로드</button>
          )}
          {true ? (
            <button className="searchButton">이메일 전송</button>
          ) : (
            <button>이메일 전송</button>
          )}
        </SearchOption>
      </SearchWrapper>

      <EstateDataWrapper>
        {!estateInfos.length ? (
          <div>Loading..</div>
        ) : (
          <Table columns={columns} data={estateInfos} />
        )}
      </EstateDataWrapper>
    </EstateWrapper>
  );
};

export default EstateMainPage;
const EstateWrapper = styled.div`
  min-height: 1000px;
  /* height: 100%;
  overflow-y: scroll; */
`;

const SearchWrapper = styled.div`
  padding: 0px 10px 0px 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
`;

const SearchKeyWord = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
`;

//매물검색 버튼, 버튼 눌렀을때 => 엑셀다운로드, 이메일 전송 버튼
const SearchOption = styled.div`
  .searchButton {
    all: unset;
    height: 100%;
    margin-left: 10px;
    background-color: black;
    color: white;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      background-color: gray;
      color: white;
    }
  }
`;

const EstateDataWrapper = styled.div``;
