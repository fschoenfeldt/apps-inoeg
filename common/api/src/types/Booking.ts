// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Slot } from "./Slot";

export interface Booking {
  id: string;
  slot: Slot;
  code?: string;
}
