import {useState} from "react";
import Alert from "Components/Alert";
import Header from "Routes/layouts/Header";
import Login from "./Login";

interface IProtectedRouteProps {
  isAuthenticated: boolean;
  outlet: JSX.Element;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isAuthenticated,
  outlet,
}: IProtectedRouteProps) => {
  const [alert, setAlert] = useState(true);
  const alertMessage = {
    alertType: "Warning",
    content: "로그인 이후 이용가능합니다.",
  };

  function closeAlert() {
    setAlert((prev) => !prev);
  }

  if (isAuthenticated) {
    return outlet;
  }
  return (
    <>
      <Header />
      {alert ? (
        <Alert alertMessage={alertMessage} closeAlert={closeAlert} />
      ) : null}
      <Login />
    </>
  );
};

export default ProtectedRoute;
