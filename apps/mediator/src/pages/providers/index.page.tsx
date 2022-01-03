import type { Provider } from "@kiebitz-oss/api";
import { Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMediatorApi } from "../MediatorApiContext";
import { ProviderList } from "./ProvidersList";

const ProvidersPage: NextPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const api = useMediatorApi();

  useEffect(() => {
    api.getProviders().then((providers) => {
      setProviders(providers);
    });
  }, [api]);

  return (
    <main>
      <Title>
        <Trans id="mediator.providers.title">Impfanbieter</Trans>
      </Title>

      {typeof providers === "object" ? (
        <ProviderList providers={providers} />
      ) : (
        <>Loading</>
      )}
    </main>
  );
};

export default ProvidersPage;
