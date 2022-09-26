import {useState} from "react";
import {Editor} from "@tiptap/react";
import styled from "styled-components";
import arrowIcon from "public/assets/img/arrow-down-s-line.svg";

interface IFontFamilyOption {
  label: string;
  value: string;
}

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  background-color: ${(props) => props.theme.secondaryLightBlueColor};
  border-radius: 6px;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  font-family: "Roboto", sans-serif;

  border: none;
  appearance: none;
  -webkit-appearance: none;
  outline: none;

  padding: 0 28px 0 6px;
  margin-left: 4px;

  cursor: pointer;

  background-image: url(${arrowIcon});
  background-repeat: no-repeat;
  background-position: calc(95%) center;
  background-size: 24px;
`;

const Option = styled.option``;

const FontFamilyDropDown = ({
  options,
  editor,
}: {
  options: IFontFamilyOption[];
  editor: Editor;
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <SelectWrapper>
      <Select
        value={selectedOption}
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
          setSelectedOption(e.target.value);
        }}
      >
        {options.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default FontFamilyDropDown;
