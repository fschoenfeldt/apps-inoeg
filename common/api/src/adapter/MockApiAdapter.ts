// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Buffer } from "buffer";
import { randomBytes } from "vanellus";
import { appointments } from "../fixtures/appointments";
import { providers } from "../fixtures/providers";
import type { Appointment, PublicProvider } from "../types";
import { ApiAdapter } from "./ApiAdapter";

const USER_BOOKED_APPOINTMENT_KEY = "booked_id";
const USER_SECRET_KEY = "secret";

export class MockAdapter implements ApiAdapter {
  public constructor(protected storage: Storage) {}

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

  public async getVerifiedProvidersByZip(
    zip: number,
    radius = 5
  ): Promise<PublicProvider[]> {
    console.info(
      `Called MockAdapter::getVerifiedProvidersByZip(${zip}, ${radius})`
    );

    return providers;
  }

  public async getAppointmentsByProvider(
    providerId: string
    // from?: Date,
    // to?: Date
  ): Promise<Appointment[]> {
    console.info(
      `Called MockAdapter::getAppointmentsByProvider(${providerId})`
    );

    return appointments.filter(
      (appointment) => providerId === appointment.provider.id
    );
  }

  public async getAppointmentsByZipCode(
    zipCode: number,
    radius = 5
    // from?: Date,
    // to?: Date
  ): Promise<Appointment[]> {
    console.info(
      `Called MockAdapter::getAppointmentsByZipCode(${zipCode}, ${radius})`
    );

    return appointments;

    /* Filtering disabled for now because of limited test-data
    return appointments.filter(
      (appointment) => zipCode.toString() === appointment.provider.zipCode
    );
    */
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
