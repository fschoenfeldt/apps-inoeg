// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { forwardRef } from "react";
import { Field, FieldProps } from "./Field";
import { Input, InputProps } from "./Input";

export interface InputFieldProps extends InputProps, FieldProps {
  name: string;
  label?: string;
  description?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, label, description, className, required, ...props }, ref) => {
    const id = !props.id ? name : props.id;

    return (
      <Field
        id={id}
        name={name}
        label={label}
        description={description}
        required={required}
        className={className}
      >
        <Input id={id} required={required} name={name} {...props} ref={ref} />
      </Field>
    );
  }
);

InputField.displayName = "InputField";
