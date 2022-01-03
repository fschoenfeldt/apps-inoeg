import type { Meta } from "@storybook/react";
import { MediatorApiProvider } from "./MediatorApiContext";
import { ReconfirmProvidersModal } from "./ReconfirmProvidersModal";

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
  component: ReconfirmProvidersModal,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <ReconfirmProvidersModal providers={providers} />
  </MediatorApiProvider>
);
