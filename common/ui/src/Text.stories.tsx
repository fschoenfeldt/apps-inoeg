// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "./Text";

export default {
  component: Text,
  args: {
    children: "Text",
  },
} as ComponentMeta<typeof Text>;

export const Default: ComponentStory<typeof Text> = (args) => (
  <Text {...args} />
);
