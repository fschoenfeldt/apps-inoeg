// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";

type SectionProps = React.HTMLAttributes<HTMLElement>;

export const Section: React.FC<SectionProps> = ({
  children,
  className,

  ...props
}) => {
  return (
    <section className={clsx("section", className)} {...props}>
      {children}
    </section>
  );
};
