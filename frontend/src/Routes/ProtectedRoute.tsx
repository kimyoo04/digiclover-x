// modules
import {useState} from "react";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "@app/hook";
import {alertActions} from "@features/alert/alertSlice";
// routes
import Login from "@routes/Signin";
// components
import Alert from "@components/Util/Alert";
import HeaderLayout from "@components/Header/HeaderNoAuth";

interface IProtectedRouteProps {
  outlet: JSX.Element;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  outlet,
}: IProtectedRouteProps) => {
  const [isFirst, setIsFirst] = useState(true);

  const isAlert = useAppSelector((state) => state.alert.isAlert);
  const dispatch = useAppDispatch();
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // jwt 있는 경우 진입
  if (isAuthenticated) {
    return outlet;
  } else {
    // jwt 없는 경우 로그인 컴포넌트 노출

    if (isFirst) {
      // 알림 활성화
      dispatch(
        alertActions.alert({
          alertType: "Warning",
          content: "로그인 이후 이용 가능합니다.",
        })
      );
      setIsFirst(false);
    }

    // 토큰 없는 경우 로그인과 경고 알림 랜더
    return (
      <>
        <HeaderLayout />
        {isAlert ? <Alert /> : null}
        <Login />
      </>
    );
  }
};

export default ProtectedRoute;
