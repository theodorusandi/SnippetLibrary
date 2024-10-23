import Cookies from "js-cookie";

export enum CookeStorageKey {
  CSRF_TOKEN = "csrf token",
  BEARER_TOKEN = "bearer token",
}

export enum LocalStorageKey {
  USER = "user",
}

interface BrowserStorage<K> {
  get(key: K): string | null;
  set(key: K, value: string): string | null;
  remove(key: K): void;
}

class CookieStorage implements BrowserStorage<CookeStorageKey> {
  get(key: CookeStorageKey) {
    return Cookies.get(key) ?? null;
  }
  set(key: CookeStorageKey, value: string) {
    return Cookies.set(key, value) ?? null;
  }
  remove(key: CookeStorageKey): void {
    Cookies.remove(key);
  }
}

export const cookieStorage =  new CookieStorage() 

class LocalStorage implements BrowserStorage<LocalStorageKey> {
  get(key: LocalStorageKey) {
    return localStorage.getItem(key);
  }
  set(key: LocalStorageKey, value: string) {
    localStorage.setItem(key, value);
    return this.get(key);
  }
  remove(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}

export const persistentStorage = new LocalStorage();
