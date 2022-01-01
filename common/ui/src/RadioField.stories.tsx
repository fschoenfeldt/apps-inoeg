// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RadioField } from "./RadioField";

export default {
  component: RadioField,
  args: {
    name: "checkbox",
  },
} as ComponentMeta<typeof RadioField>;

export const Default: ComponentStory<typeof RadioField> = (args) => (
  <RadioField {...args} />
);

export const Label = Default.bind({});
Label.args = {
  label: "Label",
};

export const Description = Default.bind({});
Description.args = {
  description: "Description",
};
