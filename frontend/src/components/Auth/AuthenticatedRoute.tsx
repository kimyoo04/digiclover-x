import Loading from "@components/Loading/Loading";
import {Outlet, Navigate} from "react-router-dom";

const AuthenticatedRoute = ({user}: {user: boolean | undefined}) => {
  if (user === undefined) return <Loading />;

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default AuthenticatedRoute;
