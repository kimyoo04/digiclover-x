import {Link, useMatch} from "react-router-dom";
import styled from "styled-components";
import {motion} from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 100;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.textColor};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  & Link {
    font-style: none;
  }
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.textColor};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.textColor};
`;

const Header = () => {
  const homeMatch = useMatch("/");
  const documentMatch = useMatch("/document");
  const signatureMatch = useMatch("/signature");
  const storageMatch = useMatch("/storage");
  const loginMatch = useMatch("/login");
  const signinMatch = useMatch("/signin");

  return (
    <Nav>
      <Col>
        <Logo></Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/document">
              Document {documentMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/signature">
              Signature {signatureMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/storage">
              Storage {storageMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/login">
              Login {loginMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/signin">
              Signin {signinMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col></Col>
    </Nav>
  );
};

export default Header;
