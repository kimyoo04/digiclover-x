// modules
import {useMemo} from "react";
import {useTable, useFlexLayout, useResizeColumns} from "react-table";
import {useSticky} from "react-table-sticky";
// table
import {COLUMNS} from "./config/columns";
// style
import {CheckboxWrapper, Table} from "./TableStyle";
import statusHooks from "./hooks/StatusHooks";
import actionsHook from "./hooks/ActionsHooks";

const StorageTable = ({documents}) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    return documents;
  }, []);
  const defaultColumn = useMemo(
    () => ({
      minWidth: 20,
      width: 40,
      maxWidth: Number.MAX_SAFE_INTEGER,
    }),
    []
  );

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
      defaultColumn,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ["id", "UserId1", "UserId2", "UserId3", "UserId4"],
      },
    },
    statusHooks,
    actionsHook,
    useFlexLayout,
    useResizeColumns,
    useSticky
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
      <Table className="sticky" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()}>
                  {/* column header text */}
                  {column.render("Header")}

                  {/* column width controller */}
                  {column.canResize &&
                  index !== headerGroup.headers.length - 1 ? (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                      onClick={(event) => event.stopPropagation()}
                    />
                  ) : null}
                </th>
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
