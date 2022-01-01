// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Title } from "./Title";

export default {
  component: Title,
  args: {
    children: "Title",
  },
} as ComponentMeta<typeof Title>;

export const Default: ComponentStory<typeof Title> = (args) => (
  <Title {...args} />
);

export const H1 = Default;
H1.args = {
  variant: "h1",
};

export const H2 = Default;
H2.args = {
  variant: "h2",
};

export const H3 = Default;
H3.args = {
  variant: "h3",
};

export const H4 = Default;
H4.args = {
  variant: "h4",
};

export const H5 = Default;
H5.args = {
  variant: "h5",
};

export const H6 = Default;
H6.args = {
  variant: "h6",
};

export const Book = Default;
Book.args = {
  variant: "book",
};
