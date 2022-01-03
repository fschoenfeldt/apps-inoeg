// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import {
  Backend,
  InMemoryStorage,
  Settings,
  Status,
  StorageStore,
  Store,
  User,
} from "vanellus";
import type { Appointment } from "./types";
import { UserApiAdapter } from "./UserApiAdapter";

export class UserApi implements UserApiAdapter {
  protected backend: User;

  public constructor(
    appointmentsUrl: string,
    storageUrl: string,
    protected zipCode = 30363,
    id = "user"
  ) {
    const store: Store = new StorageStore(new InMemoryStorage());
    const temporaryStore: Store = new StorageStore(new InMemoryStorage());
    const settings: Settings = {
      apiUrls: {
        appointments: appointmentsUrl,
        storage: storageUrl,
      },
      appointment: {
        properties: {},
      },
    };
    const backend = new Backend(settings, store, temporaryStore);

    this.backend = new User(id, backend);
  }

  public async login(secret: string) {
    this.backend.secret = secret;

    return true;
  }

  public async logout() {
    console.info(`Called MockAdapter::logout()`);

    return true;
  }

  public async isAuthenticated() {
    return !!this.backend.secret;
  }

  public async backup() {
    const result = await this.backend.backupData();

    if (result.status !== Status.Succeeded || result.error) {
      throw new Error(result.error);
    }

    return result.data;
  }

  public async restore(secret: string) {
    this.backend.secret = secret;

    const result = await this.backend.restoreFromBackup();

    if (result.status !== Status.Succeeded || result.error) {
      throw new Error(result.error);
    }

    return result.data;
  }

  public async getProvidersByZip(zip?: number, from?: Date, to?: Date) {
    const result = await this.backend.getAppointments({
      zipCode: zip?.toString() || this.zipCode.toString(),
      from: (from || new Date()).toISOString(),
      to: (to || new Date()).toISOString(),
    });

    if (result.status !== Status.Succeeded || result.error) {
      throw new Error(result.error);
    }

    return result.appointments.map((appointment) => ({
      verified: true,
      accessible: false,
      ...appointment.provider,
    }));
  }

  public async getAppointmentsByProvider(
    providerId: string,
    from?: Date,
    to?: Date
  ) {
    const result = await this.backend.getAppointments({
      zipCode: this.zipCode.toString(),
      from: (from || new Date()).toISOString(),
      to: (to || new Date()).toISOString(),
    });

    if (result.status !== Status.Succeeded || result.error) {
      throw new Error(result.error);
    }

    const appointments: Appointment[] = [];

    result.appointments
      .filter(
        (providerAppointment) => providerAppointment.provider.id === providerId
      )
      .forEach((providerAppointments) => {
        providerAppointments.appointments.forEach((appointment) => {
          appointments.push({
            date: new Date(appointment.timestamp),
            provider: {
              verified: true,
              accessible: false,
              ...providerAppointments.provider,
            },
            ...appointment,
          });
        });
      });

    return appointments;
  }

  public async getAppointmentsByZip(zip?: number, from?: Date, to?: Date) {
    const result = await this.backend.getAppointments({
      zipCode: zip?.toString() || this.zipCode.toString(),
      from: (from || new Date()).toISOString(),
      to: (to || new Date()).toISOString(),
    });

    if (result.status !== Status.Succeeded || result.error) {
      throw new Error(result.error);
    }

    const appointments: Appointment[] = [];

    result.appointments.forEach((providerAppointments) => {
      providerAppointments.appointments.forEach((appointment) => {
        appointments.push({
          provider: {
            verified: true,
            accessible: false,
            ...providerAppointments.provider,
          },
          date: new Date(appointment.timestamp),
          ...appointment,
        });
      });
    });

    return appointments;
  }

  public async cancelAppointment() {
    if (this.backend.acceptedAppointment) {
      const result = await this.backend.cancelAppointment(
        this.backend.acceptedAppointment
      );

      if (result.status !== Status.Succeeded || result.error) {
        throw new Error(result.error);
      }

      return true;
    }

    return false;
  }

  public async bookAppointment(appointmentId: string) {
    if (!this.backend.secret) {
      this.backend.initialize();
    }

    if (!this.backend.secret) {
      throw new Error("Could not generate secret");
    }

    console.error("NOT IMPLEMENTED YET!");

    return this.backend.secret;
  }

  protected getSecret(forceCreation = false) {
    if (forceCreation) {
      this.backend.initialize();
    }

    return this.backend.secret;
  }
}
