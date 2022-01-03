import { Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";

const SettingsPage: NextPage = () => {
  return (
    <main>
      <section>
        <Title>
          <Trans id="mediator.settings.title">Einstellungen</Trans>
        </Title>
      </section>
    </main>
  );
};

export default SettingsPage;
