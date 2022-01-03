import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MediatorApiProvider } from "../MediatorApiContext";
import { ProviderRow } from "./ProviderRow";

const provider = {
  id: "1",
  name: "Impfzentrum FFM",
  street: "Ludwig-Ehrhard-Anlage 1",
  zipCode: "60327",
  city: "Frankfurt am Main",
  accessible: true,
  verified: true,
  appointments: [],
  description: "",
};

export default {
  component: ProviderRow,
  decorators: [
    (Story) => (
      <MediatorApiProvider>
        <Story />
      </MediatorApiProvider>
    ),
  ],
  args: {
    provider,
  },
} as ComponentMeta<typeof ProviderRow>;

export const Default: ComponentStory<typeof ProviderRow> = (args) => (
  <ProviderRow {...args} />
);
