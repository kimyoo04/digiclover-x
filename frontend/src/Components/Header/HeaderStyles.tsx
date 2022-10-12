import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  width: 100%;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgColor};

  color: white;

  z-index: 2;
`;

export const SmallNav = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.bgColor};

  color: white;

  z-index: 100;

  & div {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  & div:first-child {
    margin-right: auto;
    justify-content: flex-start;
  }

  & div:last-child {
    margin-left: auto;
    justify-content: flex-end;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
`;

export const Logo = styled.img`
  width: 16.4rem;
  height: 3.4rem;
  margin-right: 0.2rem;
`;

export const LogoShort = styled.img`
  width: 3.4rem;
  height: 3.4rem;
`;

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  & i {
    color: ${(props) => props.theme.textColor};
    font-size: 2rem;
  }
`;

export const LogOutButton = styled.span`
  display: block;
  padding: 0.4rem 1.2rem;

  border-radius: 1.6rem;
  background: linear-gradient(
    90deg,
    rgba(33, 236, 145, 1) 0%,
    rgba(46, 163, 229, 1) 100%
  );

  color: ${(props) => props.theme.textColor};
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 20px;

  cursor: pointer;
  white-space: nowrap;
`;

export const LogInButton = styled(LogOutButton)``;
