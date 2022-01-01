// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Mediator as KiebitzMediator, MediatorKeyPairs } from "vanellus";
import { getBackendInstance } from "./backend";
import { providers } from "./fixtures/providers";
import { Provider } from "./types";

export class MediatorApi {
  protected mediator: KiebitzMediator;
  protected keyPairs: MediatorKeyPairs | null;

  constructor() {
    this.mediator = new KiebitzMediator("main", getBackendInstance());
    this.keyPairs = null;
  }

  public async authenticate(keyPairs: MediatorKeyPairs): Promise<boolean> {
    this.keyPairs = keyPairs;

    return true;
  }

  public async isAuthenticated(): Promise<boolean> {
    return !!this.keyPairs;
  }

  public async logout(): Promise<boolean> {
    return true;
  }

  public async getProviders(): Promise<Provider[]> {
    return providers;
  }

  public async getProvider(providerId: string): Promise<Provider | null> {
    return providers[Number(providerId) - 1] || null;
  }

  public async confirmProvider(provider: Provider): Promise<boolean> {
    console.log(`Confirm provider ${provider.id}`);

    return true;
  }

  public async unconfirmProvider(provider: Provider): Promise<boolean> {
    console.log(`Unconfirm provider ${provider.id}`);

    return true;
  }

  public async reconfirmProvider(provider: Provider): Promise<boolean> {
    console.log(`Reconfirm provider ${provider.id}`);

    return true;
  }

  public async backupData(): Promise<MediatorKeyPairs> {
    return "foobar" as unknown as MediatorKeyPairs;
  }
}
