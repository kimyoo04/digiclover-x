import {useState} from "react";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "theme";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "Components/Header";
import Footer from "Components/Footer";
import DocumentModal from "Components/Storage/DocumentModal";
import DocumentLayout from "Components/Document/Layout";

import DocumentStart from "Routes/document/Start";
import Storage from "Routes/Storage";
import Login from "Routes/Login";
import Signin from "Routes/Signin";
import Home from "Routes/Home";

import Contractor from "Routes/document/Contractor";
import Docukind from "Routes/document/Docukind";
import Writing from "Routes/document/Writing";
import Signning from "Routes/document/Signning";
import Email from "Routes/document/Email";
import NoMatch from "Routes/document/NoMatch";

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route element={<DocumentLayout />}>
            <Route path="/document/contractor" element={<Contractor />} />
            <Route path="/document/docukind" element={<Docukind />} />
            <Route path="/document/writing" element={<Writing />} />
            <Route path="/document/signning" element={<Signning />} />
            <Route path="/document/email" element={<Email />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route element={<Header />}>
            <Route path="/document/start" element={<DocumentStart />} />
            <Route path="/storage" element={<Storage />}>
              <Route path="/storage/:documentId" element={<DocumentModal />} />
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
