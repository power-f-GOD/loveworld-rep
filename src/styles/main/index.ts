import { StyleSheet } from 'react-native';
import { fonts } from 'src/constants';

export const mainStyles = StyleSheet.create({
  Tab: {
    backgroundColor: '#ededed',
    padding: '4%'
  },
  h1: {
    ...fonts.h1,
    marginTop: 0
  }
});

export * from './events';
