// modules
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// components
import Button from "@components/Style/buttons";
import {Label} from "@components/Document/documentStyles";
import {Wrapper} from "@components/layout";

const HomeButton = styled(Button)`
  width: 200px;
`;

const NoMatch = () => {
  let navigate = useNavigate();
  function goHome() {
    navigate(`/`);
  }
  return (
    <Wrapper>
      <Label>존재하지 않는 페이지입니다!</Label>
      <HomeButton onClick={goHome}>홈으로 이동</HomeButton>
    </Wrapper>
  );
};

export default NoMatch;
