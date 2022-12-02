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
        let uidsArr = [];
        for (let contractor of row.values.contractors) {
          if (contractor.uid) uidsArr.push(contractor.uid);
        }

        let status;
        if (uidsArr.includes("-1")) {
          status = "-1";
        } else if (uidsArr.includes("0")) {
          status = "0";
        } else {
          status = null;
        }

        switch (status) {
          case "-1":
            return <DocuStatusIcon color={"#E66F6F"} text={"거절"} />;
          case "0":
            return <DocuStatusIcon color={"whitesmoke"} text={"진행중"} />;
          default:
            return <DocuStatusIcon color={"#44A26C"} text={"완료"} />;
        }
      },
    },
    ...columns,
  ]);
};

export default statusHooks;
