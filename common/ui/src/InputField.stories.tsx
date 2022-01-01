// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputField } from "./InputField";

export default {
  component: InputField,
  args: {
    name: "input-field",
  },
} as ComponentMeta<typeof InputField>;

export const Default: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
);

export const Label = Default;
Label.args = {
  label: "Label",
};

export const Description = Default;
Description.args = {
  description: "Description",
};
