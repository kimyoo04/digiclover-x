import {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "./app/hook";
import {authActions} from "@features/auth/authSlice";

// routes
import Home from "@routes/Home";
import Login from "@routes/Signin";
import Signup from "@routes/Signup";
import DocumentStart from "@routes/document/Start";
import Document from "@routes/document/Document";
import Storage from "@routes/Storage";
import Modal from "@components/Storage/Modal/Modal";
import Profile from "@routes/Profile";
import NoMatch from "@routes/NoMatch";

// components
import HeaderAuth from "@components/Header/HeaderAuth";
import HeaderNoAuth from "@components/Header/HeaderNoAuth";
import ScrollToTop from "@components/Util/ScrollToTop";
import AuthenticatedRoute from "@components/Auth/AuthenticatedRoute";
import UnauthenticatedRoute from "@components/Auth/UnauthenticatedRoute";
import DocuView from "@components/Storage/Modal/DocuView";
// styles
import {darkTheme, lightTheme} from "@constants/styles/theme";

// firebase
import {onAuthStateChanged, signOut} from "firebase/auth";
import {authService, dbService} from "src/fbase";
import {collection, getDocs, query, where} from "firebase/firestore";

function App() {
  const dispatch = useAppDispatch();

  // authencation persistence
  const [user, setUser] = useState<boolean | undefined>(undefined);

  // theme dark and light
  const isDark = useAppSelector((state) => state.theme.isDark);

  // authencation check + add User doc first time
  useEffect(() => {
    try {
      onAuthStateChanged(authService, async (user) => {
        if (user) {
          // 이메일 인증 유무 확인
          if (!user.emailVerified) {
            alert("이메일 인증을 하지 않았습니다.");
            throw new Error("이메일 인증을 하지 않았습니다.");
          }

          const userQuery = query(
            collection(dbService, "users"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(userQuery);
          const userData: any = querySnapshot.docs[0].data();

          // store 에 유저 정보 저장
          dispatch(
            authActions.signin({
              id: userData.uid,
              company: userData.company,
              email: userData.email,
              phone: userData.phone,
              name: userData.name,
              ongoings: userData.ongoings,
            })
          );
          console.log("authActions signin");
          console.log("user \n", user);

          // 로그인 유지를 위한 setUser state
          setUser(true);
        } else {
          dispatch(authActions.signout());
          console.log("authActions signout");
          setUser(false);
        }
      });
    } catch (error) {
      console.error(error);
      signOut(authService);
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AuthenticatedRoute user={user} />}>
            <Route element={<HeaderAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/document" element={<DocumentStart />} />
              <Route path="/storage" element={<Storage />}>
                <Route path="emailed" element={<Storage />}>
                  <Route path=":id" element={<Modal prevURL="emailed" />} />
                </Route>
                <Route path="notemailed" element={<Storage />}>
                  <Route path=":id" element={<Modal prevURL="notemailed" />} />
                </Route>
                <Route path="draft" element={<Storage />}>
                  <Route path=":id" element={<Modal prevURL="draft" />} />
                </Route>
                <Route path="docuview/:id" element={<DocuView />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/document/write" element={<Document />} />
          </Route>

          <Route element={<UnauthenticatedRoute user={user} />}>
            <Route element={<HeaderNoAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
