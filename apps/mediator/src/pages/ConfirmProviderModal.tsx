import { Provider } from "@kiebitz-oss/api";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Text,
  Title,
} from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { useMediatorApi } from "./MediatorApiContext";

interface ConfirmProviderModal extends ModalProps {
  provider: Provider;
}

export const ConfirmProviderModal: React.FC<ConfirmProviderModal> = ({
  provider,
  onClose,
}) => {
  const api = useMediatorApi();

  const doConfirmProvider = () => {
    api.confirmProvider(provider.id).then(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Title variant="h3" as="h2">
          <Trans id="mediator.providers.confirm-modal.title">
            Anbieter freischalten
          </Trans>
        </Title>
      </ModalHeader>

      <ModalContent>
        <Text>
          <Trans id="mediator.providers.confirm-modal.intro">
            Wollen Sie den Anbieter wirklich freischalten?
          </Trans>
        </Text>

        <table className="table striped">
          <thead>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.field">Feld</Trans>
              </th>
              <th>
                <Trans id="mediator.providers.confirm-modal.value">Wert</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.name">Name</Trans>
              </th>
              <td>{provider.name}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.street">
                  Straße
                </Trans>
              </th>
              <td>{provider.street}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.city">Stadt</Trans>
              </th>
              <td>{provider.city}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.zip-code">
                  Postleitzahl
                </Trans>
              </th>
              <td>{provider.zipCode}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.email">
                  E-Mail
                </Trans>
              </th>
              <td>{provider.email}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.phone">
                  Telefonnummer
                </Trans>
              </th>
              <td>{provider.phone}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.confirm-modal.description">
                  Beschreibung
                </Trans>
              </th>
              <td>{provider.description}</td>
            </tr>
          </tbody>
        </table>
      </ModalContent>

      <ModalFooter>
        <Button onClick={doConfirmProvider}>
          <Trans id="mediator.providers.confirm-modal.button-confirm">
            Anbieter bestätigen
          </Trans>
        </Button>
      </ModalFooter>
    </Modal>
  );
};
