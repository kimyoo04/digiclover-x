import {useState} from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Document from "./Routes/Document";
import Storage from "./Routes/Storage";
import Signature from "./Routes/Signature";
import Login from "./Routes/Login";
import Signin from "./Routes/Signin";
import Footer from "./Components/Footer";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "./theme";

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/document" element={<Document />}></Route>
          <Route path="/signature" element={<Signature />}></Route>
          <Route path="/storage" element={<Storage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
