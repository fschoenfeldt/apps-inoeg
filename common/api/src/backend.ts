// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Backend, InMemoryStorage, Settings, StorageStore } from "vanellus";

export const getBackendInstance = (
  storageUrl: string,
  appointmentsUrl: string
): Backend => {
  const settings: Settings = {
    appointment: {
      properties: {},
    },
    apiUrls: {
      storage: storageUrl,
      appointments: appointmentsUrl,
    },
  };
  const store = new StorageStore(
    typeof localStorage === "object"
      ? (localStorage as any)
      : new InMemoryStorage()
  );
  const temporaryStore = new StorageStore(new InMemoryStorage());

  return new Backend(settings, store, temporaryStore);
};
