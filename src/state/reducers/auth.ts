import {
  USER_AUTHENTICATE,
  authState,
  orgsState,
  ORGANIZATIONS_FETCH
} from 'src/constants';
import {
  AuthProps,
  ActionProps,
  APIOrgQueryResponse,
  FetchState
} from 'src/types';

export const auth = (
  state: AuthProps = authState,
  action: ActionProps<AuthProps>
) => {
  if (action.type === USER_AUTHENTICATE) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
};

export const organizations = (
  state: FetchState<APIOrgQueryResponse> = orgsState,
  action: ActionProps<FetchState<APIOrgQueryResponse>>
): FetchState<APIOrgQueryResponse> => {
  return action.type === ORGANIZATIONS_FETCH
    ? { ...state, ...action.payload }
    : state;
};
