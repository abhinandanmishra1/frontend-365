import React, { CSSProperties, useState } from "react";

import styled from "styled-components";

const Checkbox = styled.input<{
  color?: string;
}>`
  // using em to make the checkbox responsive
  &:checked {
    background-color: currentColor;
  }

  &[type="checkbox"] {
    // Remove default checkbox appearance
    appearance: none;
    background-color: #fff;
    margin: 0;

    // defining custom checkbox container
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    border-color: ButtonText;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }

  &[type="checkbox"]::before {
    // Create the checkmark using before pseudo element
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0); // scale to 0 to hide the checkmark
    transition: 120ms transform ease-in-out; // transition to scale the checkmark when checked

    /* Checkmark is created using inset box shadow, check the resources to understand box-shadow better */
    box-shadow: inset 1em 1em ${({ color }) => color}; // inset box shadow to create the checkmark
    background-color: CanvasText; // for enabling the checkmark to work in forced colors mode (read about it)
    transform-origin: bottom left; // transform origin of the checkmark
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  &[type="checkbox"]:checked {
    border-color: ${({ color }) => color};
  }

  &[type="checkbox"]:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }

  &[type="checkbox"]:disabled {
    color: ButtonText;
    border-color: ButtonBorder; // for forced colors mode
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomCheckbox = ({
  label,
  disabled = false,
  color = "blue",
  checked = false,
  id,
}: {
  label: string;
  disabled?: boolean;
  color?: CSSProperties["color"];
  id: string;
  checked?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsChecked(!isChecked);
    }
  };

  return (
    <div className="grid grid-cols-[1em_auto] items-center gap-2">
      <Checkbox
        id={id}
        type="checkbox"
        onKeyDown={handleKeyDown}
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
        disabled={disabled}
        color={color}
      />
      <label
        style={{
          color: disabled ? "gray" : isChecked ? color : "black",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default function Project2() {
  return (
    <div className="flex flex-col h-full gap-8">
      <h1 className="text-4xl font-bold">Custom Checkbox</h1>
      <CustomCheckbox label="Default" id="default" />
      <CustomCheckbox label="Default Checked" id="default-checked" checked={true} />
      <CustomCheckbox label="Custom Color" color="green" id="custom-color" />
      <CustomCheckbox label="Custom Color Checked" color="green" id="custom-color-checked" checked={true} />
      <CustomCheckbox label="Disabled" disabled={true} id="disabled" />
    </div>
  );
}
