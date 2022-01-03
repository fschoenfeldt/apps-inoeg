import type { Meta } from "@storybook/react";
import { AppointmentCard, AppointmentCardProps } from "./AppointmentCard";

const appointment = {
  id: "1",
  duration: 90,
  date: new Date(),
  provider: {
    id: "1",
    name: "Impfzentrum FFM",
    street: "Ludwig-Ehrhard-Anlage 1",
    zipCode: "60327",
    city: "Frankfurt am Main",
    accessible: true,
    verified: true,
    appointments: [],
    description: "",
  },
  slots: [],
  bookings: [],
  vaccine: "mrna" as any,
  modified: false,
  properties: {},
  publicKey: "",
  slotData: [],
  timestamp: "",
  updatedAt: "",
};

export default {
  component: AppointmentCard,
} as Meta<AppointmentCardProps>;

export const Default = () => <AppointmentCard appointment={appointment} />;
export const Border = () => (
  <AppointmentCard appointment={appointment} border />
);
