// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { render, screen } from "@testing-library/react";
import { Checkbox as Default } from "./Checkbox";

describe("ui/Checkbox", () => {
  it("should render", async () => {
    expect.hasAssertions();

    render(<Default />);

    const element = screen.getByRole("checkbox");
    expect(element).not.toBeNull();
  });
});
