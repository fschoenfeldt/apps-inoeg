// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import type { Appointment, PublicProvider } from "./types";

export interface UserApiAdapter {
  login(secret: string): Promise<boolean>;

  isAuthenticated(): Promise<boolean>;

  logout(): Promise<boolean>;

  getProvidersByZip(
    zip?: number,
    from?: Date,
    to?: Date
  ): Promise<Record<string, PublicProvider>>;

  getAppointmentsByProvider(
    providerId: string,
    from?: Date,
    to?: Date
  ): Promise<Appointment[]>;

  getAppointmentsByZip(
    zip?: number,
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
