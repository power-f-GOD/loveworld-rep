import * as SecureStore from 'expo-secure-store';
import {
  USER_AUTHENTICATE,
  USER_SIGNIN,
  USER_SIGNOUT,
  ORGANIZATIONS_FETCH
} from 'src/constants';
import {
  AuthProps,
  ActionProps,
  HttpStatusProps,
  APIBaseResponse,
  APIAuthResponse,
  SigninProps,
  RegisterProps,
  APIOrgQueryResponse,
  FetchState,
  UserData
} from 'src/types';
import { Http, logHttpError } from 'src/utils';
import { displaySnackbar, setUserData } from './app';

export const verifyAuth = () => (dispatch: Function) => {
  dispatch(auth({ status: 'pending' }));

  const verify = async () => {
    let accessToken: string | null;
    let userData: UserData;

    try {
      accessToken = await SecureStore.getItemAsync('accessToken');
      userData = JSON.parse((await SecureStore.getItemAsync('userData')) || '');
      Http.token = accessToken;

      dispatch(auth({ status: 'fulfilled', authenticated: !!accessToken }));
      dispatch(signin({ status: 'fulfilled', err: !accessToken }));
      dispatch(setUserData(userData));
    } catch (e) {
      // Restoring token failed
      dispatch(auth({ status: 'settled', err: true }));
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

export const triggerSignin = (payload: SigninProps) => (
  dispatch: (arg: any) => {}
) => {
  dispatch(auth({ status: 'pending', err: false }));
  dispatch(setUserData(payload));

  Http.post<APIAuthResponse>('/auth/login', payload)
    .then(({ data, message }) => {
      dispatch(auth({ status: 'fulfilled', authenticated: !!data }));

      if (!data) {
        return dispatch(
          displaySnackbar({ message: `Login: ${message}`, open: true })
        );
      }

      SecureStore.setItemAsync('accessToken', data.access_token);
      SecureStore.setItemAsync('userData', JSON.stringify(data.user));
      Http.token = data.access_token;
      dispatch(setUserData(data.user));
      dispatch(fetchAccount());
      dispatch(
        displaySnackbar({
          message: `Welcome back, ${data.user.full_name?.split(' ')[0]}!`,
          open: true,
          severity: 'success'
        })
      );
    })
    .catch(logHttpError(auth));
};

export const signin = (
  payload: HttpStatusProps
): ActionProps<HttpStatusProps> => {
  return {
    type: USER_SIGNIN,
    payload
  };
};

export const triggerRegister = (payload: RegisterProps) => (
  dispatch: (arg: any) => {}
) => {
  dispatch(auth({ status: 'pending', err: false }));
  dispatch(setUserData({ ...payload, organization: {} }));

  Http.post<APIAuthResponse>('/auth/register', payload)
    .then(({ data, message }) => {
      dispatch(auth({ status: 'fulfilled', authenticated: !!data }));

      if (!data) {
        return dispatch(
          displaySnackbar({ message: `Registration: ${message}`, open: true })
        );
      }

      SecureStore.setItemAsync('accessToken', data.access_token);
      SecureStore.setItemAsync('userData', JSON.stringify(data.user));
      Http.token = data.access_token;
      dispatch(setUserData(data.user));
      dispatch(fetchAccount());
      dispatch(
        displaySnackbar({
          message: `Welcome to REP, ${data.user.full_name?.split(' ')[0]}!`,
          open: true,
          severity: 'success'
        })
      );
    })
    .catch(logHttpError(auth));
};

export const fetchAccount = () => (dispatch: (arg: any) => {}) => {
  dispatch(signin({ status: 'pending', err: false }));

  Http.get<APIAuthResponse>('/auth/account', true)
    .then(({ data, message }) => {
      dispatch(signin({ status: 'fulfilled', err: !data }));

      if (!data) {
        return dispatch(
          displaySnackbar({
            message: `Account: ${message}`,
            open: true,
            severity: 'info'
          })
        );
      }

      const userData = {
        ...data.user,
        is_admin: data.user._id === data.user.organization?.admin
      };

      SecureStore.setItemAsync('userData', JSON.stringify(userData));
      dispatch(setUserData(userData));
    })
    .catch(logHttpError(signin));
};

export const triggerSignout = () => (dispatch: (arg: any) => {}) => {
  Http.token = null;
  SecureStore.deleteItemAsync('accessToken');
  dispatch(signout());
};

export const signout = (): ActionProps<HttpStatusProps> => {
  return {
    type: USER_SIGNOUT
  };
};

export const fetchOrganizations = (keyword?: string) => (
  dispatch: (arg: any) => {}
) => {
  if (!keyword?.trim()) {
    return;
  }

  dispatch(organizations({ status: 'pending', err: false }));

  Http.get<APIOrgQueryResponse>(`/org/query?keyword=${keyword || ''}`)
    .then(({ data, message }) => {
      dispatch(
        organizations({ status: 'fulfilled', err: !data, data: data || [] })
      );

      if (!data) {
        dispatch(
          displaySnackbar({ message: `Church: ${message}`, open: true })
        );
      }
    })
    .catch(logHttpError(organizations));
};

export const organizations = (
  payload: FetchState<APIOrgQueryResponse>
): ActionProps<FetchState<APIOrgQueryResponse>> => {
  return {
    type: ORGANIZATIONS_FETCH,
    payload
  };
};
