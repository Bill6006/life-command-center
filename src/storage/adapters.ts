import { cloneState } from "../state/model";
import { INDEXED_DB_KEYS } from "./keys";

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  keys(): string[];
}

export interface IndexedStateStore {
  get<T>(key: string): Promise<T | null>;
  put<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class BrowserLocalStorageStore implements KeyValueStore {
  constructor(private readonly storage: Storage = window.localStorage) {}

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  keys() {
    return Array.from({ length: this.storage.length }, (_, index) => this.storage.key(index)).filter(
      (key): key is string => key !== null
    );
  }
}

export class MemoryKeyValueStore implements KeyValueStore {
  private readonly values = new Map<string, string>();

  constructor(initial: Record<string, string> = {}) {
    for (const [key, value] of Object.entries(initial)) this.values.set(key, value);
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  keys() {
    return [...this.values.keys()];
  }

  snapshot() {
    return Object.fromEntries(this.values);
  }
}

export class MemoryIndexedStateStore implements IndexedStateStore {
  protected readonly values = new Map<string, unknown>();

  async get<T>(key: string): Promise<T | null> {
    const value = this.values.get(key);
    return value === undefined ? null : cloneState(value as T);
  }

  async put<T>(key: string, value: T): Promise<void> {
    this.values.set(key, cloneState(value));
  }

  async delete(key: string): Promise<void> {
    this.values.delete(key);
  }

  async clear(): Promise<void> {
    this.values.clear();
  }

  snapshot() {
    return cloneState(Object.fromEntries(this.values));
  }
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed."));
  });
}

function transactionComplete(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error ?? new Error("IndexedDB transaction aborted."));
    transaction.onerror = () => reject(transaction.error ?? new Error("IndexedDB transaction failed."));
  });
}

export class BrowserIndexedStateStore implements IndexedStateStore {
  private databasePromise: Promise<IDBDatabase> | null = null;

  constructor(
    private readonly factory: IDBFactory = window.indexedDB,
    private readonly databaseName: string = INDEXED_DB_KEYS.database,
    private readonly storeName: string = INDEXED_DB_KEYS.store
  ) {}

  private open(): Promise<IDBDatabase> {
    if (this.databasePromise) return this.databasePromise;
    this.databasePromise = new Promise((resolve, reject) => {
      const request = this.factory.open(this.databaseName, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(this.storeName)) {
          request.result.createObjectStore(this.storeName);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed."));
    });
    return this.databasePromise;
  }

  async get<T>(key: string): Promise<T | null> {
    const database = await this.open();
    const transaction = database.transaction(this.storeName, "readonly");
    const value = await requestResult(transaction.objectStore(this.storeName).get(key));
    await transactionComplete(transaction);
    return value === undefined ? null : (value as T);
  }

  async put<T>(key: string, value: T): Promise<void> {
    const database = await this.open();
    const transaction = database.transaction(this.storeName, "readwrite");
    transaction.objectStore(this.storeName).put(value, key);
    await transactionComplete(transaction);
  }

  async delete(key: string): Promise<void> {
    const database = await this.open();
    const transaction = database.transaction(this.storeName, "readwrite");
    transaction.objectStore(this.storeName).delete(key);
    await transactionComplete(transaction);
  }

  async clear(): Promise<void> {
    const database = await this.open();
    const transaction = database.transaction(this.storeName, "readwrite");
    transaction.objectStore(this.storeName).clear();
    await transactionComplete(transaction);
  }
}
