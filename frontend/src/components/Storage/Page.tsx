import React from "react";
import Button from "@components/Style/buttons";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  & span {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.bgWhiteColor};
  }
  & i {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.bgWhiteColor};
  }

  & i.disabled {
    color: ${(props) => props.theme.grayscale3Color};
  }
`;

const Page = ({
  pageNum,
  lastPage,
  setPageNum,
}: {
  pageNum: number;
  lastPage: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const goFirst = () => {
    setPageNum(1);
  };
  const goPrev = () => {
    setPageNum(pageNum - 1);
  };
  const goNext = () => {
    setPageNum(pageNum + 1);
  };
  const goLast = () => {
    setPageNum(lastPage);
  };

  return (
    <PageWrapper>
      {pageNum === 1 ? (
        <>
          <i className="ri-skip-back-fill disabled"></i>
          <i className="ri-arrow-left-s-fill disabled"></i>
        </>
      ) : (
        <>
          <i className="ri-skip-back-fill" onClick={goFirst}></i>
          <i className="ri-arrow-left-s-fill" onClick={goPrev}></i>
        </>
      )}

      <span>{pageNum}</span>

      {pageNum === lastPage ? (
        <>
          <i className="ri-arrow-right-s-fill disabled"></i>
          <i className="ri-skip-forward-fill disabled"></i>
        </>
      ) : (
        <>
          <i className="ri-arrow-right-s-fill" onClick={goNext}></i>
          <i className="ri-skip-forward-fill" onClick={goLast}></i>
        </>
      )}
    </PageWrapper>
  );
};

export default Page;
