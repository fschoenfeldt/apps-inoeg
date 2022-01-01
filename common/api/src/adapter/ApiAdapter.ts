// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import type { Appointment, PublicProvider } from "../types";

export interface ApiAdapter {
  isAuthenticated(): Promise<boolean>;

  logout(): Promise<boolean>;

  getVerifiedProvidersByZip(
    zip: number,
    radius?: number
  ): Promise<PublicProvider[]>;

  getAppointmentsByProvider(
    providerId: string,
    from?: Date,
    to?: Date
  ): Promise<Appointment[]>;

  getAppointmentsByZipCode(
    zipCode: number,
    radius?: number,
    from?: Date,
    to?: Date
  ): Promise<Appointment[]>;

  /**
   * Books an appointment for the current user.
   *
   * @param appointmentId string
   *
   * @returns Promise<string> the generated secret
   */
  bookAppointment(appointmentId: string): Promise<string>;

  cancelAppointment(appointmentId: string): Promise<boolean>;
}
