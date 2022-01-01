// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Error } from "./Error";

export default {
  component: Error,
  args: {
    children: "Errormessage",
  },
} as ComponentMeta<typeof Error>;

export const Default: ComponentStory<typeof Error> = (args) => (
  <Error {...args} />
);
