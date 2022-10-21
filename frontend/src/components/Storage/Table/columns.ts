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
    Header: "Signed",
    accessor: ({
      UserId1,
      UserId2,
      UserId3,
      UserId4,
    }: {
      [key: string]: string | null;
    }) => {
      const users = [UserId1, UserId2, UserId3, UserId4];
      let contractorsNum = 0;
      let signedContractorsNum = 0;
      for (let user of users) {
        if (user !== null) {
          contractorsNum += 1;
          if (user !== "0") signedContractorsNum += 1;
        }
      }
      return `${signedContractorsNum} / ${contractorsNum}`;
    },
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
