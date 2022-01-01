// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Buffer } from "buffer";

export const buf2hex = (buffer: Buffer) => {
  return buffer.toString("hex");
};

export const b642buf = (base64: string) => {
  return Buffer.from(base64);
};

export const getHexId = (id: string) => {
  return buf2hex(b642buf(id));
};

export const str2ab = (string: string) => {
  return Buffer.from(new TextEncoder().encode(string));
};
