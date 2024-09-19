import axios, { AxiosRequestConfig } from 'axios';
import { get, isEmpty, isNil } from 'lodash';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export class Api {
  static async get(path: string, params: any = {}) {
    let query = '';
    if (params) {
      query = '?';
      const keys = Object.keys(params);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = params[key];
        if (typeof value !== 'object') {
          query += `${key}=${encodeURIComponent(params[key])}`;
        } else if (Array.isArray(value)) {
          query += `${key}=${encodeURIComponent(value.join(','))}`;
        }

        if (i < keys.length - 1) {
          query += '&';
        }
      }
    }

    try {
      const requestPath = BASE_URL + path + query;
      const response = await axios.get(requestPath, { withCredentials: true });
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  static async post(path: string, params: any = {}) {
    try {
      const response = await axios.post(BASE_URL + path, params, {
        withCredentials: true
      });
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  static async put(path: string, params: any = {}) {
    try {
      const response = await axios.put(BASE_URL + path, params, {
        withCredentials: true
      });
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  static async delete(path: string, params: any = null) {
    try {
      const response = await axios.delete(BASE_URL + path, {
        data: params,
        withCredentials: true
      });
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
