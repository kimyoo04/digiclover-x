import moment from "moment";

export const COLUMNS = [
  {
    Header: "id",
    accessor: "id",
    disableFilters: true,
    disableSortBy: true,
    show: false,
  },

  {
    Header: "UserId1",
    accessor: "UserId1",
    disableFilters: true,
    disableSortBy: true,
    show: false,
  },
  {
    Header: "UserId2",
    accessor: "UserId2",
    disableFilters: true,
    disableSortBy: true,
    show: false,
  },
  {
    Header: "UserId3",
    accessor: "UserId3",
    disableFilters: true,
    disableSortBy: true,
    show: false,
  },
  {
    Header: "UserId4",
    accessor: "UserId4",
    disableFilters: true,
    disableSortBy: true,
    show: false,
  },
  {
    Header: "Title",
    accessor: "docuTitle",
  },
  {
    Header: "Type",
    accessor: "docuKind",
  },
  {
    Header: "Date",
    accessor: "createdAt", // 만료기간 업데이트하기
    Cell: ({value}: {value: number}) => {
      return moment.utc(value).format("YYYY-MM-DD");
    },
  },
];

export const GROUPED_COLUMNS = [];
