import {useAppSelector} from "app/hook";

import {Wrapper} from "Components/layout";

import Contractor from "../../Components/Document/steps/Contractor";
import Docukind from "Components/Document/steps/Docukind";
import Writing from "Components/Document/steps/Writing";
import Signning from "Components/Document/steps/Signning";
import SignaturePlacing from "Components/Document/steps/SignaturePlacing";
import Email from "Components/Document/steps/Email";

const Document = () => {
  const documentStep = useAppSelector((state) => state.document.step);
  switch (documentStep) {
    case 1:
      return (
        <Wrapper>
          <Contractor />
        </Wrapper>
      );

    case 2:
      return (
        <Wrapper>
          <Docukind />
        </Wrapper>
      );

    case 3:
      return (
        <Wrapper>
          <Writing />
        </Wrapper>
      );

    case 4:
      return (
        <Wrapper>
          <Signning />
        </Wrapper>
      );

    case 5:
      return (
        <Wrapper>
          <SignaturePlacing />
        </Wrapper>
      );

    case 6:
      return (
        <Wrapper>
          <Email />
        </Wrapper>
      );
    default:
      return <Wrapper></Wrapper>;
  }
};

export default Document;
