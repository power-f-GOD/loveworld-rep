import {
  REPSnackbarProps,
  UserData,
  REPModalProps,
  REPActionSheetProps
} from 'src/types';

export const APIBaseURL = 'http://lw-rep-jarvis.herokuapp.com';
export const DISPLAY_SNACK_BAR = 'DISPLAY_SNACK_BAR';
export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const DISPLAY_ACTION_SHEET = 'DISPLAY_ACTION_SHEET';
export const USER_DATA = 'USER_DATA';

export const userDataState: UserData = {
  _id: '',
  email: '',
  full_name: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  created_at: '',
  organization: {},
  updated_at: ''
};

export const snackbarState: REPSnackbarProps = {
  open: false,
  message: ' ',
  severity: 'info',
  duration: 4000
  // autoHide: false
};

export const modalState: REPModalProps = {
  title: '',
  open: false,
  children: [],
  fade: false,
  full: true
};

export const actionSheetState: REPActionSheetProps = {
  open: false,
  options: [],
  title: '',
  cancelIndex: -1,
  destructiveIndex: -1
};

export const colors = {
  red: '#c22',
  green: '#2a2',
  purple: 'purple',
  white: 'white',
  black: '#222',
  grey: 'grey',
  warning: 'gold',
  success: 'green',
  error: '#d00',
  info: '#333',
  orange: 'rgb(255, 167, 0)',
  yellow: 'rgb(255, 244, 0)',
  lime: 'rgb(163, 255, 0)'
};

export const space = {
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 32,
  lg: 64,
  xl: 96,
  xxl: 128
};

export const fonts = {
  regular: 'Poppins_400Regular',
  bold: 'Poppins_700Bold',
  h1: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold'
  },
  h2: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold'
  },
  h3: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold'
  },
  h4: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold'
  }
};

export const fontFamily = {
  fontFamily: fonts.regular
};
