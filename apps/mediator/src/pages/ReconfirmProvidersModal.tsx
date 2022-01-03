import type { Provider } from "@kiebitz-oss/api";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Title,
} from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { useState } from "react";
import { useMediatorApi } from "./MediatorApiContext";

interface ReconfirmProvidersModalProps extends ModalProps {
  providers: Provider[];
}

export const ReconfirmProvidersModal: React.FC<
  ReconfirmProvidersModalProps
> = ({ providers, onClose }) => {
  const [status, setStatus] = useState<
    "idle" | "running" | "success" | "error"
  >("idle");
  const api = useMediatorApi();

  const doReconfirmProviders = async () => {
    setStatus("running");

    return Promise.all(
      providers.map((provider) => api.reconfirmProvider(provider.id))
    )
      .then(() => {
        setStatus("success");
      })
      .then(() => {
        if (onClose) {
          onClose();
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Title variant="h3" as="h2">
          <Trans id="mediator.providers.reconfirm-modal.title">
            Alle neu bestätigen
          </Trans>
        </Title>
      </ModalHeader>

      <ModalContent>
        {(status === "running" && (
          <Trans id="mediator.providers.reconfirm-modal.in-progress">
            Bestätige Anbieter...
          </Trans>
        )) || (
          <Trans id="mediator.providers.reconfirm-modal.info">
            Wollen Sie alle bestätigten Anbieter neu bestätigen?
          </Trans>
        )}
      </ModalContent>

      <ModalFooter>
        <Button onClick={doReconfirmProviders}>
          <Trans id="mediator.providers.reconfirm-modal.button-submit">
            {providers.length} Anbieter neu bestätigen
          </Trans>
        </Button>
      </ModalFooter>
    </Modal>
  );
};
