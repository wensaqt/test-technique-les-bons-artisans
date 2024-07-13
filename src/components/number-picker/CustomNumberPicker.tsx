import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

import { CustomNumberPickerProps } from "./CustomNumberPicker.types";

const CustomNumberPicker: React.FC<CustomNumberPickerProps> = ({
  controller,
  label,
  placeholder,
  min,
  max,
  step = 1,
  theme = "secondary",
}) => {
  return (
    <Controller
      name={controller.name}
      control={controller.control}
      rules={controller.rules}
      disabled={controller.disabled}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          {label && (
            <label
              className={`font-medium mb-2 inline-block ${
                error && "text-danger-800"
              } ${theme === "primary" && "font-primary font-bold"}`}
            >
              {label}
            </label>
          )}
          <TextField
            type="number"
            size="small"
            fullWidth
            placeholder={placeholder}
            value={value}
            disabled={controller.disabled}
            error={!!error}
            helperText={error?.message}
            onChange={(e) =>
              onChange(!!e.target.value && Number(e.target.value))
            }
            inputProps={{
              className: "hide-spin-button",
            }}
            InputProps={{
              className: "px-0 bg-main-white rounded-none",
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    className="rounded-none text-main-white bg-highlight-700 hover:bg-highlight-600"
                    onClick={() => {
                      const currentValue = Number(value) || 0;
                      if (min != null && currentValue <= min) return;
                      onChange(currentValue - step);
                    }}
                    disabled={
                      controller.disabled || (min != null && value <= min)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="rounded-none text-main-white bg-highlight-700 hover:bg-highlight-600"
                    onClick={() => {
                      const currentValue = Number(value) || 0;
                      if (max != null && currentValue >= max) return;
                      onChange(currentValue + step);
                    }}
                    disabled={
                      controller.disabled || (max != null && value >= max)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
    />
  );
};

export default CustomNumberPicker;
