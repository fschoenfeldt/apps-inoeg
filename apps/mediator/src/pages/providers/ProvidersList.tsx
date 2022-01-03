import { CheckmarkOutline16, ErrorOutline16 } from "@carbon/icons-react";
import type { Provider } from "@kiebitz-oss/api";
import { Button } from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import { ChangeEventHandler, useState } from "react";
import { ReconfirmProvidersModal } from "../ReconfirmProvidersModal";
import { ProviderRow } from "./ProviderRow";

export interface ProviderListProps {
  providers: Record<string, Provider>;
}

export const ProviderList: React.FC<ProviderListProps> = ({ providers }) => {
  const [modal, setModal] = useState<"confirm" | "unconfirm" | null>(null);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const onSelectAll: ChangeEventHandler<HTMLInputElement> = (event) => {
    const checked = event.currentTarget.checked;

    setSelectedProviders(
      checked ? Object.keys(providers).map((providerId) => providerId) : []
    );
  };

  const onSelect = (providerId: string, isSelected: boolean) => {
    setSelectedProviders(
      isSelected
        ? !selectedProviders.includes(providerId)
          ? [...selectedProviders, providerId]
          : selectedProviders
        : selectedProviders.filter(
            (selectedProviderId) => selectedProviderId !== providerId
          )
    );
  };

  return (
    <>
      <table className="table w-full striped selectable">
        <caption className="sr-only">
          <Trans id="mediator.providers-list.caption">
            Tabelle der Impfanbieter
          </Trans>
        </caption>

        <thead>
          <tr>
            <th scope="col" className="inline-flex items-center w-6">
              <input
                type="checkbox"
                className="checkbox"
                name="providers[]"
                onChange={onSelectAll}
                checked={
                  selectedProviders.length === Object.keys(providers).length
                }
                aria-label={t({
                  id: "mediator.providers-list.select-all",
                  message: "Alle Impfanbieter auswählen oder abwählen",
                })}
              />
              &nbsp;
            </th>
            <th scope="col">
              <Trans id="mediator.providers-list.name">Name</Trans>
            </th>
            <th scope="col">
              <Trans id="mediator.providers-list.address">Adresse</Trans>
            </th>
            <th scope="col">
              <Trans id="mediator.providers-list.status">Status</Trans>
            </th>
            <th scope="col">
              <span className="sr-only">Aktionen</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(providers).map((providerId) => {
            return (
              <ProviderRow
                key={providerId}
                provider={providers[providerId]}
                selected={selectedProviders.includes(providerId)}
                onSelect={onSelect}
              />
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <th colSpan={5}>
              <div className="flex gap-2 justify-end mt-4 ml-auto">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex gap-1 items-center"
                  disabled={selectedProviders.length === 0}
                  onClick={() => setModal("confirm")}
                >
                  <CheckmarkOutline16 />
                  <span>{selectedProviders.length}</span>
                  <Trans id="mediator.providers-list.button-confirm">
                    Anbieter bestätigen
                  </Trans>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex gap-1 items-center"
                  disabled={selectedProviders.length === 0}
                  onClick={() => setModal("unconfirm")}
                >
                  <ErrorOutline16 />
                  <span>{selectedProviders.length}</span>
                  <Trans id="mediator.providers-list.button-unconfirm">
                    Anbieter sperren
                  </Trans>
                </Button>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>

      {modal && (
        <ReconfirmProvidersModal
          providers={providers.filter((provider) =>
            selectedProviders.includes(provider.id)
          )}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
};
