import React, { FC, useMemo } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native';

import { colors, fonts } from 'src/constants';

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
        style={useMemo(
          () => [
            style || {},
            {
              fontFamily: bold ? fonts.bold : fonts.regular,
              fontSize: size || 14,
              color: color || colors.black
            }
          ],
          [color]
        )}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
