// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { b642buf, Provider as KiebitzProvider, randomBytes } from "vanellus";
import { getBackendInstance } from "./backend";
import { appointments } from "./fixtures/appointments";
import type {
  Appointment,
  Provider,
  ProviderKeyPair,
  ProviderSecretData,
} from "./types";
import { buf2base32 } from "./utils/crypto";

export class ProviderApi {
  // protected secret: string | null = null;
  protected keyPair: ProviderKeyPair | null = null;
  protected appointments: Appointment[] = [];

  protected provider: KiebitzProvider;

  constructor() {
    this.provider = new KiebitzProvider("main", getBackendInstance());
  }

  public async authenticate(
    secret: string,
    keyPair: ProviderKeyPair
  ): Promise<boolean> {
    this.keyPair = keyPair;
    this.secret = secret;

    return false;
  }

  set secret(secret: string | null) {
    localStorage.setItem("provider::secret", JSON.stringify(secret));
  }

  get secret(): string | null {
    try {
      const secret = localStorage.getItem("provider::secret");

      if (secret) {
        return JSON.parse(secret);
      }
    } catch (error) {
      //
    }

    return null;
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
    const secret = buf2base32(b642buf(randomBytes(10)));

    this.secret = secret;
    window.localStorage.setItem("provider::data", JSON.stringify(data));

    return secret;
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

  public getSecret() {
    return this.secret;
  }
}
