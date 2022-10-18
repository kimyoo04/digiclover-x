import {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components";
// redux-toolkit
import {useAppDispatch, useAppSelector} from "./app/hook";
import {authActions} from "@features/auth/authSlice";
// constants
import {darkTheme, lightTheme} from "@constants/theme";

// home route
import Home from "@routes/Home";
// auth route
import Login from "@routes/Signin";
import Signup from "@routes/Signup";
// document route
import DocumentStart from "@routes/document/Start";
import Document from "@routes/document/Document";
// storage route
import Storage from "@routes/Storage";
import DocumentModal from "@components/Storage/Modal/DocumentModal";
// profile route
import Profile from "@routes/Profile";
// etc route
import NoMatch from "@routes/NoMatch";

// components
import HeaderAuth from "@components/Header/HeaderAuth";
import HeaderNoAuth from "@components/Header/HeaderNoAuth";
import Footer from "@components/Footer";
import ScrollToTop from "@components/Util/ScrollToTop";
import AuthenticatedRoute from "@components/Auth/AuthenticatedRoute";
import UnauthenticatedRoute from "@components/Auth/UnauthenticatedRoute";

// firebase
import {onAuthStateChanged} from "firebase/auth";
import {authService} from "./fbase";

function App() {
  const dispatch = useAppDispatch();

  // authencation persistence
  const [user, setUser] = useState<boolean | undefined>(undefined);

  // theme dark and light
  const isDark = useAppSelector((state) => state.theme.isDark);

  // authencation check
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        dispatch(
          authActions.signin({
            id: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );
        console.log("authActions signin");
        setUser(true);
      } else {
        dispatch(authActions.signout());
        console.log("authActions signout");
        setUser(false);
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AuthenticatedRoute user={user} />}>
            <Route element={<HeaderAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/document/start" element={<DocumentStart />} />
              <Route path="/document" element={<Document />} />
              <Route path="/storage" element={<Storage />}>
                <Route path=":id" element={<DocumentModal />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
            </Route>
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
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
