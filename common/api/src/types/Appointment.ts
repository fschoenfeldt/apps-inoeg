// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import type { Vaccine } from "@kiebitz-oss/config";
import type { Appointment as VanellusAppointment } from "vanellus";
import type { Booking } from "./Booking";
import type { PublicProvider } from "./Provider";
import type { Slot } from "./Slot";

export interface Appointment extends VanellusAppointment {
  id: string;
  bookings: Booking[]; // any[] in vanellus
  // updatedAt: string;
  // modified: boolean;
  // timestamp: string;
  // duration: number;
  // properties: { [Key: string]: any };
  // id: string;
  // publicKey: string;
  // slotData: Slot[];

  date: Date;
  vaccine: Vaccine;
  slots: Slot[];

  provider: PublicProvider;
  // bookings: Booking[];
}
