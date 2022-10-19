// modules
import {useMemo} from "react";
import {useTable} from "react-table";
// firebase
import {deleteDoc, doc} from "firebase/firestore";
import {dbService} from "src/fbase";
// table
import {COLUMNS} from "./columns";
import {useNavigate} from "react-router-dom";
// style
import {
  ActionWrapper,
  CheckboxWrapper,
  DeleteButton,
  ModalButton,
  StatusIcon,
  Table,
} from "./TableStyle";

const StorageTable = ({documents}) => {
  const navigate = useNavigate();

  const onDeleteAlert = async (documentId) => {
    if (
      window.confirm(
        "정말로 문서를 삭제하시겠습니까? 삭제되면 복구되지 않습니다."
      ) === true
    ) {
      const documentRef = doc(dbService, "documents", documentId);
      await deleteDoc(documentRef).catch((error) => console.log(error));
    } else {
    }
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    return documents;
  }, []);

  const actionHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "action",
        Header: "Action",
        Cell: ({row}) => {
          return (
            <ActionWrapper>
              <ModalButton
                onClick={() => navigate(`/storage/${row.values.id}`)}
              >
                <i className="ri-file-list-2-line"></i>
              </ModalButton>
              <DeleteButton onClick={() => onDeleteAlert(row.values.id)}>
                <i className="ri-delete-bin-line"></i>
              </DeleteButton>
            </ActionWrapper>
          );
        },
      },
    ]);
  };

  const statusHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: "status",
        Header: "Status",
        Cell: ({row}) => {
          // UserId2~4 (-1 최우선, 그다음 0, 그다음 null)
          const statusArr = [
            row.values.UserId2,
            row.values.UserId3,
            row.values.UserId4,
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

          // UserId2~4 검사 후 status 반환
          switch (status) {
            // - 거절 (빨강색) - 문서의 UserId2~4 중 -1 이 있는 경우
            case "-1":
              return (
                <StatusIcon color={"#E66F6F"}>
                  <span>거절</span>
                </StatusIcon>
              );
            // - 진행중 (흰색) - 문서의 UserId2~4 중 0 이 있는 경우
            case "0":
              return (
                <StatusIcon color={"whitesmoke"}>
                  <span>진행중</span>
                </StatusIcon>
              );
            // - 완료 (초록색) - 문서의 UserId2~4 중 0 이 없는 경우
            case null:
              return (
                <StatusIcon color={"#44A26C"}>
                  <span>완료</span>
                </StatusIcon>
              );
            // - 만료 (노랑색) - 문서의 createdAt로 부터 *2주(특정 기간 컬럼 생성?)*가 지난 경우
            default:
              return (
                <StatusIcon color={"#EBCB67"}>
                  <span>만료</span>
                </StatusIcon>
              );
          }
        },
      },
      ...columns,
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ["id", "UserId1", "UserId2", "UserId3", "UserId4"], //use property option, in columns define id name "id"
      },
    },
    statusHooks,
    actionHooks
  );

  return (
    <>
      {/* 테이블 컬럼 뷰 토글 */}
      <CheckboxWrapper>
        {allColumns.map((column) => {
          if (
            column.Header === "Status" ||
            column.Header === "Title" ||
            column.Header === "Type" ||
            column.Header === "Date" ||
            column.Header === "Action"
          ) {
            return (
              <div key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                  <span>{column.Header}</span>
                </label>
              </div>
            );
          } else {
            // id column checkbox hide
            return null;
          }
        })}
      </CheckboxWrapper>

      {/* 테이블 */}
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default StorageTable;
