import {useState} from "react";
import Alert from "Components/Util/Alert";
import Header from "Routes/layouts/Header";
import Login from "./Login";

import {useAppSelector} from "app/hook";

interface IProtectedRouteProps {
  outlet: JSX.Element;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  outlet,
}: IProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [alert, setAlert] = useState(true);
  const alertMessage = {
    alertType: "Warning",
    content: "로그인 이후 이용 가능합니다.",
  };

  function closeAlert() {
    setAlert((prev) => !prev);
  }

  // jwt 있는 경우 진입
  if (isAuthenticated) {
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
