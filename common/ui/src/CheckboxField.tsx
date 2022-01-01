// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { forwardRef } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { Field, FieldProps } from "./Field";
import { Label } from "./Label";

export interface CheckboxFieldProps extends CheckboxProps, FieldProps {
  name: string;
  label?: string;
  description?: string;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ name, label, description, className, required, ...props }, ref) => {
    const id = !props.id ? name : props.id;

    return (
      <Field
        id={id}
        name={name}
        description={description}
        required={required}
        className={clsx(className)}
        inline
      >
        <Checkbox
          id={id}
          required={required}
          name={name}
          {...props}
          ref={ref}
        />

        <Label htmlFor={id}>{label}</Label>
      </Field>
    );
  }
);

CheckboxField.displayName = "CheckboxField";
