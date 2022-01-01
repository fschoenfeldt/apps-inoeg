// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Default: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);
