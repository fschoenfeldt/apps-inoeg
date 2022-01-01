// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Backend, InMemoryStorage, Settings, StorageStore } from "vanellus";

export const getBackendInstance = (): Backend => {
  const settings: Settings = {
    appointment: {
      properties: {},
    },
    apiUrls: {
      storage:
        process.env.NEXT_PUBLIC_STORAGE_ENDPOINT ||
        "https://storage.kiebitz.eu/jsonrpc",
      appointments:
        process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT ||
        "https://appointments.kiebitz.eu/jsonrpc",
    },
  };
  const store = new StorageStore(new InMemoryStorage());
  const temporaryStore = new StorageStore(new InMemoryStorage());

  return new Backend(settings, store, temporaryStore);
};
