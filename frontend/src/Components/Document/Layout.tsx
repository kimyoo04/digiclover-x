import {Outlet} from "react-router-dom";
import DocumentHeader from "Components/Document/Header";

const DocumentLayout = () => {
  return (
    <>
      <DocumentHeader />
      <Outlet />
    </>
  );
};

export default DocumentLayout;
