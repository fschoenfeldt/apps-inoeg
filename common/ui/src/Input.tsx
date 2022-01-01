// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const id = !props.id ? props.name : props.id;

    return (
      <input
        id={id}
        className={clsx("input", className)}
        {...props}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
