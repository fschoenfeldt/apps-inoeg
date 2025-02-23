import { providers } from "@kiebitz-oss/api";
import type { Meta } from "@storybook/react";
import { ConfirmProviderModal } from "./ConfirmProviderModal";
import { MediatorApiProvider } from "./MediatorApiContext";

export default {
  component: ConfirmProviderModal,
} as Meta;

export const Default = () => (
  <MediatorApiProvider>
    <ConfirmProviderModal provider={providers[0]} />
  </MediatorApiProvider>
);
