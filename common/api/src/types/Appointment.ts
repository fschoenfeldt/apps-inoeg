// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import type { Appointment as VanellusAppointment } from "vanellus";
import { PublicProvider } from "./Provider";

export interface Appointment extends VanellusAppointment {
  date: Date;
  provider: PublicProvider;
}
