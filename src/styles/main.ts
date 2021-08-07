import { StyleSheet } from 'react-native';
import { fonts } from 'src/constants';

export const mainStyles = StyleSheet.create({
  Tab: {
    backgroundColor: '#f2f2f2',
    padding: '4%'
  },
  h1: {
    ...fonts.h1,
    marginTop: 0
  }
});
