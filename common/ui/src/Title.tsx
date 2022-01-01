// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "book" | "section";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Title: React.FC<TitleProps> = ({
  children,
  className,
  variant = "h1",
  as,
  ...props
}) => {
  let Element = as || "h1";

  if (!as) {
    switch (variant) {
      case "h6":
        Element = "h6";
        break;

      case "h5":
        Element = "h5";
        break;

      case "h4":
        Element = "h4";
        break;

      case "h3":
        Element = "h3";
        break;

      case "h2":
        Element = "h2";
        break;

      default:
      case "h1":
        Element = "h1";
        break;
    }
  }

  return (
    <Element className={clsx(variant, className)} {...props}>
      {children}
    </Element>
  );
};
