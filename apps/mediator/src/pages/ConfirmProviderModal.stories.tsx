import type { Meta } from "@storybook/react";
import { ConfirmProviderModal } from "./ConfirmProviderModal";
import { MediatorApiProvider } from "./MediatorApiContext";

export default {
  component: ConfirmProviderModal,
} as Meta;

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

export const Default = () => (
  <MediatorApiProvider>
    <ConfirmProviderModal provider={provider} />
  </MediatorApiProvider>
);
