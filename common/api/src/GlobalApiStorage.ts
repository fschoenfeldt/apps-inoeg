import { ApiStorage } from "./ApiStorage";
import { providers as initialProviders, providers } from "./fixtures/providers";
import { Appointment, Provider } from "./types";

export const GLOBAL_PROVIDERS_KEY = "providers";

class GlobalApiStorage extends ApiStorage {
  constructor() {
    super("kiebitz");

    this.getProviders().then((providers) => {
      if (Object.keys(providers).length === 0) {
        console.info("load initial providers");

        this.setProviders(initialProviders);
      }
    });
  }

  public async getProviders() {
    return this.getItem<Record<string, Provider>>(GLOBAL_PROVIDERS_KEY) || {};
  }

  public async setProviders(providers: Record<string, Provider>) {
    this.setItem(GLOBAL_PROVIDERS_KEY, providers);

    return providers;
  }

  public async getProvider(providerId: string) {
    return this.getProviders().then(
      (providers) => providers[providerId] || null
    );
  }

  public async updateProvider(provider: Partial<Provider> & { id: string }) {
    const providers = await this.getProviders();

    if (providers[provider.id]) {
      providers[provider.id] = Object.assign(providers[provider.id], provider);
    }

    return this.setProviders(providers);
  }

  public async addProvider(provider: Provider) {
    const providers = await this.getProviders();

    providers[provider.id] = provider;

    return this.setProviders(providers);
  }

  public async addAppointment(providerId: string, appointment: Appointment) {
    if (providers[providerId]) {
      providers[providerId].appointments.push(appointment);
    }

    return providers[providerId].appointments;
  }
}

export default GlobalApiStorage;
