import { ReactNode } from 'react';
import { APIAuthResponse } from '.';

export type UserData = APIAuthResponse['user'] & {
  password?: string;
  is_admin?: boolean;
};

export interface HttpStatusProps {
  status?: 'settled' | 'pending' | 'fulfilled';
  err?: boolean;
  statusText?: string;
}

export interface FetchState<T, T2 = any> extends HttpStatusProps {
  data?: T;
  extra?: T2;
}

export interface ActionProps<T> {
  type: string;
  payload?: T;
}

export interface APIBaseResponse<T> {
  message?: string;
  data?: T;
}

export interface REPSnackbarProps {
  open?: boolean;
  message?: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
  duration?: number;
  label?: string;
}

export interface REPModalProps {
  open?: boolean;
  children?: ReactNode[];
  title?: 'Find Church' | 'Modal';
}
