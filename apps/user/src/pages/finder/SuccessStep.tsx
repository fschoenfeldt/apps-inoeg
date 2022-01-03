import { GeneratePdf16 } from "@carbon/icons-react";
import { vaccines } from "@kiebitz-oss/config";
import { Text, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "../../components/Link";
import { useI18n } from "../../components/useI18n";
import { AppointmentCard } from "../AppointmentCard";
import { useUserApi } from "../UserApiContext";
import { useFinderState } from "./FinderStateProvider";

export const SuccessStep: React.FC = () => {
  const api = useUserApi();
  const i18n = useI18n();
  const { state } = useFinderState();
  const [secret, setSecret] = useState<string | null>(null);
  const router = useRouter();
  const appointment = state.appointment!;

  useEffect(() => {
    if (!appointment || !appointment.provider) {
      router.push("/finder");
    } else {
      api
        .bookAppointment(appointment.id)
        .then((secret) => {
          setSecret(secret);
        })
        .catch((error) => {
          // @TODO handle failure
          console.error(error);
        });
    }
  }, [api, appointment, router]);

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    api.cancelAppointment(appointment.id, appointment.provider.id).then(() => {
      router.push("/finder");
    });
  };

  // safeguard
  if (!appointment || !appointment.provider) {
    return null;
  }

  return (
    <main id="finder-success">
      <article className="flex flex-col gap-14">
        <section className="flex flex-col gap-8">
          <Title variant="h1" as="h2" className="mx-4 mb-4 md:mx-0">
            <Trans id="user.finder.success.title">
              Ihr Termin ist gebucht!
            </Trans>
          </Title>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col flex-1">
              <Title variant="book" as="h3">
                <Trans id="user.finder.success.appointment-title">
                  Ihr Termin
                </Trans>
              </Title>

              <AppointmentCard appointment={appointment} border />
            </div>

            <div className="flex flex-col flex-1">
              <Title variant="book" as="h3">
                <Trans id="user.finder.success.appointment-code">
                  Ihr Buchungscode
                </Trans>
              </Title>

              <div className="flex justify-center items-center p-4 text-2xl font-bold text-white bg-black rounded md:grow md:text-6xl">
                {secret === null
                  ? "Buchung läuft..."
                  : secret.toUpperCase().slice(0, 4)}
              </div>
            </div>
          </div>

          <Text variant="text2" className="mx-4 md:mx-0">
            <Trans id="user.finder.success.intro">
              <strong>Wichtig:</strong> Bitte notieren Sie sich den
              untenstehenden Code und bringen ihn unbedingt zur Impfung mit.
            </Trans>
          </Text>

          <div className="flex flex-col gap-4 mx-4 md:mx-0">
            <Text variant="text2">
              Sollte Sie Ihren Termin nicht wahrnehmen können, stornieren Sie
              ihn bitte mit nachstehendem Button.
            </Text>

            <button
              onClick={onCancel}
              className="text-primary bg-primary/10 button md"
            >
              <Trans id="user.finder.success.cancel-button">
                Termin absagen
              </Trans>
            </button>
          </div>
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            Das müssen Sie zur Impfung gegen COVID-19 mitbringen:
          </Title>

          <ul className="flex flex-col gap-4">
            <li>
              <strong>Ein amtliches Ausweisdokument</strong>
              <br />
              <i>(Personalausweis, Reisepass)</i>
            </li>

            <li>
              <strong>Impfpass</strong>
              <br />
              <i>
                (wenn nicht vorhanden, erhalten Sie eine Ersatzbescheinigung.)
              </i>
            </li>

            <li>
              <strong>FFP2-Maske</strong>
              <br />
              <i>(zur Einhaltung der Hygienemaßnahmen)</i>
            </li>
          </ul>
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            Impfvorbereitungen
          </Title>

          <ul className="grid grid-flow-row gap-4 pb-6">
            {vaccines[i18n.locale || "de"][appointment.vaccine].pdfs.map(
              (pdf) => (
                <li key={pdf.label}>
                  <Link
                    href={pdf.url}
                    external
                    className="text-primary bg-primary/10 button md"
                  >
                    <GeneratePdf16 />
                    <span className="break-all">{pdf.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>

          <Text variant="text2">
            {vaccines[i18n.locale || "de"][appointment.vaccine].pdfDescription}
          </Text>
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            Mit den folgenden Schritten können Sie sich zusätzlich auf Ihren
            Impftermin vorbereiten:
          </Title>

          <ul className="flex flex-col gap-4">
            <li>
              <Text>An- und Rückfahrt planen und organisieren</Text>
            </li>

            <li>
              <Text>
                Zeit für <strong>Nachbeobachtung</strong> einplanen.
                <br />
                <i>
                  (ca. 15 Minuten, bei bestimmten Vorerkrankungen gegebenenfalls
                  auch etwas länger)
                </i>
              </Text>
            </li>

            <li>
              <Text>
                Gedanken zur eigenen <strong>Krankheitsgeschichte</strong>{" "}
                <i>(zum Beispiel Allergien, Ohnmachtsanfälle)</i> machen, um
                diese der Ärztin oder dem Arzt bei der Impfung mitteilen und
                mögliche Risiken der Impfung abwägen zu können.
              </Text>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
};
