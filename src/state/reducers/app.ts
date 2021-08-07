import {
  REPSnackbarProps,
  ActionProps,
  UserData,
  REPModalProps
} from 'src/types';
import {
  snackbarState,
  DISPLAY_SNACK_BAR,
  userDataState,
  USER_DATA,
  DISPLAY_MODAL,
  modalState
} from 'src/constants';

export const snackbar = (
  state: REPSnackbarProps = snackbarState,
  action: ActionProps<REPSnackbarProps>
): REPSnackbarProps => {
  return action.type === DISPLAY_SNACK_BAR
    ? { ...state, duration: undefined, ...action.payload }
    : state;
};

export const modal = (
  state: REPModalProps = modalState,
  action: ActionProps<REPModalProps>
): REPModalProps => {
  return action.type === DISPLAY_MODAL
    ? { ...state, ...action.payload }
    : state;
};

export const userData = (
  state: UserData = userDataState,
  action: ActionProps<UserData>
) => {
  if (action.type === USER_DATA) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
};
