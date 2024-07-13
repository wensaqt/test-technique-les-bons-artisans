"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { CustomInputProps } from "./CustomInput.types";

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name={props.controller.name}
      control={props.controller.control}
      rules={props.controller.rules}
      disabled={props.controller.disabled}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          {props.label && (
            <label
              className={`font-medium mb-2 inline-block ${
                error && "text-danger-800"
              } ${props.theme === "primary" && "font-primary font-bold"}`}
            >
              {props.label}
            </label>
          )}
          <TextField
            size="small"
            fullWidth
            type={
              props.visibilityToggle
                ? showPassword
                  ? "text"
                  : "password"
                : props.type
            }
            error={!!error}
            value={value || ""}
            helperText={error?.message}
            onChange={(e) => {
              onChange(e.target.value);
              props.handleChange && props.handleChange(e.target.value);
            }}
            onClick={(e) => props.handleClick && props.handleClick(e)}
            disabled={props.controller.disabled}
            placeholder={props.placeholder}
            InputProps={{
              className: "bg-main-white rounded-none",
              ...(props.startIcon && {
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <Icon name={props.startIcon} /> */}
                  </InputAdornment>
                ),
              }),
              ...(props.endIcon && {
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <Icon name={props.endIcon} /> */}
                  </InputAdornment>
                ),
              }),
              ...(props.visibilityToggle && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }),
            }}
          />
        </div>
      )}
    />
  );
};

export default CustomInput;
