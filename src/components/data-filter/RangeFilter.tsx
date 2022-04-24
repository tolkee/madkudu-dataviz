import styled from "styled-components";
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { NumberRange } from "../../stores/types";

interface RangeFilterProps {
  range: NumberRange;
  value: NumberRange;
  onValueChange(newValue: NumberRange): void;
  label: string;
}

const RangeFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

function RangeFilter({ range, value, onValueChange, label }: RangeFilterProps) {
  return (
    <RangeFilterWrapper>
      <Text>{range.min}</Text>
      <RangeSlider
        // aria-label define by chackra (string[])
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={[`range-slider-filter-${label}-min`]}
        value={[value.min, value.max]}
        min={range.min}
        max={range.max}
        onChange={([min, max]) => onValueChange({ min, max })}
        marginLeft={5}
        marginRight={5}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow color="white" placement="top" label={value.min}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow color="white" placement="top" label={value.max}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>
      <Text>{range.max}</Text>
    </RangeFilterWrapper>
  );
}

export default RangeFilter;
