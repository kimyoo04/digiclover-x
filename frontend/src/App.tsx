import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components";
// redux-toolkit
import {useAppSelector} from "./app/hook";
// constants
import {darkTheme, lightTheme} from "@constants/theme";

// home route
import Home from "@routes/Home";
// auth route
import Login from "@routes/Login";
import Signup from "@routes/Signup";
// document route
import DocumentStart from "@routes/document/Start";
import Document from "@routes/document/Document";
// storage route
import Storage from "@routes/Storage";
import DocumentModal from "@components/Storage/DocumentModal";
// profile route
import Profile from "@routes/Profile";
// etc route
import NoMatch from "@routes/NoMatch";
import ProtectedRoute from "@routes/ProtectedRoute";

// components
import HeaderAuth from "@components/Header/HeaderAuth";
import HeaderNoAuth from "@components/Header/HeaderNoAuth";
import Footer from "@components/Footer";
import ScrollToTop from "@components/Util/ScrollToTop";

function App() {
  // 라이트모드, 다크모드
  const isDark = useAppSelector((state) => state.theme.isDark);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/document"
            element={<ProtectedRoute outlet={<Document />}></ProtectedRoute>}
          />
          <Route
            path="/"
            element={isAuthenticated ? <HeaderAuth /> : <HeaderNoAuth />}
          >
            <Route index element={<Home />}></Route>
            <Route path="/document/start" element={<DocumentStart />} />
            <Route
              path="/storage"
              element={<ProtectedRoute outlet={<Storage />}></ProtectedRoute>}
            >
              <Route path=":id" element={<DocumentModal />} />
            </Route>
            <Route
              path="/profile"
              element={<ProtectedRoute outlet={<Profile />}></ProtectedRoute>}
            ></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signin" element={<Signup />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
