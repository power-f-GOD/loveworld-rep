import { StyleSheet } from 'react-native';
import { colors, space } from 'src/constants';

export const authStyles = StyleSheet.create({
  Auth: {
    backgroundColor: colors.white,
    height: '100%',
    padding: '10%',
    paddingBottom: 0
  },
  logoWrapper: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1
  },
  h1: {
    lineHeight: 36,
    marginTop: 50
  },
  input: {
    marginTop: 35
  },
  inputFirstOfType: {
    marginTop: 50
  },
  forgotPassword: {
    textTransform: 'capitalize',
    top: 10,
    right: -15,
    marginBottom: 10,
    width: '60%',
    height: 20,
    alignContent: 'flex-end',
    justifyContent: 'flex-end'
  },
  churchWrapper: {
    marginTop: 20
  },
  church: {
    backgroundColor: 'transparent',
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    padding: 0
  },
  actionButton: {
    marginTop: 60
  },
  actionButtonRider: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 25,
    marginBottom: '15%',
    justifyContent: 'center'
  },
  actionButtonRiderLink: {
    marginStart: space.xxs
  }
});
