import { Provider } from "@kiebitz-oss/api";
import { Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";

export interface ProviderDetailsProps {
  provider: Provider;
}

export const ProviderDetails: React.FC<ProviderDetailsProps> = ({
  provider,
}) => {
  return (
    <>
      <Title>
        <Trans id="mediator.provider-show.title">
          Impfanbieter "{provider.name}"
        </Trans>
      </Title>

      <table className="table mb-8 striped">
        <thead>
          <tr>
            <th>
              <Trans id="mediator.provider-show.field">Feld</Trans>
            </th>
            <th>
              <Trans id="mediator.provider-show.value">Wert</Trans>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <Trans id="mediator.provider-show.verified">Bestätigt?</Trans>
            </th>
            <td>
              {provider.verified ? (
                <span className="font-semibold text-green-700">ja</span>
              ) : (
                <span className="font-semibold text-red-700">nein</span>
              )}
            </td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.name">Name</Trans>
            </th>
            <td>{provider.name}</td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.street">Straße</Trans>
            </th>
            <td>{provider.street}</td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.city">Stadt</Trans>
            </th>
            <td>{provider.city || " -- "}</td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.zip-code">Postleitzahl</Trans>
            </th>
            <td>{provider.zipCode}</td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.email">E-Mail</Trans>
            </th>
            <td>{provider.email || " -- "}</td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.phone">Telefonnummer</Trans>
            </th>
            <td>{provider.phone || " -- "}</td>
          </tr>
          <tr>
            <th>
              <Trans id="mediator.provider-show.description">
                Beschreibung
              </Trans>
            </th>
            <td>{provider.description || " -- "}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
