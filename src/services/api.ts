import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { navigate } from '@reach/router';

const baseURL = process.env.REAC_APP_API_URL;

const api = axios.create({
  baseURL,
});

export interface RequestResponse<T> {
  data: T[];
  meta?: {
    totalRecords?: number;
    page?: {
      totalRecords?: number;
    };
  };
}

export interface RequestResponseSingle<T> {
  data: T;
}
class Api {
  public static get<T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> {
    return api.get<T, AxiosResponse<T>>(url, config);
  }

  public static post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return api.post<T, AxiosResponse>(url, data, config);
  }

  public static put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return api.put<T, AxiosResponse>(url, data, config);
  }

  public static patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return api.patch<T, AxiosResponse>(url, data, config);
  }

  public static remove<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return api.delete<T, AxiosResponse>(url, config);
  }

  public static setAuthorizationToken(token: string): void {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('@Mobiliza:token');
      localStorage.removeItem('@Mobiliza:user');
      localStorage.removeItem('@Mobiliza:refreshToken');
      navigate('/login');
    }
    return Promise.reject(err);
  },
);

export default Api;
