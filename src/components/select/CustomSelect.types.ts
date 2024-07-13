import { MouseEventHandler } from "react";

import { CustomController } from "../input/CustomInput.types";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectCategory {
  label?: string;
  options: SelectOption[];
}

export interface CustomSelectProps {
  label?: string;
  theme?: "primary" | "secondary";
  optionsWithCategories?: SelectCategory[];
  options?: SelectOption[];
  placeholder?: string;
  controller: CustomController;
  variant?: "outlined" | "standard";
  handleChange?: (value: string) => void;
  handleClick?: MouseEventHandler<HTMLLIElement>;
}
