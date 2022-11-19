// modules
import styled from "styled-components";

export const WritingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px 20px;
  width: 100%;
  /* 추후 종단점 별 Text Editor 폭 수정 */
  max-width: 900px;
  min-width: 900px;
  min-height: 1000px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-top: none;
`;

export const EditorWrap = styled.div`
  width: 100%;
  padding: 0 40px;
`;
