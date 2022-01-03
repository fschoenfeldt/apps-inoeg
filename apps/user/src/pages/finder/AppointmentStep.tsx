import { Edit24 } from "@carbon/icons-react";
import type { Appointment } from "@kiebitz-oss/api";
import { Button, Error, InputField, Title } from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { BackLink } from "../../components/BackLink";
import { Link } from "../../components/Link";
import { AppointmentCard } from "../AppointmentCard";
import { useUserApi } from "../UserApiContext";
import { Types, useFinderState } from "./FinderStateProvider";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCardSelector: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  const { dispatch } = useFinderState();

  const onAppointmentSelect: MouseEventHandler<HTMLAnchorElement> = (event) => {
    dispatch({
      type: Types.SET_APPOINTMENT,
      payload: {
        appointment,
      },
    });
  };

  return (
    <Link
      href="/finder/verify"
      className="group justify-center p-4 w-full text-center hover:text-black no-underline rounded shadow-appointment hover:shadow-appointment2 sm:mx-0"
      onClick={onAppointmentSelect}
      data-id={appointment.id}
    >
      <AppointmentCard appointment={appointment}>
        <Button
          tabIndex={-1}
          className="group-hover:text-white group-hover:bg-primary group-focus:bg-primary group-hover:border-transparent select-none shadow-lg"
        >
          <Trans id="user.finder.appointment.card.submit">
            Termin auswählen
          </Trans>
        </Button>
      </AppointmentCard>
    </Link>
  );
};

export const AppointmentStep: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const { dispatch, state } = useFinderState();
  const api = useUserApi();

  useEffect(() => {
    state?.provider?.id
      ? api.getAppointmentsByProvider(state.provider.id).then(setAppointments)
      : api.getAppointmentsByZip(10707).then(setAppointments);
  }, [api, state.provider]);

  const onDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const date = event.currentTarget.valueAsDate;

    dispatch({
      type: Types.SET_DATE,
      payload: { date: date || new Date() },
    });
  };

  const onResetProvider: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.value === "") {
      dispatch({
        type: Types.SET_PROVIDER,
        payload: { provider: null },
      });
    }
  };

  return (
    <main id="finder-appointment">
      <BackLink href="/finder">
        <Trans id="user.finder.appointment.back-link">
          Zurück zur Auswahl der Impfstelle
        </Trans>
      </BackLink>

      <Title variant="h1" as="h2" className="ml-4 sm:ml-0">
        <Trans id="user.finder.appointment.title">Termine</Trans>
      </Title>

      <div className="flex flex-col gap-5 px-4 mb-10 w-full md:flex-row md:justify-between md:px-0">
        <div className="flex flex-row gap-2 items-center">
          <InputField
            name="provider"
            type="search"
            placeholder={t({
              id: "user.finder.appointment.provider.placeholder",
              message: "Beliebige Impfstelle",
            })}
            value={state.provider?.name}
            onChange={onResetProvider}
            className="flex-1"
          />
          <Link
            href="/finder/location"
            className="inline-flex justify-center items-center w-10 h-10 text-white hover:text-white no-underline bg-primary rounded shadow"
          >
            <Edit24 />
          </Link>
        </div>

        <InputField
          name="date"
          type="datetime-local"
          placeholder={t({
            id: "user.finder.appointment.time.placeholder",
            message: "Beliebige Zeit",
          })}
          onChange={onDateChange}
          defaultValue={state.date.toISOString().substring(0, 16)}
        />
      </div>

      {!Array.isArray(appointments) && <div>Loading</div>}

      {Array.isArray(appointments) && appointments.length === 0 && (
        <Error className="mx-auto">
          <Trans id="user.finder.appointment.no-result">
            Es sind keine freien Termine verfügbar.
            <br />
            Bitte versuchen Sie einen späteren Zeitpunkt oder ein anderen
            Impfstelle.
          </Trans>
        </Error>
      )}

      {Array.isArray(appointments) && appointments.length > 0 && (
        <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <AppointmentCardSelector
              appointment={appointment}
              key={appointment.id}
            />
          ))}
        </div>
      )}
    </main>
  );
};
