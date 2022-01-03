// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Message, Section, Text, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useMediatorApi } from "./MediatorApiContext";

const MediatorStartPage: NextPage = () => {
  const [invalidFile, setInvalidFile] = useState(false);
  const api = useMediatorApi();
  const router = useRouter();

  useEffect(() => {
    api.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        router.push("/providers");
      }
    });
  }, [api, router]);

  const uploadFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === "string") {
          const keyPairs = JSON.parse(event.target.result);

          if (
            keyPairs.signing === undefined ||
            keyPairs.encryption === undefined ||
            keyPairs.provider === undefined
          ) {
            setInvalidFile(true);
          } else {
            api.login(keyPairs);
            router.push("/providers");
          }
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <main>
      <Section className="mt-10 w-full sm:mt-0">
        <Title className="text-2xl font-bold leading-relaxed text-gray-900">
          <Trans id="mediator.welcome.title">Als Mediator anmelden</Trans>
        </Title>

        <div>
          <Title variant="h3">
            <Trans id="mediator.welcome.upload-key-pairs">
              Geheime Schlüssel laden
            </Trans>
          </Title>

          {invalidFile && (
            <Message variant="secondary">
              <Trans id="mediator.welcome.upload-key-pairs.invalid-file">
                Die von Ihnen gewählte Datei ist ungültig.
              </Trans>
            </Message>
          )}

          {!invalidFile && (
            <Text className="mb-8">
              <Trans id="mediator.welcome.upload-key-pairs.notice">
                Bitte laden Sie die Datei mit Ihren geheimen
                Vermittlerschlüsseln.
              </Trans>
            </Text>
          )}

          <form>
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer button primary md"
            >
              <Trans id="mediator.welcome.upload-key-pairs.input">
                Datei auswählen
              </Trans>

              <input
                id="file-upload"
                className="absolute inset-0 -z-10 w-auto opacity-0"
                type="file"
                onChange={uploadFile}
              />
            </label>
          </form>
        </div>
      </Section>
    </main>
  );
};

export default MediatorStartPage;
