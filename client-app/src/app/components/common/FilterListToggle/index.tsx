import { Radio } from "antd";
import { Options } from "../../../models/options";

interface Props {
  options: any;
  value: any;
  selectToggle: any;
}

const FilterListToggle = ({ options, value, selectToggle }: Props) => {
  return (
    <Radio.Group defaultValue="all" onChange={(e) => selectToggle(e.target.value)}>
      {options.map(({ label, id, value, checked }: Options) => (
        <Radio.Button value={value} key={id}>
          {" "}
          {label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default FilterListToggle;
