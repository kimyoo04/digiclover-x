// modules
import {useState} from "react";
import {Editor} from "@tiptap/react";
// styles
import {Option, Select, SelectWrapper} from "./FontSizeStyle";

interface IFontSizeOption {
  label: string;
  value: string;
}

const FontSizeOptions: IFontSizeOption[] = [
  {
    label: "16px",
    value: "16",
  },
  {
    label: "20px",
    value: "20",
  },
  {
    label: "24px",
    value: "24",
  },
  {
    label: "28px",
    value: "28",
  },
];

const FontSizeDropDown = ({editor}: {editor: Editor}) => {
  const [selectedOption, setSelectedOption] = useState(
    FontSizeOptions[0].value
  );
  return (
    <SelectWrapper>
      <Select
        value={selectedOption}
        onChange={(e) => {
          editor.commands.setFontSize(e.target.value);
          setSelectedOption(e.target.value);
        }}
      >
        {FontSizeOptions.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default FontSizeDropDown;
