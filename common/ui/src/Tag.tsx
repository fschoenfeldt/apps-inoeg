// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";

export interface TagProps extends React.ComponentProps<"p"> {
  variant?: "success" | "warning" | "error";
  size?: "sm";
}

export const Tag: React.FC<TagProps> = ({
  children,
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <span className={clsx("tag", size, variant, className)} {...props}>
      {children}
    </span>
  );
};
