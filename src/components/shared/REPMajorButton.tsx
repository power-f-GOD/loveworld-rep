import React, { FC, memo, useMemo } from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

import { colors, space } from 'src/constants';
import { REPText } from './REPText';

export const REPButton: FC<{
  style?: StyleProp<ViewStyle>;
  onPress(): void;
}> = ({ style, onPress, children }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={useMemo(() => [S.wrapper, style || {}], [])}>
        <REPText
          style={useMemo(
            () => ({ marginTop: space.xs + 2, alignSelf: 'center' }),
            []
          )}
          color={colors.white}>
          {children}
        </REPText>
        <View style={S.rectGrid}>
          <View style={useMemo(() => [S.rect, S.rect1], [])}></View>
          <View style={useMemo(() => [S.rect, S.rect2], [])}></View>
          <View style={useMemo(() => [S.rect, S.rect3], [])}></View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const S = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.black,
    borderRadius: space.xs,
    overflow: 'hidden'
  },
  rectGrid: {
    height: 4,
    flexDirection: 'row',
    marginTop: space.xs - 2
  },
  rect: {
    height: '100%',
    flex: 1
  },
  rect1: {
    backgroundColor: colors.red
  },
  rect2: {
    backgroundColor: colors.green
  },
  rect3: {
    backgroundColor: colors.purple
  }
});
