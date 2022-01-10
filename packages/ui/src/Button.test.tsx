// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("ui/Button", () => {
  it("should render", () => {
    expect.hasAssertions();

    render(<Button>Hello world</Button>);
    const element = screen.getByText(/Hello world/i);
    expect(element).not.toBeNull();
  });

  it("should handle onclick events", async () => {
    expect.hasAssertions();

    const onClickSpy = jest.fn();

    render(<Button onClick={onClickSpy}>Button</Button>);

    const element = screen.getByRole("button");
    element.click();

    expect(onClickSpy).toHaveBeenCalled();
  });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    const { container } = render(<Button>Button</Button>);

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
