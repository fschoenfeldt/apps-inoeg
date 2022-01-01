// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";

type DividerProps = React.ComponentProps<"hr">;

export const Divider: React.FC<DividerProps> = ({ className }) => (
  <hr className={clsx("border-t border-gray-200", className)} />
);
