// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { forwardRef } from "react";
import { Field, FieldProps } from "./Field";
import { Label } from "./Label";
import { Radio, RadioProps } from "./Radio";

export interface RadioFieldProps extends RadioProps, FieldProps {
  name: string;
  label?: string;
  description?: string;
}

export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
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
        <Radio id={id} required={required} name={name} {...props} ref={ref} />

        <Label htmlFor={id} className="select-none">
          {label}
        </Label>
      </Field>
    );
  }
);

RadioField.displayName = "RadioField";
