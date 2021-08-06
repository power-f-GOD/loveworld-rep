import { AuthProps } from 'src/types/state';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNOUT = 'USER_SIGNOUT';
export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD';
export const USER_AUTHENTICATE = 'USER_AUTHENTICATE';
export const USER_VERITY_AUTH = 'USER_VERITY_AUTH';

export const authState: AuthProps = {
  status: 'settled',
  authenticated: false
};
