// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tag } from "./Tag";

export default {
  component: Tag,
  args: {
    children: "Tag",
  },
} as ComponentMeta<typeof Tag>;

export const Default: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;
