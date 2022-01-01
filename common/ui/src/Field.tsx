// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { Error } from "./Error";
import { Label } from "./Label";

export interface FieldProps {
  name: string;
  className?: string;
  id?: string;
  label?: string;
  description?: string;
  inline?: boolean;
  required?: boolean;
  as?: "div" | "label" | "span" | "p";
}

export const Field: React.FC<FieldProps> = ({
  children,
  name,
  className,
  label,
  description,
  id,
  inline,
  required,
  as,
  ...props
}) => {
  const Element = as || "div";
  const formContext = useFormContext();
  const error = formContext
    ? formContext.formState?.errors?.[name]?.message
    : false;

  return (
    <Element
      className={clsx("field", { ["field-inline"]: inline }, className)}
      {...props}
    >
      {label && (
        <Label id={id} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
      {!error && description && <div className="hint">{description}</div>}
    </Element>
  );
};
