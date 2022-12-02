// modules
import styled from "styled-components";
import {PathMatch, useMatch, useNavigate} from "react-router-dom";
// components
import {Wrapper} from "@components/layout";
import Emailed from "@components/Storage/Tables/Emailed";
import NotEmailed from "@components/Storage/Tables/NotEmailed";
import Ongoing from "@components/Storage/Tables/Ongoing";
import Button from "@components/Style/buttons";

const StorageWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-right: 3rem;
  padding-left: 3rem;
`;

const ToggleWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Storage = () => {
  const navigate = useNavigate();

  const emailedTableMatch: PathMatch<string> | null =
    useMatch("/storage/emailed");
  const notEmailedTableMatch: PathMatch<string> | null = useMatch(
    "/storage/notemailed"
  );
  const ongoingTableMatch: PathMatch<string> | null =
    useMatch("/storage/ongoing");

  return (
    <StorageWrapper>
      <ToggleWrapper>
        <Button onClick={() => navigate("/storage/emailed")}>
          Emailed Document
        </Button>
        <Button onClick={() => navigate("/storage/notemailed")}>
          Not Emailed Document
        </Button>
        <Button onClick={() => navigate("/storage/ongoing")}>
          Ongoing Draft
        </Button>
      </ToggleWrapper>

      {emailedTableMatch ? <Emailed /> : null}
      {notEmailedTableMatch ? <NotEmailed /> : null}
      {ongoingTableMatch ? <Ongoing /> : null}
    </StorageWrapper>
  );
};

export default Storage;
