// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Text, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Link } from "../../components/Link";
import { useProviderApi } from "../ProviderApiContext";
import { BackupDataLink } from "./BackupDataLink";
import { DataSecret } from "./DataSecret";
import { useOnboardingState } from "./OnboardingStateProvider";

export const SecretStep: React.FC = () => {
  const api = useProviderApi();
  const [secret, setSecret] = useState<string | null>(api.getSecret());
  const { state } = useOnboardingState();

  const router = useRouter();

  useEffect(() => {
    if (!state.data) {
      router.push("/onboarding");
    }

    setSecret(api.getSecret());
  }, [api, state, router]);

  return (
    <main>
      <div className="md:w-2/3">
        <Title as="h1">Logindaten speichern</Title>

        <Text>
          <Trans id="provider.onboarding.secret.notice">
            Um sich später wieder einzuloggen oder Ihre Termine zugreifen zu
            können, benötigen Sie Ihre SICHERHEITSDATEI und Ihren
            SICHERHEITSCODE. Bitte speichern Sie jetzt Ihre SICHERHEITSDATEI und
            notieren Sie sich im Anschluss den SICHERHEITSCODE.
          </Trans>
        </Text>

        <BackupDataLink className="mb-12" />

        {secret && <DataSecret secret={secret} />}

        <Link href="/schedule" type="button" variant="primary">
          <Trans id="provider.onboarding.secret.button">
            Abschließen & zur Terminplanung
          </Trans>
        </Link>
      </div>
    </main>
  );
};
