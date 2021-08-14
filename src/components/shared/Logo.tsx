import React, { FC } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, fonts, space } from 'src/constants';
import { REPAnimate } from './REPAnimate';
import { MainStackParamList } from 'src/types';
import { REPText } from './REPText';

export const Logo: FC<{
  style?: StyleProp<ViewStyle>;
  animate?: boolean;
  loopAnimation?: boolean;
  currentTab?: keyof MainStackParamList;
}> = ({ style, animate, currentTab, loopAnimation }) => {
  return (
    <View style={[S.Logo, style ? style : {}]}>
      <View style={S.boxGrid}>
        <REPAnimate
          style={S.box}
          type='scale'
          duration={500}
          noAnimate={!animate}
          magnitude={1.5}
          loop={loopAnimation}>
          <View style={[S.box, S.redBox, {}]} data-anim_delay={0} />
          <View style={[S.box, S.greenBox]} data-anim_delay={125} />
          <View style={[S.box, S.blueBox]} data-anim_delay={225} />
        </REPAnimate>
      </View>

      <View
        style={
          currentTab && currentTab !== 'Dashboard'
            ? {
                transform: [
                  { scale: 0.75 },
                  { translateX: -space.sm - 2 },
                  { translateY: -space.xs }
                ]
              }
            : undefined
        }>
        <REPAnimate
          noAnimate={!animate}
          direction='x'
          delay={0}
          magnitude={15}
          duration={500}>
          <REPText style={S.loveworld} size={12}>
            {currentTab && currentTab !== 'Dashboard' ? ' ' : 'LOVEWORLD'}
          </REPText>
          <REPText style={S.rep} size={40} bold>
            {currentTab && currentTab !== 'Dashboard' ? currentTab : 'REP'}
          </REPText>
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
    top: -4,
    left: -2,
    color: 'black',
    fontFamily: fonts.bold,
    height: 40
  }
});
