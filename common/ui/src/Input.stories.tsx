// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory, StoryObj } from "@storybook/react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

export default {
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);

export const InputFieldFilled: StoryObj = {
  render: () => {
    return <Input />;
  },
  play: async () => {
    await userEvent.type(screen.getByRole("textbox"), "Hello world!");
  },
};
