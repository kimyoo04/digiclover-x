import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {ThemeProvider} from "styled-components";
import DocumentModal from "Components/Storage/DocumentModal";
import DocumentLayout from "Components/Document/DocumentLayout";
import ToggleIsDark from "Components/Util/ToggleIsDark";

import Home from "Routes/Home";
import Storage from "Routes/Storage";
import Profile from "Routes/Profile";
import Login from "Routes/Login";
import Signup from "Routes/Signup";
import NoMatch from "Routes/NoMatch";
import ProtectedRoute from "Routes/ProtectedRoute";

import DocumentStart from "Routes/document/Start";
import Contractor from "Routes/document/Contractor";
import Docukind from "Routes/document/Docukind";
import Writing from "Routes/document/Writing";
import Signning from "Routes/document/Signning";
import Email from "Routes/document/Email";

import HeaderLayout from "Components/Header/HeaderLayout";
import Footer from "Routes/layouts/Footer";

import {useAppSelector} from "app/hook";
import {darkTheme, lightTheme} from "theme";

function App() {
  // 라이트모드, 다크모드
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route
            path="/document"
            element={
              <ProtectedRoute outlet={<DocumentLayout />}></ProtectedRoute>
            }
          >
            <Route path="contractor" element={<Contractor />} />
            <Route path="docukind" element={<Docukind />} />
            <Route path="writing" element={<Writing />} />
            <Route path="signning" element={<Signning />} />
            <Route path="email" element={<Email />} />
          </Route>
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
        <ToggleIsDark />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
