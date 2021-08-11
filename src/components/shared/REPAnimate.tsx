import React, { FC, Children } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View as MotiView } from 'moti';
import { space } from 'src/constants';

export const REPAnimate: FC<{
  style?: StyleProp<ViewStyle>;
  direction?: 'x' | 'y';
  magnitude?: number;
  easing?: 'spring' | 'timing';
  type?: 'scale' | 'translate';
  delay?: number;
  duration?: number;
  noAnimate?: boolean;
  loop?: boolean;
}> = ({
  style,
  direction,
  duration,
  magnitude,
  type,
  easing,
  delay,
  noAnimate,
  loop,
  children
}) => {
  return Children.map(children, (child: any, i) => {
    if (!child?.props) return child;

    const { animationDelay, animationDuration } = child.props.style || {};
    const isX = direction === 'x';
    const isScale = type === 'scale';

    return (
      <MotiView
        style={style || {}}
        from={{
          opacity: noAnimate ? 1 : 0,
          [isScale ? 'scale' : isX ? 'translateX' : 'translateY']: noAnimate
            ? isScale
              ? 1
              : 0
            : magnitude !== undefined
            ? magnitude
            : isScale
            ? 1.5
            : space.lg
        }}
        animate={{
          opacity: 1,
          [isScale ? 'scale' : isX ? 'translateX' : 'translateY']: isScale
            ? 1
            : 0
        }}
        transition={{
          type: easing || 'timing',
          delay:
            animationDelay !== undefined
              ? animationDelay
              : (delay || 0) + 125 * i,
          duration:
            animationDuration !== undefined
              ? animationDuration
              : duration !== undefined
              ? duration
              : 350,
          loop
        }}>
        {child}
      </MotiView>
    );
  });
};
