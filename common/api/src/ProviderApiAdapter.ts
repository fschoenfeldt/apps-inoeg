// Kiebitz - Privacy-Friendly Appointments

import { Appointment, Provider, ProviderSecretData } from "./types";

export interface ProviderApiAdapter {
  login(secret: string, keyPair: any): Promise<boolean>;

  isAuthenticated(): Promise<boolean>;

  logout(): Promise<boolean>;

  register(data: Provider): Promise<boolean>;

  getSecret(): string | null;

  refetchAppointments(): Promise<Appointment[]>;

  getAppointments(): Promise<Appointment[]>;

  createAppointments(appointment: Appointment): Promise<boolean>;

  publishAppointments(): Promise<boolean>;

  updateAppointment(appointment: Appointment): Promise<boolean>;

  cancelAppointment(appointmentId: string): Promise<boolean>;

  storeProvider(provider: Provider): Promise<boolean>;

  backupData(): Promise<ProviderSecretData>;
}
