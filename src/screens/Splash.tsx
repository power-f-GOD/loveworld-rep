import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Logo } from 'src/components';
import { colors, space } from 'src/constants';

export const Splash = () => {
  return (
    <View style={S.Splash}>
      <View>
        <Logo style={S.logo} animate loopAnimation />
      </View>
    </View>
  );
};

const S = StyleSheet.create({
  Splash: {
    height: '100%',
    padding: space.md,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.white
  },
  logo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    alignSelf: 'center',
    transform: [
      { scale: 1.25 },
      { translateY: -50 }
      // {
      //   translateX: (Dimensions.get('window').width - padding.md * 2) / 4
      // },
      // {
      //   translateY: (Dimensions.get('window').height - padding.md * 2) / 4
      // }
    ]
  }
});
