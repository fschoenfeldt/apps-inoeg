// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { forwardRef } from "react";
import { Field, FieldProps } from "./Field";
import { Switch, SwitchProps } from "./Switch";

export interface SwitchFieldProps extends SwitchProps, FieldProps {
  name: string;
  label?: string;
}

export const SwitchField = forwardRef<HTMLInputElement, SwitchFieldProps>(
  ({ label, name, className, ...props }, ref) => {
    const id = !props.id ? name : props.id;

    return (
      <Field
        id={id}
        name={name}
        className={clsx(className, "gap-4 items-center")}
        as="label"
        inline
      >
        <Switch id={id} name={name} label={label} {...props} ref={ref} />
      </Field>
    );
  }
);

SwitchField.displayName = "SwitchField";
