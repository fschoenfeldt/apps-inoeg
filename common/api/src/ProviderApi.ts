// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Provider as KiebitzProvider } from "vanellus";
import { VanellusError } from "vanellus/dist/errors";
import { getBackendInstance } from "./backend";
import { ProviderApiAdapter } from "./ProviderApiAdapter";
import type { Appointment, Provider, ProviderSecretData } from "./types";

export class ProviderApi implements ProviderApiAdapter {
  protected backend: KiebitzProvider;

  constructor(appointmentsUrl: string, storageUrl: string, id = "provider") {
    const backend = getBackendInstance(storageUrl, appointmentsUrl);

    this.backend = new KiebitzProvider(id, backend);
  }

  public async login(secret: string, keyPair: any): Promise<boolean> {
    this.backend.secret = secret;

    const result = await this.backend.restoreFromBackup(keyPair);

    if (result instanceof VanellusError) {
      throw result;
    }

    return false;
  }

  public async isAuthenticated(): Promise<boolean> {
    return !!this.backend.secret;
  }

  public async logout(): Promise<boolean> {
    return true;
  }

  public async register(data: Provider, code?: string) {
    await this.backend.create(data);
    await this.backend.storeData(code);

    return true;
  }

  public getSecret(): string | null {
    return this.backend.secret;
  }

  public async refetchAppointments(): Promise<Appointment[]> {
    return [];
  }

  public async getAppointments(): Promise<Appointment[]> {
    return [];
  }

  public async createAppointments(appointment: Appointment): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  public async publishAppointments(): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  public async updateAppointment(appointment: Appointment): Promise<boolean> {
    console.log(`Update appointment ${appointment.id}`);

    return false;
  }

  public async cancelAppointment(appointmentId: string): Promise<boolean> {
    console.log(`Cancel appointment ${appointmentId}`);

    return false;
  }

  public async storeProvider(provider: Provider): Promise<boolean> {
    console.log(`Store provider ${provider.id}`);

    return false;
  }

  public async backupData(): Promise<ProviderSecretData> {
    const result = await this.backend.backupData();

    if (result instanceof VanellusError) {
      throw VanellusError;
    }

    if (!this.backend.secret) {
      throw new Error("Couldn't find data to backup.");
    }

    return {
      secret: this.backend.secret,
      keyPair: result.data,
    };
  }
}
