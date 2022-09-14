import styled from "styled-components";
import Button from "Components/style/buttons";
import {Wrapper} from "Components/style/document";
import {useNavigate} from "react-router-dom";

const NoMatch = () => {
  let navigate = useNavigate();

  return <Wrapper>Does not exist page!</Wrapper>;
};

export default NoMatch;
