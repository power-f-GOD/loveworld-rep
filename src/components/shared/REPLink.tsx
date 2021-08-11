import React, { FC, memo } from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';

import { colors, fontFamily, fonts } from 'src/constants';
import { REPText } from './';

export const REPLink: FC<{
  style?: StyleProp<TextStyle>;
  color?: string;
  bold?: boolean;
  size?: number;
  onPress(): void;
}> = ({ style, color, size, bold, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  );
};
