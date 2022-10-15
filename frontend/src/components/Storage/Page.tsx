import Button from "@components/Style/buttons";
import styled from "styled-components";

const PagesButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.bgWhiteColor};
  }
`;

const PagesButton = styled(Button)`
  background-color: transparent;

  & i {
    font-size: 24px;
    color: ${(props) => props.theme.bgWhiteColor};
  }
`;

const Page = () => {
  return (
    <PagesButtonWrapper>
      <PagesButton>
        <i className="ri-arrow-left-s-line"></i>
      </PagesButton>
      {/* <span>{pages}</span> */}
      <PagesButton>
        <i className="ri-arrow-right-s-line"></i>
      </PagesButton>
    </PagesButtonWrapper>
  );
};

export default Page;
