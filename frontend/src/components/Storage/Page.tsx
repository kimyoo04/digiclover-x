import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6rem;

  & span {
    font-size: 1.8rem;
    font-weight: 500;
    color: ${(props) => props.theme.bgWhiteColor};
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    & i {
      font-size: 2rem;
      font-weight: 500;
      color: ${(props) => props.theme.bgWhiteColor};
    }

    & i.bigger {
      font-size: 2.8rem;
    }

    & i.disabled {
      color: ${(props) => props.theme.grayscale3Color};
    }
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
        <div>
          <i className="ri-skip-back-fill disabled"></i>
          <i className="ri-arrow-left-s-fill bigger disabled"></i>
        </div>
      ) : (
        <div>
          <i className="ri-skip-back-fill" onClick={goFirst}></i>
          <i className="ri-arrow-left-s-fill bigger" onClick={goPrev}></i>
        </div>
      )}

      <span>{pageNum}</span>

      {pageNum === lastPage ? (
        <div>
          <i className="ri-arrow-right-s-fill bigger disabled"></i>
          <i className="ri-skip-forward-fill disabled"></i>
        </div>
      ) : (
        <div>
          <i className="ri-arrow-right-s-fill bigger" onClick={goNext}></i>
          <i className="ri-skip-forward-fill" onClick={goLast}></i>
        </div>
      )}
    </PageWrapper>
  );
};

export default Page;
