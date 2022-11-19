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
        // userId2~4 (-1 최우선, 그다음 0, 그다음 null)
        const statusArr = [
          row.values.contractors[1].userId,
          row.values.contractors[2].userId,
          row.values.contractors[3].userId,
        ];
        let status;
        if (statusArr.includes("-1")) {
          status = "-1";
        } else if (statusArr.includes("0")) {
          status = "0";
        } else if (statusArr.includes(null)) {
          status = null;
        } else {
          status = "만료";
        }

        // userId2~4 검사 후 status 반환
        switch (status) {
          // - 거절 (빨강색) - 문서의 UserId2~4 중 -1 이 있는 경우
          case "-1":
            return <DocuStatusIcon color={"#E66F6F"} text={"거절"} />;
          // - 진행중 (흰색) - 문서의 UserId2~4 중 0 이 있는 경우
          case "0":
            return <DocuStatusIcon color={"whitesmoke"} text={"진행 중"} />;
          // - 완료 (초록색) - 문서의 UserId2~4 중 0 이 없는 경우
          case null:
            return <DocuStatusIcon color={"#44A26C"} text={"완료"} />;
          // - 만료 (노랑색) - 문서의 createdAt로 부터 *2주(특정 기간 컬럼 생성?)*가 지난 경우
          default:
            return <DocuStatusIcon color={"#EBCB67"} text={"만료"} />;
        }
      },
    },
    ...columns,
  ]);
};

export default statusHooks;
