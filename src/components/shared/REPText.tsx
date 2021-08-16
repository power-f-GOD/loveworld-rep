import React, { FC, useMemo } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import { colors, fonts } from 'src/constants';

export const REPText: FC<{
  style?: StyleProp<TextStyle>;
  bold?: boolean;
  size?: number;
  alignment?: 'left' | 'center' | 'right';
  lineHeight?: number;
  color?: string;
  italic?: boolean;
  margin?: number;
  my?: number;
  mx?: number;
  ms?: number;
  me?: number;
  mt?: number;
  mb?: number;
}> = ({
  margin,
  my,
  mx,
  me,
  ms,
  mt,
  mb,
  style: _style,
  bold,
  color,
  size,
  alignment,
  lineHeight,
  children,
  italic
}) => {
  let style = {};

  if ('0' in (_style || {})) {
    for (const [, __style] of Object.entries(_style || {})) {
      style = { ...(__style || ({} as any)), ...style };
    }
  } else {
    style = { ...(_style || ({} as any)) };
  }

  return (
    <Text
      style={useMemo(
        () =>
          ({
            ...(style || ({} as Record<string, any>)),
            fontFamily: bold ? fonts.bold : fonts.regular,
            fontSize: size || 14,
            color: color || colors.black,
            fontStyle: italic ? 'italic' : 'normal',
            ...(lineHeight ? { lineHeight } : {}),
            ...(alignment ? { textAlign: alignment } : {}),
            ...(margin !== undefined ? { margin } : {}),
            ...(my !== undefined ? { marginVertical: my } : {}),
            ...(mx !== undefined ? { marginHorizontal: mx } : {}),
            ...(mb !== undefined ? { marginBottom: mb } : {}),
            ...(mt !== undefined ? { marginTop: mt } : {}),
            ...(me !== undefined ? { marginEnd: me } : {}),
            ...(ms !== undefined ? { marginStart: ms } : {})
          } as StyleProp<TextStyle>),
        [color, size, bold]
      )}>
      {children}
    </Text>
  );
};
