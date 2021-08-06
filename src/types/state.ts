export interface AuthProps {
  authenticated?: boolean;
  status?: 'settled' | 'pending' | 'fulfilled';
}
