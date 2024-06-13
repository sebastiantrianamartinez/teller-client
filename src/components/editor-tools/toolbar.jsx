/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from 'prop-types';

const CustomFontToolbar = ({ onChange }) => {
  const [selectedFont, setSelectedFont] = useState("Arial");

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setSelectedFont(newFont);
    onChange(newFont);
  };

  return (
    <select value={selectedFont} onChange={handleFontChange}>
      <option value="Arial">Arial</option>
      <option value="Times New Roman">Times New Roman</option>
      <option value="Helvetica">Helvetica</option>
      <option value="Courier New">Courier New</option>
    </select>
  );
};

CustomFontToolbar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CustomFontToolbar;
