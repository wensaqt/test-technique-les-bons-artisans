import { FormHelperText, ListSubheader, MenuItem, Select } from "@mui/material";
import React, { FC, useMemo } from "react";
import { Controller } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  CustomSelectProps,
  SelectCategory,
  SelectOption,
} from "./CustomSelect.types";

const B4MSelect: FC<CustomSelectProps> = ({
  controller,
  label,
  theme = "secondary",
  placeholder,
  options,
  optionsWithCategories,
  variant = "outlined",
  handleChange,
  handleClick,
}) => {
  const flatOptions = useMemo(
    () =>
      options ??
      optionsWithCategories?.flatMap((category) => category.options) ??
      [],
    [options, optionsWithCategories]
  );

  const renderOptions = (options: SelectOption[]) =>
    options.map((option) => (
      <MenuItem
        key={option.value}
        value={option.value}
        onClick={(e) => handleClick && handleClick(e)}
      >
        {option.label}
      </MenuItem>
    ));

  const renderOptionsWithCategories = (categories: SelectCategory[]) =>
    categories.flatMap((category) => [
      <ListSubheader key={category.label}>{category.label}</ListSubheader>,
      ...renderOptions(category.options),
    ]);

  return (
    <Controller
      name={controller.name}
      control={controller.control}
      rules={controller.rules}
      disabled={controller.disabled}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full flex flex-col">
          {label && (
            <label
              className={`font-medium mb-2 inline-block ${
                error && "text-danger-800"
              } ${theme === "primary" && "font-primary font-bold"}`}
            >
              {label}
            </label>
          )}
          <Select
            className={`bg-main-white rounded-none`}
            value={value || ""}
            size="small"
            disabled={controller.disabled}
            displayEmpty
            error={!!error}
            IconComponent={({ className }) => (
              <div className={className}>
                <ExpandMoreIcon />
              </div>
            )}
            onChange={(e) => {
              onChange(e.target.value);
              handleChange && handleChange(e.target.value);
            }}
            variant={variant}
            renderValue={(selected) => {
              if (!selected?.length)
                return <span className="text-neutral-600">{placeholder}</span>;
              const label = flatOptions.find(
                (o) => o.value === selected
              )?.label;
              return label || selected;
            }}
          >
            {placeholder && (
              <MenuItem disabled value="">
                <span>{placeholder}</span>
              </MenuItem>
            )}
            {options && renderOptions(options)}
            {optionsWithCategories &&
              renderOptionsWithCategories(optionsWithCategories)}
          </Select>
          {error && (
            <FormHelperText className="text-danger-800">
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default B4MSelect;
