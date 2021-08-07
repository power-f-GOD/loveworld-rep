import { REPSnackbarProps, UserData, REPModalProps } from 'src/types';

export const APIBaseURL = 'http://lw-rep-jarvis.herokuapp.com';
export const DISPLAY_SNACK_BAR = 'DISPLAY_SNACK_BAR';
export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const USER_DATA = 'USER_DATA';

export const userDataState: UserData = {
  _id: '',
  email: '',
  full_name: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  created_at: '',
  organization: '',
  updated_at: ''
};

export const snackbarState: REPSnackbarProps = {
  open: false,
  message: ' ',
  severity: 'info',
  duration: 5000
  // autoHide: false
};

export const modalState: REPModalProps = {
  open: false,
  children: []
};

export const colors = {
  red: '#d22',
  green: '#2a2',
  purple: 'purple',
  white: 'white',
  black: '#111',
  grey: 'grey',
  warning: 'gold',
  success: 'green',
  error: '#d00',
  info: '#333'
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
