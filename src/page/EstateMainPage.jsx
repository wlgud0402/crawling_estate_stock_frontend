import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMemo } from "react";
import axios from "axios";
import Table from "../components/Table";
import xlsx from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";

const EstateMainPage = () => {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let user_token = localStorage.getItem("user_token");
      setUserInfo(user_token);
    }
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "대표이미지",
        accessor: "repImgUrl",
        maxWidth: 70,
        minWidth: 70,
        Cell: ({ cell: { value } }) => <img src={value} width={60} alt="img" />,
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
      repImgUrl:
        "https://landthumb-phinf.pstatic.net/20170117_111/apt_realimage_1484634046669opMNR_JPEG/eedc0e711225f33cd0af0b859b5bc561.jpg",
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
  const getEstate = async (e) => {
    e.preventDefault();
    const estateInfosData = await axios.post("/api/crawling/estate/", {
      location: location,
    });
    setEstateInfos(estateInfosData.data.all_danji_resp);
  };

  const onLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const onDownload = () => {
    if (localStorage.getItem("user_token")) {
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
      xlsx.writeFile(wb, `${location}.xlsx`);
    } else {
      alert("다운로드는 로그인이 필요합니다");
      return;
    }
  };

  const onSendMail = async () => {
    const res = await axios.post(
      "/api/mail/send/estate/",
      {
        data: estateInfos,
        location: location,
      },
      { headers: { token: userInfo } }
    );

    alert(res.data.msg);
  };

  return (
    <EstateWrapper>
      <SearchWrapper>
        <div className="titleText">검색지역</div>
        <form action="/estate/" className="formBox">
          <input
            type="text"
            placeholder="지역명, 단지명으로 검색..."
            value={location}
            onChange={onLocationChange}
          />
          <button type="submit" onClick={getEstate} className="searchIconBtn">
            <FontAwesomeIcon className="searchIcon" icon={faSearch} size="2x" />
          </button>
        </form>
        <div className="iconBox">
          <FontAwesomeIcon
            icon={faFileDownload}
            size="2x"
            className="downloadIcon"
            onClick={onDownload}
          />
          <FontAwesomeIcon
            icon={faEnvelopeSquare}
            size="2x"
            className="downloadIcon"
            onClick={onSendMail}
          />
        </div>
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
`;

const SearchWrapper = styled.div`
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  padding-bottom: 60px;

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
  .iconBox {
    height: 39px;

    .downloadIcon {
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
`;

const EstateDataWrapper = styled.div``;
