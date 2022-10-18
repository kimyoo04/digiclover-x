import Loading from "@components/Loading/Loading";
import {Navigate, Outlet} from "react-router-dom";

const UnauthenticatedRoute = ({user}: {user: boolean | undefined}) => {
  if (user === undefined) return <Loading />;

  return user ? <Navigate to="/home" /> : <Outlet />;
};
export default UnauthenticatedRoute;
