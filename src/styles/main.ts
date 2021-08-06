import { StyleSheet } from 'react-native';
import { colors, fonts } from 'src/constants';

export const mainStyles = StyleSheet.create({
  Tab: {
    backgroundColor: '#f4f4f4',
    padding: '4%'
  },
  h1: {
    ...fonts.h1,
    marginTop: 0
  }
});
