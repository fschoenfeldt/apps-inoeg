// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { nanoid } from "nanoid";
import { ApiStorage } from "./ApiStorage";
import { appointments } from "./fixtures/appointments";
import GlobalApiStorage from "./GlobalApiStorage";
import { ProviderApiAdapter } from "./ProviderApiAdapter";
import type {
  Appointment,
  Provider,
  ProviderKeyPair,
  ProviderSecretData,
} from "./types";

export class ProviderApiMock implements ProviderApiAdapter {
  protected keyPair: ProviderKeyPair | null = null;
  protected appointments: Appointment[] = [];
  protected mockGlobal: GlobalApiStorage;
  protected storage: ApiStorage;
  protected secret: string | null;

  constructor() {
    this.storage = new ApiStorage("provider");
    this.mockGlobal = new GlobalApiStorage();

    this.secret = this.storage.getItem("secret");
    // this.appointments = this.mockGlobal.getAppointmentsByProvider(providerId);
  }

  public async login(
    secret: string,
    keyPair: ProviderKeyPair
  ): Promise<boolean> {
    this.keyPair = keyPair;
    this.secret = secret;

    return false;
  }

  public getSecret() {
    return this.secret;
  }

  public async isAuthenticated(): Promise<boolean> {
    return null !== this.secret;
  }

  public async logout(): Promise<boolean> {
    this.secret = null;
    this.keyPair = null;

    localStorage.removeItem("provider::secret");

    return true;
  }

  public async register(data: Provider) {
    const secret = (Math.random() * 10000000000000000)
      .toString()
      .substring(0, 16);

    this.secret = secret;

    this.storage.setItem("secret", this.secret);

    const id = nanoid();

    this.mockGlobal.addProvider({
      ...data,
      verified: false,
      id,
    });

    return true;
  }

  public async refetchAppointments(): Promise<Appointment[]> {
    this.appointments = appointments;

    return this.appointments;
  }

  public async getAppointments(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async createAppointments(appointment: Appointment): Promise<boolean> {
    try {
      appointment.modified = true;

      this.appointments.push(appointment);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  public async publishAppointments(): Promise<boolean> {
    try {
      this.appointments.forEach((appointment) => {
        appointment.modified = false;
      });

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
    if (!this.secret) {
      console.log(this);
      throw new Error("Couldn't find data to backup.");
    }

    return {
      secret: this.secret,
      keyPair: this.keyPair,
    };
  }
}
