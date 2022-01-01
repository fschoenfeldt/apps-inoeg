// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

export const formatSecret = (secret: string) => {
  const parts = secret.match(/.{1,4}/g);

  if (parts === null) {
    return secret;
  }

  return parts.join("  ");
};
