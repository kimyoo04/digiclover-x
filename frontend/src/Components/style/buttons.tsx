import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  height: 35px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: 0.1s;
  color: black;
  background-color: ${(props) => props.theme.primaryGreenColor};
  border: none;
`;

export default Button;
