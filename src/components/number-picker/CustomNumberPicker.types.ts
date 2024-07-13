import { CustomController } from "../input/CustomInput.types";

export interface CustomNumberPicker {
  label?: string;
  placeholder?: string;
  theme?: "primary" | "secondary";
  min?: number;
  max?: number;
  step?: number;
  controller: CustomController;
}
