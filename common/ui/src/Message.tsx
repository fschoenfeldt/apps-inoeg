// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import { MessageVariant } from "./types";

type MessageProps = {
  className?: string;
  waiting?: boolean;
  variant?: MessageVariant;
};

export const Message: React.FC<MessageProps> = ({
  children,
  className,
  variant,
}) => <div className={clsx("message", variant, className)}>{children}</div>;
