// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { forwardRef } from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const id = !props.id ? props.name : props.id;

    return (
      <textarea
        id={id}
        className={clsx("textarea", className)}
        {...props}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = "Textarea";
