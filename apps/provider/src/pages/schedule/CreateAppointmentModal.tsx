import { Appointment } from "@kiebitz-oss/api";
import { vaccines } from "@kiebitz-oss/config";
import {
  Button,
  Form,
  InputField,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  SelectField,
  Title,
} from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useEffectOnce } from "react-use";

interface FormData {
  date?: string;
  time?: string;
  slots: number;
  duration: number;
}

const resolver: Resolver<FormData> = async (values) => {
  const errors: any = {};

  // if (values.date === undefined) {
  //     errors.date = t({
  //         id: 'provider.schedule.create-appointment-modal.please-enter-date',
  //     });
  // } else if (values.time === undefined) {
  //     errors.time = t({
  //         id: 'provider.schedule.create-appointment-modal.please-enter-time',
  //     });
  // } else {
  //     values.startdate = new Date(`${values.date} ${values.time}`);

  //     if (values.startdate < new Date()) {
  //         errors.date = t({
  //             id: 'provider.schedule.create-appointment-modal.in-the-past',
  //         });
  //     }

  //     // we allow appointments max. 30 days in the future
  //     if (
  //         values.startdate >
  //         new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
  //     ) {
  //         errors.date = t({
  //             id: 'provider.schedule.create-appointment-modal.too-far-in-the-future',
  //             message:
  //                 'Bitte wählen Sie Termine die maximal 30 Tage in der Zukunft liegen',
  //         });
  //     }
  // }

  if (values.slots > 50) {
    errors.slots = t({
      id: "provider.schedule.create-appointment-modal.too-many-slots",
    });
  }

  if (values.slots < 1) {
    errors.slots = t({
      id: "provider.schedule.create-appointment-modal.too-few-slots",
    });
  }

  return {
    values,
    errors,
  };
};

interface CreateAppointmentModal extends ModalProps {
  appointments?: Appointment[];
}

export const CreateAppointmentModal: React.FC<CreateAppointmentModal> = ({
  appointments,
  onClose,
}) => {
  const router = useRouter();
  // const { hash } = useLocation();
  const hash = undefined;

  const { action, id } = router.query;

  const methods = useForm<FormData>({
    mode: "onBlur",
    resolver,
  });

  const { register, handleSubmit, formState, reset, getValues } = methods;

  const data = getValues();

  let actionUrl = "";

  if (action !== undefined) {
    actionUrl = `/${action}`;
  }

  if (id !== undefined) {
    actionUrl += `/view/${id}`;
  }

  const cancel = () => router.push(`/schedule${actionUrl}`);

  let appointment: Appointment | undefined;

  if (id !== undefined) {
    appointment = appointments?.find((app) => app.id === id);
  }

  useEffectOnce(() => {
    if (appointment) {
      const appointmentData: FormData = {
        time: (appointment.date || new Date()).toLocaleTimeString(),
        date: (appointment.date || new Date()).toLocaleDateString(),
        slots: appointment.slots.length,
        duration: appointment.duration,
      };

      reset(appointmentData);
    } else {
      // const date = !hash ? new Date(hash) : new Date();
      const date = new Date();
      const newData: FormData = {
        duration: data.duration || 30,
        slots: data.slots || 1,
        time: date.toLocaleTimeString(),
        date: date.toLocaleDateString(),
      };

      // let firstProperty;
      // const found = false;

      // addProps: for (const [_, v] of Object.entries(properties)) {
      //     for (const [kk, _] of Object.entries(v.values)) {
      //         if (firstProperty === undefined) {
      //             firstProperty = kk;
      //         }

      //         if (data[kk] !== undefined) {
      //             found = true;

      //             newData[kk] = true;

      //             break addProps;
      //         }
      //     }
      // }

      // if (!found) {
      //     newData[firstProperty] = true;
      // }

      reset(newData);
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // we remove unnecessary fields like 'time' and 'date'
    delete data.time;
    delete data.date;

    // if (appointment !== undefined) {
    //     action = updateAppointmentAction;
    // } else {
    //     action = createAppointmentAction;
    // }

    // const promise = action(data, appointment);

    // promise.finally(() => setSaving(false));

    // promise.then(() => {
    //     // we reload the appointments
    //     openAppointmentsAction();
    //     // and we go back to the schedule view
    //     navigate(`/schedule${actionUrl}`);
    // });
  };

  // const properties = {}; // settings.get('appointmentProperties');

  // const apptProperties = Object.entries(properties).map(([k, v]) => {
  //     const options = Object.entries(v.values).map(([kv, vv]) => {
  //         return {
  //             value: kv,
  //             label: vv['de'],
  //             // label: `${k}.values.${kv}`,
  //         };
  //     });

  //     return (
  //         <Fragment key={k}>
  //             <SelectField
  //                 options={options}
  //                 label={t({ message: v.title['de'], id: `${k}.title` })}
  //                 // onChange={(option) => changeTo(option)}
  //                 {...register(k)}
  //             />
  //         </Fragment>
  //     );
  // });

  return (
    <Modal onClose={onClose}>
      <FormProvider {...methods}>
        <Form name="appointment-modal" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Title>
              {appointment !== undefined ? (
                <Trans id="provider.schedule.create.appointment-modal.edit-title">
                  Termin bearbeiten
                </Trans>
              ) : (
                <Trans id="provider.schedule.create.appointment-modal.new-title">
                  Neuen Termin erstellen
                </Trans>
              )}
            </Title>
          </ModalHeader>

          <ModalContent className="flex flex-col gap-6">
            <div className="flex gap-6 w-full">
              <InputField
                label={t({
                  id: "provider.schedule.create.appointment-modal.date.label",
                  message: "Datum",
                })}
                type="date"
                className="grow"
                {...register("date", {
                  required: true,
                })}
              />

              <InputField
                label={t({
                  id: "provider.schedule.create.appointment-modal.time.label",
                  message: "Uhrzeit",
                })}
                type="time"
                className="min-w-[33%]"
                {...register("time", {
                  required: true,
                })}
              />
            </div>

            <InputField
              label={t({
                id: "provider.schedule.create.appointment-modal.slots.label",
                message: "Anzahl Impfdosen",
              })}
              type="number"
              step={1}
              min={1}
              {...register("slots", {
                required: true,
              })}
            />

            <SelectField
              label={t({
                id: "provider.schedule.create.appointment-modal.duration-label",
                message: "Vstl. Dauer",
              })}
              options={[
                5, 10, 15, 20, 30, 45, 60, 90, 120, 150, 180, 210, 240,
              ].map((duration) => ({
                label: t({
                  id: "provider.schedule.create.appointment-modal.duration-value",
                  message: `Dauer: ${duration} Minuten`,
                }),
                value: duration,
              }))}
              {...register("duration", {
                required: true,
              })}
            />

            <SelectField
              label={t({
                id: "provider.schedule.create.appointment-modal.vaccine-label",
                message: "Impfstoff",
              })}
              options={Object.keys(vaccines.de).map((vaccineKey) => {
                return {
                  // @ts-ignore
                  label: vaccines.de[vaccineKey].name,
                  value: vaccineKey,
                };
              })}
              {...register("duration", {
                required: true,
              })}
            />

            {/* {apptProperties} */}
          </ModalContent>

          <ModalFooter>
            <Button disabled={!formState.isValid || formState.isSubmitting}>
              <Trans id="provider.schedule.create.appointment-modal.button">
                Speichern
              </Trans>
            </Button>
          </ModalFooter>
        </Form>
      </FormProvider>
    </Modal>
  );
};
