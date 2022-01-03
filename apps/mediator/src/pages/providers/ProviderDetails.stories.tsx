import type { Meta } from "@storybook/react";
import { MediatorApiProvider } from "../MediatorApiContext";
import { ProviderDetails } from "./ProviderDetails";
import ProviderShowPage from "./[id].page";

export default {
  component: ProviderDetails,
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
    <ProviderShowPage />
  </MediatorApiProvider>
);
