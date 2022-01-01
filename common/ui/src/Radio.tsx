// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { forwardRef } from "react";

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    const id = !props.id ? props.name : props.id;

    return (
      <input
        id={id}
        className={clsx("radio", className)}
        type="radio"
        {...props}
        ref={ref}
      />
    );
  }
);

Radio.displayName = "Radio";
