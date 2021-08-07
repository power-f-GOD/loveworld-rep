import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { APIBaseResponse } from 'src/types';
import { APIBaseURL } from 'src/constants';
import { dispatch } from 'src/state/store';
import { displaySnackbar } from 'src/state/actions/app';

export class Http {
  static token: string | null = null;

  private static returnRequestConfig(
    method: 'GET' | 'POST',
    url: string,
    requiresAuth?: boolean,
    data?: any,
    contentType?: string
  ): AxiosRequestConfig {
    return {
      url: `${APIBaseURL}${url}`,
      method,
      headers: {
        ...(requiresAuth ? { Authorization: `Bearer ${this.token}` } : {}),
        'Content-Type': contentType || 'application/json'
      },
      data,
      validateStatus: (status) => (!/^(2|3|4)/.test(`${status}`) ? false : true)
    };
  }

  /**
   *
   * @param url url of destination e.g. /profile/5df9e8t0wekc/posts ... Base URL should not be included
   * @param requiresAuth if token/authentication will be required for the get action
   */
  static async get<T>(url: string, requiresAuth?: boolean) {
    const response: AxiosResponse<APIBaseResponse<T>> = await axios(
      Http.returnRequestConfig('GET', url, requiresAuth)
    );

    return Promise.resolve({ ...response.data });
  }

  /**
   *
   * @param url (relative) url of destination e.g. /profile/5df9e8t0wekc/posts ... Base URL should not be included
   * @param data data to be posted to destination
   * @param requiresAuth that is if token/authentication will be required for the get action
   */
  static async post<T, T2 = any>(
    url: string,
    data?: T2,
    requiresAuth?: boolean,
    contentType?: string
  ) {
    const response: AxiosResponse<APIBaseResponse<T>> = await axios(
      Http.returnRequestConfig('POST', url, requiresAuth, data, contentType)
    );

    return Promise.resolve({ ...response.data });
  }
}

export const logHttpError = (action: any) => (error: Error) => {
  let message = /network|connect|internet/i.test(error.message)
    ? 'A network error occurred. Check your internet connection'
    : error.message;

  dispatch(
    action({
      status: 'settled',
      err: true
    })
  );
  dispatch(
    displaySnackbar({
      open: true,
      // message: navigator.onLine
      //   ? `${message[0].toUpperCase()}${message.slice(1)}.`
      //   : 'You are offline.',
      // severity:
      //   navigator.onLine && !/network|connect|internet/i.test(message)
      //     ? 'error'
      //     : 'info'
      message: `${message[0].toUpperCase()}${message.slice(1)}.`,
      severity: 'info'
    })
  );

  if (process.env.NODE_ENV === 'development') {
    console.error('An error occured: ', error);
  }
};
