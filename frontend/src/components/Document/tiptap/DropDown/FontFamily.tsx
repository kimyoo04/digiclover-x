// modules
import {useState} from "react";
import {Editor} from "@tiptap/react";
import {Option, Select, SelectWrapper} from "./FontFamilyStyle";

interface IFontFamilyOption {
  label: string;
  value: string;
}

const FontFamilyOptions: IFontFamilyOption[] = [
  {
    label: "Noto Sans",
    value: "Noto Sans KR",
  },
  {
    label: "Noto Serif",
    value: "'Noto Serif KR', serif",
  },
  {
    label: "Roboto",
    value: "Roboto",
  },
];

const FontFamilyDropDown = ({editor}: {editor: Editor}) => {
  const [selectedOption, setSelectedOption] = useState(
    FontFamilyOptions[0].value
  );
  return (
    <SelectWrapper>
      <Select
        value={selectedOption}
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
          setSelectedOption(e.target.value);
        }}
      >
        {FontFamilyOptions.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default FontFamilyDropDown;
