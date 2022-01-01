// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ActorKey } from "vanellus";

export interface ProviderSecretData {
  secret: string;
  keyPair: ActorKey | null;
}
