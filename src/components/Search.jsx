// Search.jsx
import styled from "styled-components";
import React from "react";

function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <SearchBarWrapper>
      <form onSubmit={handleSubmit}>
        <input name="filter" placeholder="검색할 조건을 입력해 주세요..." />
        <button>검색</button>
      </form>
    </SearchBarWrapper>
  );
}

export default Search;
const SearchBarWrapper = styled.div`
  form {
    padding: 20px;
    display: flex;
    input {
      padding: 8px;
      width: 14%;
    }
    button {
      all: unset;
      border: 1px solid black;
      background-color: green;
      color: white;
      font-weight: bold;
      opacity: 0.7;
      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
`;
