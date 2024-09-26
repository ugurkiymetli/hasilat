import React from "react";

interface GoldTypeCheckboxProps {
  type: string;
  label: string;
  checked: boolean;
  onChange: (type: string) => void;
}

const GoldTypeCheckbox: React.FC<GoldTypeCheckboxProps> = ({
  type,
  label,
  checked,
  onChange,
}) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(type)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default GoldTypeCheckbox;
