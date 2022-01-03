// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Buffer } from "buffer";
import { randomBytes } from "vanellus";
import { ApiStorage } from "./ApiStorage";
import GlobalApiStorage from "./GlobalApiStorage";
import type { Appointment } from "./types";
import { UserApiAdapter } from "./UserApiAdapter";

const USER_BOOKED_APPOINTMENT_KEY = "booked_id";
const USER_SECRET_KEY = "secret";

export class UserApiMock implements UserApiAdapter {
  protected mockGlobal: GlobalApiStorage;
  protected storage: ApiStorage;

  constructor() {
    this.storage = new ApiStorage("user");
    this.mockGlobal = new GlobalApiStorage();
  }

  public async login(secret: string): Promise<boolean> {
    this.storage.setItem(USER_SECRET_KEY, secret);

    return true;
  }

  public async isAuthenticated(): Promise<boolean> {
    const secret = this.getSecret();

    console.log({ secret });

    return !!secret;
  }

  public async logout(): Promise<boolean> {
    console.info(`Called MockAdapter::logout()`);

    this.storage.removeItem(USER_SECRET_KEY);

    return true;
  }

  public async getProvidersByZip(zip?: number, from?: Date, to?: Date) {
    return this.mockGlobal.getProviders();
  }

  public async getAppointmentsByProvider(
    providerId: string
    // from?: Date,
    // to?: Date
  ): Promise<Appointment[]> {
    console.info(
      `Called MockAdapter::getAppointmentsByProvider(${providerId})`
    );

    return this.mockGlobal
      .getProvider(providerId)
      .then((provider) => provider.appointments);
  }

  public async getAppointmentsByZip(zip?: number, from?: Date, to?: Date) {
    console.info(`Called MockAdapter::getAppointmentsByZip(${zip})`);

    /* Filtering disabled for now because of limited test-data
    return appointments.filter(
      (appointment) => zipCode.toString() === appointment.provider.zipCode
    );
    */

    return this.mockGlobal
      .getProviders()
      .then((providers) =>
        Object.values(providers).reduce<Appointment[]>(
          (current, provider) => [
            ...current,
            ...(provider?.appointments || []),
          ],
          []
        )
      );
  }

  public async cancelAppointment(appointmentId: string): Promise<boolean> {
    console.info(`Called MockAdapter::cancelAppointment(${appointmentId})`);

    this.storage.removeItem(USER_BOOKED_APPOINTMENT_KEY);

    this.logout();

    return true;
  }

  public async bookAppointment(appointmentId: string): Promise<string> {
    const secret = this.getSecret(true);

    this.storage.setItem(USER_BOOKED_APPOINTMENT_KEY, appointmentId);

    console.info(`Called MockAdapter::bookAppointment(${appointmentId})`);

    if (!secret) {
      throw new Error("Could not generate secret.");
    }

    return secret;
  }

  protected getSecret(forceCreation = false) {
    let secret = this.storage.getItem(USER_SECRET_KEY);

    if (!secret && forceCreation) {
      secret = Buffer.from(randomBytes(10)).toString("base64");

      this.storage.setItem(USER_SECRET_KEY, secret);
    }

    console.info(`Called MockAdapter::getSecret(), got secret: ${secret}`);

    return secret;
  }
}
