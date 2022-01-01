// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckboxField } from "./CheckboxField";

export default {
  component: CheckboxField,
  args: {
    name: "checkbox",
  },
} as ComponentMeta<typeof CheckboxField>;

export const Default: ComponentStory<typeof CheckboxField> = (args) => (
  <CheckboxField {...args} />
);

export const Label = Default.bind({});
Label.args = {
  label: "Label",
};

export const Description = Default.bind({});
Description.args = {
  description: "Description",
};
