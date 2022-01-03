import type { Provider } from "@kiebitz-oss/api";
import { Button } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { BackLink } from "../../components/BackLink";
import { ConfirmProviderModal } from "../ConfirmProviderModal";
import { useMediatorApi } from "../MediatorApiContext";
import { UnconfirmProviderModal } from "../UnconfirmProviderModal";
import { ProviderDetails } from "./ProviderDetails";

const ProviderShowPage: NextPage = () => {
  const [provider, setProvider] = useState<Provider>();
  const [modal, setModal] = useState<"confirm" | "unconfirm" | null>(null);
  const router = useRouter();
  const api = useMediatorApi();

  const id = router.query?.id as string;

  useEffect(() => {
    if (id) {
      api.getProvider(id).then((provider) => {
        if (provider) {
          setProvider(provider);
        }
      });
    }
  }, [api, id]);

  const doUnconfirmProvider: MouseEventHandler<HTMLButtonElement> = () => {
    if (provider) {
      api.unconfirmProvider(provider.id).then((provider) => {
        if (provider) {
          setProvider(provider);
        }
      });
    }
  };

  const doConfirmProvider: MouseEventHandler<HTMLButtonElement> = () => {
    if (provider) {
      api.confirmProvider(provider.id).then((provider) => {
        if (provider) {
          setProvider(provider);
        }
      });
    }
  };

  if (!provider) {
    return <main>Provider nicht gefunden</main>;
  }

  return (
    <main>
      <BackLink href="/providers">Zurück zur Übersicht</BackLink>

      <ProviderDetails provider={provider} />

      <div className="buttons-list">
        {!provider.verified ? (
          <Button variant="primary" size="sm" onClick={doConfirmProvider}>
            <Trans id="mediator.provider-show.button-confirm">
              Anbieter bestätigen
            </Trans>
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={doUnconfirmProvider}>
            <Trans id="mediator.provider-show.button-unconfirm">
              Anbieter sperren
            </Trans>
          </Button>
        )}
      </div>

      {modal === "confirm" && (
        <ConfirmProviderModal
          provider={provider}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "unconfirm" && (
        <UnconfirmProviderModal
          provider={provider}
          onClose={() => setModal(null)}
        />
      )}
    </main>
  );
};

export default ProviderShowPage;
