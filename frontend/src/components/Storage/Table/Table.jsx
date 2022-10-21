// modules
import {useMemo} from "react";
import {useTable} from "react-table";
// table
import {COLUMNS} from "./columns";
// style
import {CheckboxWrapper, Table} from "./TableStyle";
import statusHooks from "./StatusHooks";
import actionsHook from "./ActionsHooks";

const StorageTable = ({documents}) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    return documents;
  }, []);

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
        hiddenColumns: ["id", "UserId1", "UserId2", "UserId3", "UserId4"],
      },
    },
    statusHooks,
    actionsHook
  );

  return (
    <>
      {/* 테이블 컬럼 토글 */}
      <CheckboxWrapper>
        {allColumns.map((column) => {
          if (
            column.Header === "Title" ||
            column.Header === "Type" ||
            column.Header === "Date"
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
