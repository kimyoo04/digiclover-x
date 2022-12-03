// modules
import styled from "styled-components";
import {PathMatch, useMatch} from "react-router-dom";
// components
import {Wrapper} from "@components/layout";
import Emailed from "@components/Storage/Tables/Emailed";
import NotEmailed from "@components/Storage/Tables/NotEmailed";
import Draft from "@components/Storage/Tables/Draft";
import {NavLink} from "react-router-dom";

const StorageWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-right: 3rem;
  padding-left: 3rem;
`;

const ToggleWrapper = styled.div`
  width: 100%;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  border-top: 1px solid ${(props) => props.theme.grayscale4Color};
  border-bottom: 1px solid ${(props) => props.theme.grayscale4Color};

  & span {
    color: ${(props) => props.theme.grayscale4Color};
  }
`;

const Link = styled(NavLink)`
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  white-space: nowrap;

  display: flex;
  align-items: center;

  &.active {
    color: ${(props) => props.theme.primaryBlueColor};
    font-weight: 600;
  }

  & i {
    font-size: 2rem;
    margin-right: 0.6rem;
  }
`;
export const LinkDropDown = styled(Link)`
  &:hover {
    background-color: ${(props) => props.theme.bgBlackTransColor};
  }
`;

const Storage = () => {
  const emailedTableMatch: PathMatch<string> | null =
    useMatch("/storage/emailed");
  const notEmailedTableMatch: PathMatch<string> | null = useMatch(
    "/storage/notemailed"
  );
  const draftTableMatch: PathMatch<string> | null = useMatch("/storage/draft");

  return (
    <StorageWrapper>
      <ToggleWrapper>
        <Link to={"/storage/emailed"}>Emailed</Link>
        <span>|</span>
        <Link to={"/storage/notemailed"}>Not Emailed</Link>
        <span>|</span>
        <Link to={"/storage/draft"}>Draft</Link>
      </ToggleWrapper>

      {emailedTableMatch ? <Emailed /> : null}
      {notEmailedTableMatch ? <NotEmailed /> : null}
      {draftTableMatch ? <Draft /> : null}
    </StorageWrapper>
  );
};

export default Storage;
