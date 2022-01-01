// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./Title.stories";

const { Default } = composeStories(stories);

describe("ui/Title", () => {
  it("should render", async () => {
    expect.hasAssertions();

    render(<Default />);

    const element = screen.getAllByText("Title");
    expect(element).not.toBeNull();
  });
});
