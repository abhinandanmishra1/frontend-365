import React, { useState } from "react";

import styled from "styled-components";

const CheckboxInput = styled.input.attrs<{}>({
  type: "checkbox",
})``;

const ToggleSwitchInput = styled(CheckboxInput)<{
  $backgroundColor?: string;
  $textColor?: string;
  $color?: string;
  $borderColor?: string;
}>`
  appearance: none;
  background-color: ${({ $backgroundColor }) => $backgroundColor || "#cdcdcd"};
  margin: 0;

  width: 3.15em;
  height: 1.15em;
  color: ${({ $color }) => $color};
  border: 0.15em solid ${({ $borderColor, $color }) => $borderColor || $color};
  border-radius: 20em;
  display: grid;
  place-content: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: -0.075em;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    transition: transform 0.2s;
  }

  &:checked::before {
    transform: translateX(1.91em);
  }

  &:checked {
    background-color: ${({ $backgroundColor }) => $backgroundColor};
  }

  &:focus {
    outline: max(2px, 0.1em) solid currentColor;
    outline-offset: max(2px, 0.1em);
  }

  &:after {
    content: attr(aria-label);
    position: absolute;
    top: 50%;
    left: 2.5em;
    right: 0;
    transform: translateY(-50%);
    font-size: 0.5em;
    color: ${({ $textColor, $color }) => $textColor || $color};
  }

  &:checked:after {
    left: 0.5em;
  }

  &:disabled {
    color: ButtonText;
    border-color: ButtonBorder; // for forced colors mode
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ToggleSwitch = ({
  color = "#000",
  textColor = "#fefefe",
  checkedBackgroundColor,
  uncheckedBackgroundColor,
  checkedText = "",
  uncheckedText = "",
  checked,
  onChange,
  disabled = false,
  borderColor,
}: ToggleSwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(checked ?? false);
  const isChecked = checked !== undefined ? checked : internalChecked;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (checked === undefined) {
        setInternalChecked(!internalChecked);
      } else {
        onChange?.(!checked);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
      setInternalChecked(e.target.checked);
    } else {
      onChange?.(e.target.checked);
    }
  };

  return (
    <ToggleSwitchInput
      $color={color}
      $backgroundColor={
        isChecked ? checkedBackgroundColor : uncheckedBackgroundColor
      }
      checked={isChecked}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      aria-label={isChecked ? checkedText : uncheckedText}
      $textColor={textColor}
      disabled={disabled}
      $borderColor={borderColor}
    />
  );
};

export default function Project3() {
  const [checked, setChecked] = useState(false);
  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <div className="p-4 text-2xl flex gap-4">
      <ToggleSwitch />
      <ToggleSwitch
        color="#fefefe"
        borderColor="blue"
        checkedText="Yes"
        uncheckedText="No"
        checkedBackgroundColor="green"
        uncheckedBackgroundColor="red"
      />
      <ToggleSwitch
        color="#afd"
        checkedText="Yes"
        uncheckedText="No"
        checkedBackgroundColor="green"
      />
      <ToggleSwitch disabled={true} />
      <ToggleSwitch checked={checked} onChange={onChange} />
      <ToggleSwitch color="green" />
    </div>
  );
}

interface ToggleSwitchProps {
  color?: string;
  textColor?: string;
  checkedBackgroundColor?: string;
  uncheckedBackgroundColor?: string;
  checkedText?: string;
  uncheckedText?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  borderColor?: string;
}
