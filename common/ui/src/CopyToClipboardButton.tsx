// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { MouseEventHandler } from "react";
import { useCopyToClipboard } from "react-use";
import { ButtonProps } from "./Button";

interface CopyToClipboardButton extends ButtonProps {
  toCopy: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButton> = ({
  children,
  toCopy,
  ...props
}) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    copyToClipboard(toCopy);
  };

  return (
    <button
      disabled={!!state.error || !!state.value}
      {...props}
      onClick={onClick}
    >
      {!!state.error
        ? "common.copy.failed"
        : state.value
        ? "common.copy.succeeded"
        : children || "common.copy.copy"}
    </button>
  );
};
