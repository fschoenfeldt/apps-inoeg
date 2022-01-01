// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";

export default {
  component: Button,
  args: {
    children: "Click me",
  },
  // argTypes: { onClick: { action: "click " } },
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
