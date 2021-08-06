export interface HttpStatusProps {
  status?: 'settled' | 'pending' | 'fulfilled';
  err?: boolean;
  statusText?: string;
}

export interface ActionProps<T> {
  type: string;
  payload?: T;
}
