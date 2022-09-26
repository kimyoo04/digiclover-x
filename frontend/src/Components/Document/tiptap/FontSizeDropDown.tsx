import {useState} from "react";
import {Editor} from "@tiptap/react";
import styled from "styled-components";
import arrowIcon from "public/assets/img/arrow-down-s-line.svg";

interface IFontSizeOption {
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
  font-size: 20px;

  border: none;
  appearance: none;
  -webkit-appearance: none;

  padding: 0 28px 0 6px;
  margin-left: 4px;

  cursor: pointer;

  background-image: url(${arrowIcon});
  background-repeat: no-repeat;
  background-position: calc(90%) center;
  background-size: 24px;
`;

const TextIcon = styled.i`
  font-size: 20px;
`;

const Option = styled.option``;

const FontSizeDropDown = ({
  options,
  editor,
}: {
  options: IFontSizeOption[];
  editor: Editor;
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <SelectWrapper>
      <label>
        <TextIcon className="ri-font-size-2"></TextIcon>
      </label>
      <Select
        value={selectedOption}
        onChange={(e) => {
          editor.commands.setFontSize(e.target.value);
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

export default FontSizeDropDown;
