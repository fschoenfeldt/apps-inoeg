// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import type { MediatorKeyPairs, Provider } from "./types";

export interface MediatorApiAdapter {
  login(keyPairs: MediatorKeyPairs): Promise<boolean>;

  isAuthenticated(): Promise<boolean>;

  logout(): Promise<boolean>;

  backup(): Promise<MediatorKeyPairs | null>;

  getProviders(): Promise<Record<string, Provider>>;

  getProvider(providerId: string): Promise<Provider | null>;

  confirmProvider(providerId: string): Promise<Provider | null>;

  unconfirmProvider(providerId: string): Promise<Provider | null>;

  reconfirmProvider(providerId: string): Promise<Provider | null>;
}
