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
  UserData,
  APIEventsResponse
} from 'src/types';
import { Http, logHttpError } from 'src/utils';
import { displaySnackbar, setUserData } from './app';
import { EVENTS_FETCH } from 'src/constants/main';

export const fetchEvents = () => (dispatch: (arg: any) => {}) => {
  dispatch(events({ status: 'pending', err: false }));

  Http.get<APIEventsResponse>('/event/current', true)
    .then(({ data, message }) => {
      if (!data) {
        return dispatch(
          displaySnackbar({
            message: `Events: ${message}`,
            open: true,
            severity: 'info'
          })
        );
      }

      dispatch(events({ status: 'fulfilled', err: !data, data: data || [] }));
    })
    .catch(logHttpError(events));
};

export const events = (
  payload: FetchState<APIEventsResponse>
): ActionProps<FetchState<APIEventsResponse>> => {
  return {
    type: EVENTS_FETCH,
    payload
  };
};
