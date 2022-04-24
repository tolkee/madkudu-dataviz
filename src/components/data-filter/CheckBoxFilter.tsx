import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

interface CheckBoxFilterProps {
  checkBoxs: string[];
  onStateChange(newState: string[]): void;
  state?: string[];
}

function CheckBoxFilter({
  checkBoxs,
  onStateChange,
  state,
}: CheckBoxFilterProps) {
  return (
    <CheckboxGroup value={state} onChange={onStateChange}>
      {checkBoxs.map((cb) => (
        <Checkbox key={cb} marginRight={5} value={cb}>
          {cb}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}

CheckBoxFilter.defaultProps = {
  state: [],
};

export default CheckBoxFilter;
