// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

// we use all digits and alphabetic characters except o, l, 1 & 0 (as they can be easily confused)
const b32 = "abcdefghijkmnpqrstuvwxyz23456789";

// converts a buffer to our base-32 representation
export const buf2base32 = (buffer: ArrayBuffer) => {
  const array = new Uint8Array(buffer);

  let base32 = "";
  let pos = 0;

  while (true) {
    const b = Math.floor(pos / 8);

    if (b >= array.length) {
      break;
    }

    let v = (array[b] >> pos % 8) & 31;

    // this number wraps into the next byte
    if (pos % 8 > 3 && b < array.length - 1) {
      v |= (array[b + 1] & (0xff >> (11 - (pos % 8)))) << (8 - (pos % 8));
    }

    base32 += b32[v];
    pos += 5;
  }

  // we check that the decoding works. For some buffer lengths values with
  // leading 0's don't convert properly. Technically we can also check that
  // the last bits are not producing an ambiguous result but checking the
  // decoding works as expected is a good idea anyway, so we just do that...
  const bb = base322buf(base32);

  if (bb.length != array.length) {
    throw "conversion error (length)";
  }

  for (let i = 0; i < bb.length; i++) {
    if (bb[i] != array[i]) {
      throw "conversion error (value)";
    }
  }

  return base32;
};

export function base322buf(base32: string) {
  const bytes = [];

  let pos = 0;
  let b = 0;

  base32 = base32.toLowerCase().replace(/[^a-kmnp-z2-9]/g, "");

  for (const c of base32) {
    const i = b32.indexOf(c);

    b |= (i << pos % 8) & 0xff;

    if (pos % 8 >= 3) {
      // this wraps into the next byte
      bytes.push(b);

      b = i >> (8 - (pos % 8));
    }

    pos += 5;
  }

  // we can't know if there's an additional 0 value, so we omit it if it's 0
  // that might be problematic for keys that actually have 0 values...
  if (pos - (5 % 8) > 3 && b != 0) {
    bytes.push(b);
  }

  return new Uint8Array(bytes);
}
