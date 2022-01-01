// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { forwardRef } from "react";
import { Field, FieldProps } from "./Field";
import { Select, SelectProps } from "./Select";

export interface SelectFieldProps extends SelectProps, FieldProps {
  name: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, description, className, ...props }, ref) => {
    const id = !props.id ? name : props.id;

    return (
      <Field
        id={id}
        name={name}
        description={description}
        label={label}
        className={className}
      >
        <Select id={id} name={name} ref={ref} {...props} />
      </Field>
    );
  }
);

SelectField.displayName = "SelectField";
