// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";

type ModalFooterProps = React.ComponentProps<"div">;

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <footer className={clsx("footer", className)} {...props}>
      {children}
    </footer>
  );
};
