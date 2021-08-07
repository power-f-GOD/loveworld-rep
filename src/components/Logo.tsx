import React, { FC } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, fonts } from 'src/constants';
import { REPAnimate } from './REPAnimate';

export const Logo: FC<{
  style?: StyleProp<ViewStyle>;
  animate?: boolean;
  loopAnimation?: boolean;
}> = ({ style, animate, loopAnimation }) => {
  return (
    <View style={[S.Logo, style ? style : {}]}>
      <View style={S.boxGrid}>
        <REPAnimate
          style={S.box}
          type='scale'
          delay={100}
          duration={500}
          noAnimate={!animate}
          magnitude={1.5}
          loop={loopAnimation}>
          <View style={[S.box, S.redBox]} />
          <View style={[S.box, S.greenBox]} />
          <View style={[S.box, S.blueBox]} />
        </REPAnimate>
      </View>

      <View>
        <REPAnimate
          noAnimate={!animate}
          direction='x'
          delay={0}
          magnitude={15}
          duration={500}>
          <Text style={S.loveworld}>LOVEWORLD</Text>
          <Text style={S.rep}>REP</Text>
        </REPAnimate>
      </View>
    </View>
  );
};

const boxSize = 10;

const S = StyleSheet.create({
  Logo: {
    flexDirection: 'row',
    opacity: 1,
    color: 'black'
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid'
  },
  boxGrid: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: boxSize,
    marginRight: 6,
    top: 5
  },
  box: {
    height: boxSize,
    width: boxSize,
    position: 'absolute',
    borderRadius: 1.5
  },
  redBox: {
    backgroundColor: colors.red,
    top: (boxSize + 6.25) * 0
  },
  greenBox: {
    backgroundColor: colors.green,
    top: (boxSize + 6.25) * 1
  },
  blueBox: {
    backgroundColor: colors.purple,
    top: (boxSize + 6.25) * 2
  },
  loveworld: {
    fontSize: 12,
    color: 'black'
  },
  rep: {
    fontSize: 40,
    lineHeight: 45,
    left: -2,
    color: 'black',
    fontFamily: fonts.bold,
    height: 40
  }
});
