import React, { useState } from "react";

export default function Select({
  options,
  getOption,
  defaultSelected = options[0],
}) {
  const [selected, setSelected] = useState(defaultSelected);

  const onChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      ({ value }) => +value === +selectedValue
    );
    setSelected(selectedOption);
    getOption(selectedOption);
  };

  return (
    <select onChange={onChange} value={selected.value}>
      {options.map(({ label, value }) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
