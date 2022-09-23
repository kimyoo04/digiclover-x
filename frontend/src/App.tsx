import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {darkTheme, lightTheme} from "theme";

import {useRecoilValue} from "recoil";
import {isAuthenticatedState} from "atom/userAtom";
import {isDarkState} from "atom/themeAtom";

import {ThemeProvider} from "styled-components";
import HeaderLayout from "Routes/layouts/HeaderLayout";
import Footer from "Routes/layouts/Footer";
import DocumentModal from "Components/Storage/DocumentModal";
import DocumentLayout from "Components/Document/Layout";
import ToggleIsDark from "Components/ToggleIsDark";

import Home from "Routes/Home";
import Storage from "Routes/Storage";
import Profile from "Routes/Profile";
import Login from "Routes/Login";
import Signin from "Routes/Signin";
import NoMatch from "Routes/NoMatch";
import ProtectedRoute from "Routes/ProtectedRoute";

import DocumentStart from "Routes/document/Start";
import Contractor from "Routes/document/Contractor";
import Docukind from "Routes/document/Docukind";
import Writing from "Routes/document/Writing";
import Signning from "Routes/document/Signning";
import Email from "Routes/document/Email";

function App() {
  const isDark = useRecoilValue(isDarkState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  let sessionStorage = window.localStorage;
  const cookie = sessionStorage.getItem("connect.sid");
  console.log(cookie);

  return (
    <ThemeProvider theme={!isDark ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route
            path="/document"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                outlet={<DocumentLayout />}
              ></ProtectedRoute>
            }
          >
            <Route index element={<DocumentStart />} />
            <Route path="contractor" element={<Contractor />} />
            <Route path="docukind" element={<Docukind />} />
            <Route path="writing" element={<Writing />} />
            <Route path="signning" element={<Signning />} />
            <Route path="email" element={<Email />} />
          </Route>
          <Route path="/" element={<HeaderLayout />}>
            <Route index element={<Home />}></Route>
            <Route
              path="/storage"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  outlet={<Storage />}
                ></ProtectedRoute>
              }
            >
              <Route path=":documentId" element={<DocumentModal />} />
            </Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  outlet={<Profile />}
                ></ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
        <ToggleIsDark />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
