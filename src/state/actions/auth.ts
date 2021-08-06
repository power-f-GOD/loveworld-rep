import * as SecureStore from 'expo-secure-store';
import { USER_AUTHENTICATE, USER_SIGNIN, USER_SIGNOUT } from 'src/constants';
import { AuthProps, ActionProps, HttpStatusProps } from 'src/types';
import { dispatch } from '../store';

export const verifyAuth = () => (dispatch: Function) => {
  dispatch(auth({ status: 'pending' }));

  const verify = async () => {
    let userToken: string | null;

    try {
      userToken = await SecureStore.getItemAsync('userToken');

      // if (userToken) {
      //   // http.token = userData.token!;
      //   dispatch(auth({ status: 'fulfilled', isAuthenticated: true }));
      //   // dispatch(signin({ status: 'fulfilled', err: false }));
      // } else {
      //   dispatch(auth({ status: 'fulfilled', isAuthenticated: false }));
      //   // dispatch(signin({ status: 'fulfilled', err: true }));
      // }

      dispatch(auth({ status: 'fulfilled', authenticated: !!userToken }));
      dispatch(signin({ status: 'fulfilled', err: !userToken }));
    } catch (e) {
      // Restoring token failed
    }
  };

  verify();
};

export const auth = (payload: AuthProps): ActionProps<AuthProps> => {
  return {
    type: USER_AUTHENTICATE,
    payload
  };
};

export const triggerSignin = (payload?: HttpStatusProps) => () => {
  dispatch(auth({ status: 'pending' }));
  setTimeout(() => {
    dispatch(auth({ status: 'fulfilled', authenticated: true }));
  }, 2000);
};

export const signin = (
  payload: HttpStatusProps
): ActionProps<HttpStatusProps> => {
  return {
    type: USER_SIGNIN,
    payload
  };
};

export const triggerRegister = (payload?: HttpStatusProps) => () => {
  dispatch(auth({ status: 'pending' }));
  setTimeout(() => {
    dispatch(auth({ status: 'fulfilled', authenticated: true }));
  }, 2000);
};

export const triggerSignout = () => () => {
  dispatch(signout({ status: 'fulfilled' }));
};

export const signout = (
  payload: HttpStatusProps
): ActionProps<HttpStatusProps> => {
  dispatch(auth({ authenticated: false }));

  return {
    type: USER_SIGNOUT,
    payload
  };
};
