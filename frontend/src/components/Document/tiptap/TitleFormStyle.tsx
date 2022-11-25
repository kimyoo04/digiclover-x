// modules
import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
`;

export const TitleInput = styled.input`
  /* 추후 종단점 별 Text Editor 폭 수정 */
  width: 100%;
  padding: 80px 20px 30px 20px;

  font-size: 24px;
  font-weight: 700;
  text-align: center;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: none;

  z-index: 10;

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }
`;
