import { AuthProps } from 'src/types/state';
import { APIOrgQueryResponse, FetchState } from 'src/types';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNOUT = 'USER_SIGNOUT';
export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD';
export const USER_AUTHENTICATE = 'USER_AUTHENTICATE';
export const USER_VERITY_AUTH = 'USER_VERITY_AUTH';

export const ORGANIZATIONS_FETCH = 'ORGANIZATIONS_FETCH';

export const authState: AuthProps = {
  status: 'settled',
  authenticated: false,
  err: false
};

export const orgsState: FetchState<APIOrgQueryResponse> = {
  data: [],
  status: 'settled',
  err: false,
  statusText: ''
};
