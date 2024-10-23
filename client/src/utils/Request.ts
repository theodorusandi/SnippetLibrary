/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";
import { CookeStorageKey, cookieStorage } from "./BrowserStorage";


class Request {
  private static async setCSRFToken() {
    if (!cookieStorage.get(CookeStorageKey.CSRF_TOKEN)) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}csrf/get`);
        cookieStorage.set(CookeStorageKey.CSRF_TOKEN, res.data.token);
      } catch (err) {
        console.error(`Failed to set CSRF token. `, err);
      }
    }
  }

  static async get<T>(url: string): Promise<T> {
    const token = cookieStorage.get(CookeStorageKey.BEARER_TOKEN);
    try {
      const res = await axios.get(url, {
        headers: {
          ...(token && { Authorization: `Token ${token}` }),
        },
      });
      return res.data;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  static async post<T>(url: string, data: T) {
    await this.setCSRFToken();
    const token = cookieStorage.get(CookeStorageKey.BEARER_TOKEN);
    try {
      const res = await axios.post(url, data, {
        headers: {
          "X-CSRFToken": cookieStorage.get(CookeStorageKey.CSRF_TOKEN),
          ...(token && { Authorization: `Token ${token}` }),
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default Request;
