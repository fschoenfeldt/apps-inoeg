// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Dialog } from "@headlessui/react";
import clsx from "clsx";

interface ModalHeaderProps {
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Dialog.Title as="header" className={clsx("header", className)} {...props}>
      {children}
    </Dialog.Title>
  );
};
