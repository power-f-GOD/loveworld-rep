import { USER_AUTHENTICATE, authState } from '../../constants';
import { AuthProps, ActionProps } from '../../types';

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
