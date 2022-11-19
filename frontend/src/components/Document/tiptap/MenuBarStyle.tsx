// modules
import styled from "styled-components";

export const Background = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 140px;

  background-color: ${(props) => props.theme.bgColor};
  z-index: 10;
`;

export const MenuBarWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;

  /* 추후 종단점 별 Text Editor 폭 수정 */
  width: 100%;
  max-width: 900px;
  max-height: 100px;
  padding: 20px 0;

  background-color: white;
`;

export const EditorButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 0.6rem;
  border: none;
  border-radius: 0.6rem;
  background-color: white;
  color: gray;
  cursor: pointer;
  & i,
  & span {
    font-size: 2rem;
  }
  &.is-active {
    background-color: ${(props) => props.theme.secondaryLightBlueColor};
    color: black;
    font-weight: 700;
  }
`;
