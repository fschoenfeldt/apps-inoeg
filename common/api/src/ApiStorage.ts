// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

export class ApiStorage implements Storage {
  constructor(protected prefix: string) {}

  /** Returns the current value associated with the given key, or null if the given key does not exist. */
  public getItem(key: string): string | null {
    const item = this.adapter.getItem(this.pre(key));

    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(error);

        return null;
      }
    }

    return null;
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removeItem(key: string): void {
    return this.adapter.removeItem(this.pre(key));
  }
  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public setItem(key: string, value: string): void {
    try {
      this.adapter.setItem(this.pre(key), JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  public key(index: number): string | null {
    return this.adapter.key(index);
  }

  public clear() {
    return this.adapter.clear();
  }

  public get length() {
    return this.adapter.length;
  }

  protected pre(key: string): string {
    return `${this.prefix}::${key}`;
  }

  protected get adapter(): Storage {
    return localStorage;
  }

  // [name: string]: any;
}
