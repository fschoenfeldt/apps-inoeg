// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Mediator } from "vanellus";
import { VanellusError } from "vanellus/dist/errors";
import { getBackendInstance } from "./backend";
import { MediatorApiAdapter } from "./MediatorApiAdapter";
import { MediatorKeyPairs, Provider } from "./types";

export class MediatorApi implements MediatorApiAdapter {
  protected backend: Mediator;

  public constructor(
    appointmentsUrl: string,
    storageUrl: string,
    id = "mediator"
  ) {
    const backend = getBackendInstance(storageUrl, appointmentsUrl);

    this.backend = new Mediator(id, backend);
  }

  async login(keyPairs: MediatorKeyPairs) {
    this.backend.keyPairs = keyPairs;

    return true;
  }

  public async isAuthenticated() {
    return !!this.backend.keyPairs;
  }

  public async logout() {
    this.backend.keyPairs = null;

    return true;
  }

  public async backup() {
    // returns something else - not M
    // const result = await this.backend.getKeys();

    // if (result.status !== Status.Succeeded || result.error) {
    //   throw new Error(result.error);
    // }

    if (!this.backend.keyPairs) {
      throw new Error("Couldn't find keypairs to backup.");
    }

    return this.backend.keyPairs;
  }

  public async getVerifiedProviders() {
    const result = await this.backend.verifiedProviders();

    if (result instanceof VanellusError) {
      throw result;
    }

    const providers: Record<string, Provider> = {};

    result.providers
      .filter((encryptedProviderData) => encryptedProviderData.data)
      .forEach((encryptedProviderData) => {
        providers[encryptedProviderData.data.id!] = {
          verified: true,
          accessible: false,
          appointments: [],
          // @ts-expect-error missing in ts-interface
          id: encryptedProviderData.data.id,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...encryptedProviderData.data!,
        };
      });

    return providers;
  }

  public async getPendingProviders() {
    const result = await this.backend.pendingProviders();

    if (result instanceof VanellusError) {
      throw result;
    }

    const providers: Record<string, Provider> = {};

    result.providers
      .filter((encryptedProviderData) => encryptedProviderData.data)
      .forEach((encryptedProviderData) => {
        providers[encryptedProviderData.data.id!] = {
          verified: false,
          accessible: false,
          appointments: [],
          // @ts-expect-error missing in ts-interface
          id: encryptedProviderData.id,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...encryptedProviderData.data!,
        };
      });

    return providers;
  }

  public async getProviders() {
    const verifiedProviders = await this.getVerifiedProviders();
    const pendingProviders = await this.getPendingProviders();

    return Object.assign(pendingProviders, verifiedProviders);
  }

  public async getProvider(providerId: string) {
    const providers = await this.getProviders();

    return providers[providerId] || null;
  }

  public async confirmProvider(providerId: string) {
    const result = await this.backend.pendingProviders();

    if (result instanceof VanellusError) {
      throw result;
    }

    const provider = result.providers.find(
      // @ts-expect-error missing in ts-interface
      (encryptedProviderData) => encryptedProviderData.id === providerId
    );

    if (provider) {
      const confirmationResult = await this.backend.confirmProvider(provider);

      if (confirmationResult instanceof VanellusError) {
        throw confirmationResult;
      }

      return {
        verified: false,
        accessible: false,
        appointments: [],
        id: provider.data.id!,
        ...provider.data,
      };
    }

    return null;
  }

  public async unconfirmProvider(providerId: string) {
    throw new Error("NOT IMPLEMENTED YET. IMPLEMENTATION MISSING?");

    return null;
  }

  public async reconfirmProvider(providerId: string) {
    throw new Error("NOT IMPLEMENTED YET. IMPLEMENTATION MISSING?");

    return null;
  }
}
