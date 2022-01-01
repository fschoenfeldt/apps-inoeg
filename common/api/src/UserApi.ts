// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ApiAdapter } from "./adapter/ApiAdapter";
import { MockAdapter } from "./adapter/MockApiAdapter";
import { ApiStorage } from "./ApiStorage";
import { Appointment } from "./types";

export class UserApi {
  protected adapter: ApiAdapter;

  constructor() {
    this.adapter = new MockAdapter(new ApiStorage("user"));
  }

  public async isAuthenticated(): Promise<boolean> {
    return this.adapter.isAuthenticated();
  }

  public async logout(): Promise<boolean> {
    return this.adapter.logout();
  }

  public async getProvidersByZip(zipCode: number, radius = 5) {
    return this.adapter.getVerifiedProvidersByZip(zipCode, radius);
  }

  public async getAppointmentsByProvider(
    providerId: string,
    from?: Date,
    to?: Date
  ): Promise<Appointment[]> {
    return this.adapter.getAppointmentsByProvider(providerId, from, to);
  }

  public async getAppointmentsByZipCode(
    zipCode: number,
    radius = 5,
    from?: Date,
    to?: Date
  ): Promise<Appointment[]> {
    return this.adapter.getAppointmentsByZipCode(zipCode, radius, from, to);
  }

  public async bookAppointment(appointmentId: string): Promise<string> {
    return this.adapter.bookAppointment(appointmentId);
  }

  public async cancelAppointment(
    appointmentId: string,
    providerID: string
  ): Promise<boolean> {
    console.log("Cancel appointment", appointmentId, providerID);

    return this.adapter.cancelAppointment(appointmentId);
  }
}
