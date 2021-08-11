import React, { FC, memo } from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  Text,
  TextStyle
} from 'react-native';
import { Button } from 'react-native-paper';

import { colors, fontFamily, fonts } from 'src/constants';

export const REPText: FC<{
  style?: StyleProp<TextStyle>;
  bold?: boolean;
  size?: number;
  color?: string;
}> = ({ style, bold, color, size, children }) => {
  return (
    <Text
      style={[
        style || {},
        {
          fontFamily: bold ? fonts.bold : fonts.regular,
          fontSize: size || 14,
          color: color || colors.black
        }
      ]}>
      {children}
    </Text>
  );
};

// const S = StyleSheet.create({
//   link: {
//     textTransform: 'capitalize',
//     maxWidth: '100%',
//     height: 22,
//     alignContent: 'flex-end',
//     justifyContent: 'flex-end'
//   }
// });
