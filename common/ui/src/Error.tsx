// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";

export type ErrorProps = React.ComponentProps<"div">;

export const Error: React.FC<ErrorProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx("field-error", className)} {...props}>
      {children}
    </div>
  );
};
