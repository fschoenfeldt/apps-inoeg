// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import * as stories from "./Button.stories";

const { Default } = composeStories(stories);

describe("ui/Button", () => {
  it("should render", () => {
    expect.hasAssertions();

    render(<Default>Hello world</Default>);
    const element = screen.getByText(/Hello world/i);
    expect(element).not.toBeNull();
  });

  it("should handle onclick events", async () => {
    expect.hasAssertions();

    const onClickSpy = jest.fn();

    render(<Default onClick={onClickSpy} />);

    const element = screen.getByRole("button");
    element.click();

    expect(onClickSpy).toHaveBeenCalled();
  });

  it("should not have a11y violations", async () => {
    expect.hasAssertions();

    const { container } = render(<Default />);

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
