import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {ThemeProvider} from "styled-components";
import DocumentModal from "Components/Storage/DocumentModal";

import Home from "Routes/Home";
import Storage from "Routes/Storage";
import Profile from "Routes/Profile";
import Login from "Routes/Login";
import Signup from "Routes/Signup";
import NoMatch from "Routes/NoMatch";
import ProtectedRoute from "Routes/ProtectedRoute";

import DocumentStart from "Routes/document/Start";

import HeaderLayout from "Components/Header/HeaderLayout";
import Footer from "Components/Footer";

import {useAppSelector} from "app/hook";
import {darkTheme, lightTheme} from "theme";
import Document from "Routes/document/Document";

function App() {
  // 라이트모드, 다크모드
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route
            path="/document"
            element={<ProtectedRoute outlet={<Document />}></ProtectedRoute>}
          />
          <Route path="/" element={<HeaderLayout />}>
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
