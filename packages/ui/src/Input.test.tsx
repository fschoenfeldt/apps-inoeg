// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { render, screen } from "@testing-library/react";
import { Input as Default } from "./Input";

describe("uI/Input", () => {
  it("should render", () => {
    expect.hasAssertions();

    render(<Default />);
    const Element = screen.getByRole(/textbox/i);
    expect(Element).not.toBeNull();
  });

  // it("should render play function", async () => {
  //   expect.hasAssertions();

  //   const InputFieldFilled = composeStory(
  //     stories.InputFieldFilled,
  //     stories.default
  //   );

  //   const { container } = render(<InputFieldFilled />);

  //   await InputFieldFilled.play({ canvasElement: container });

  //   const input = screen.getByRole("textbox") as HTMLInputElement;

  //   expect(input.value).toBe("Hello world!");
  // });
});
