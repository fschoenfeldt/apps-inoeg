// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Radio } from "./Radio";

export default {
  component: Radio,
} as ComponentMeta<typeof Radio>;

export const Default: ComponentStory<typeof Radio> = (args) => (
  <Radio {...args} />
);
