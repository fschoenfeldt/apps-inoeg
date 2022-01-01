// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import type { Slot as VanellusSlot } from "vanellus";
export interface Slot extends VanellusSlot {
  // id: string;
  // open?: boolean;
  status?: string;
  cancel?: string;
}
