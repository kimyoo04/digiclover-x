import {useNavigate} from "react-router-dom";

import styled from "styled-components";
import Button from "Components/Style/buttons";
import {Label} from "Components/Document/document";
import {Wrapper} from "Components/layout";

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
      <Label>존재하지 않는 URL 입니다!</Label>
      <HomeButton onClick={goHome}>홈으로 이동</HomeButton>
    </Wrapper>
  );
};

export default NoMatch;
