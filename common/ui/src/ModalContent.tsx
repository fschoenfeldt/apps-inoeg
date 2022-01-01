// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Dialog } from "@headlessui/react";
import clsx from "clsx";

interface ModalContentProps {
  className?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Dialog.Description
      as="div"
      className={clsx("content", className)}
      {...props}
    >
      {children}
    </Dialog.Description>
  );
};
