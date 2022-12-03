import styled from "styled-components";

const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.color};
  border-radius: 6px;
  border: none;

  width: 5rem;
  height: 3.4rem;

  transition: 0.1s;

  & span {
    color: black;
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const DocuStatusIcon = ({color, text}) => {
  return (
    <StatusWrapper>
      <Status color={color}>
        <span>{text}</span>
      </Status>
    </StatusWrapper>
  );
};

const statusHooks = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    {
      id: "status",
      Header: "Status",
      Cell: ({row}) => {
        switch (row.step) {
          case 3:
            return <DocuStatusIcon color={"whitesmoke"} text={"작성 중"} />;
          default:
            return <DocuStatusIcon color={"whitesmoke"} text={"전송 전"} />;
        }
      },
    },
    ...columns,
  ]);
};

export default statusHooks;
