import { MouseEventHandler } from "react";
import { Control, RegisterOptions, UseFormSetValue } from "react-hook-form";

export interface CustomInputProps {
  type?: "text" | "password" | "number";
  label?: string;
  placeholder?: string;
  startIcon?: string;
  endIcon?: string;
  visibilityToggle?: boolean;
  theme?: "primary" | "secondary";
  controller: CustomController;
  handleChange?: (value: string) => void;
  handleClick?: MouseEventHandler<HTMLDivElement>;
}

export interface CustomNestedController extends CustomController {
  setValue: UseFormSetValue<any>;
}
export interface CustomController {
  name: string;
  rules?: RegisterOptions;
  control: Control<any>;
  disabled?: boolean;
}
