import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MediatorApiProvider } from "../MediatorApiContext";
import { ProviderList } from "./ProvidersList";

const providers = [
  {
    id: "1",
    name: "Impfzentrum FFM",
    street: "Ludwig-Ehrhard-Anlage 1",
    zipCode: "60327",
    city: "Frankfurt am Main",
    accessible: true,
    verified: true,
    appointments: [],
    description: "",
  },
];

export default {
  component: ProviderList,
  decorators: [
    (Story) => (
      <MediatorApiProvider>
        <Story />
      </MediatorApiProvider>
    ),
  ],
  args: {
    providers: providers,
  },
} as ComponentMeta<typeof ProviderList>;

export const Default: ComponentStory<typeof ProviderList> = (args) => (
  <ProviderList {...args} />
);
