// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Modal } from "./Modal";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

export default {
  component: Modal,
  subcomponents: { ModalHeader, ModalContent, ModalFooter },
  args: {
    children: "Modal content",
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);
