import {
  DISPLAY_SNACK_BAR,
  USER_DATA,
  DISPLAY_MODAL,
  DISPLAY_ACTION_SHEET
} from 'src/constants';
import {
  ActionProps,
  REPSnackbarProps,
  UserData,
  REPModalProps,
  REPActionSheetProps
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

export const displayActionSheet = (
  payload: REPActionSheetProps
): ActionProps<REPActionSheetProps> => {
  return {
    type: DISPLAY_ACTION_SHEET,
    payload
  };
};

export const setUserData = (payload: UserData): ActionProps<UserData> => {
  return {
    type: USER_DATA,
    payload
  };
};
