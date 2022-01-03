// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ApiStorage } from "./ApiStorage";
import GlobalApiStorage from "./GlobalApiStorage";
import { MediatorApiAdapter } from "./MediatorApiAdapter";
import { MediatorKeyPairs } from "./types";

const MEDIATOR_KEYPAIRS_KEY = "keypairs";

export class MediatorApiMock implements MediatorApiAdapter {
  protected mockGlobal: GlobalApiStorage;
  protected storage: ApiStorage;

  public constructor() {
    this.storage = new ApiStorage("mediator");
    this.mockGlobal = new GlobalApiStorage();
  }

  async login(keyPairs: MediatorKeyPairs) {
    this.storage.setItem(MEDIATOR_KEYPAIRS_KEY, keyPairs);

    return true;
  }

  public async isAuthenticated() {
    return !!this.storage.getItem(MEDIATOR_KEYPAIRS_KEY);
  }

  public async logout() {
    this.storage.removeItem(MEDIATOR_KEYPAIRS_KEY);

    return true;
  }

  public async backup() {
    return this.storage.getItem<MediatorKeyPairs>(MEDIATOR_KEYPAIRS_KEY);
  }

  public async getProviders() {
    return this.mockGlobal.getProviders();
  }

  public async getProvider(providerId: string) {
    return this.mockGlobal.getProvider(providerId);
  }

  public async confirmProvider(providerId: string) {
    const provider = await this.getProvider(providerId);

    if (!provider) {
      return null;
    }

    provider.verified = true;

    await this.mockGlobal.updateProvider(provider);

    return provider;
  }

  public async unconfirmProvider(providerId: string) {
    const provider = await this.getProvider(providerId);

    if (!provider) {
      return null;
    }

    provider.verified = false;

    await this.mockGlobal.updateProvider(provider);

    return provider;
  }

  public async reconfirmProvider(providerId: string) {
    return this.confirmProvider(providerId);
  }
}
