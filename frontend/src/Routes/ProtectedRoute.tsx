import {useState} from "react";
import Alert from "Components/Alert";
import Header from "Routes/layouts/Header";
import Login from "./Login";

interface IProtectedRouteProps {
  outlet: JSX.Element;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  outlet,
}: IProtectedRouteProps) => {
  const [alert, setAlert] = useState(true);
  const alertMessage = {
    alertType: "Warning",
    content: "로그인 이후 이용 가능합니다.",
  };

  function closeAlert() {
    setAlert((prev) => !prev);
  }

  // 토큰 있는 경우 outlet 랜더
  const token = localStorage.getItem("authToken");
  if (token) {
    return outlet;
  }

  // 토큰 없는 경우 로그인과 경고 알림 랜더
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
