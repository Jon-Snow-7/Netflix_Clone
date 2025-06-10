import * as React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const TwoThumbSlider = ({ value, onChange }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue); // Propagate changes to parent
  };

  return (
    <Box width={200} className="content-center">
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={0.1}
        disableSwap
      />
    </Box>
  );
};

export default TwoThumbSlider;
