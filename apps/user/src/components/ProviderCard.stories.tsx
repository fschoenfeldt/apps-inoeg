import { ComponentMeta } from "@storybook/react";
import { ProviderCard } from "./ProviderCard";

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
  component: ProviderCard,
} as ComponentMeta<typeof ProviderCard>;

export const Default = () => <ProviderCard provider={provider} />;
