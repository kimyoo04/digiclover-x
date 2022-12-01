// modules
import {useMemo} from "react";
import {
  useTable,
  useFlexLayout,
  useResizeColumns,
  useSortBy,
} from "react-table";
import {useSticky} from "react-table-sticky";
// table
import {COLUMNS} from "./config/columns";
// style
import {CheckboxWrapper, Table} from "./TableStyle";
import actionsHook from "./hooks/ActionsHooks";

const StorageTable = ({documents}) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    return documents;
  }, [documents]);
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
        hiddenColumns: ["id"],
        sortBy: [
          {
            id: "createdAt",
            desc: true,
          },
        ],
      },
    },
    actionsHook,
    useFlexLayout,
    useResizeColumns,
    useSortBy,
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
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {/* column header text */}
                  <div>{column.render("Header")}</div>
                  {/* column sorting */}
                  <div>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="ri-arrow-down-s-line"></i>
                      ) : (
                        <i className="ri-arrow-up-s-line"></i>
                      )
                    ) : (
                      ""
                    )}
                  </div>

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
