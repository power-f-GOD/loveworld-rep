import { DISPLAY_SNACK_BAR, USER_DATA, DISPLAY_MODAL } from 'src/constants';
import {
  ActionProps,
  REPSnackbarProps,
  UserData,
  REPModalProps
} from 'src/types';

export const displaySnackbar = (
  payload: REPSnackbarProps
): ActionProps<REPSnackbarProps> => {
  return {
    type: DISPLAY_SNACK_BAR,
    payload
  };
};

export const displayModal = (
  payload: REPModalProps
): ActionProps<REPModalProps> => {
  return {
    type: DISPLAY_MODAL,
    payload
  };
};

export const setUserData = (payload: UserData): ActionProps<UserData> => {
  return {
    type: USER_DATA,
    payload
  };
};
