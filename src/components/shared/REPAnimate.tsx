import React, { FC, Children, cloneElement, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View as MotiView } from 'moti';
import { space } from 'src/constants';

interface REPAnimateProps {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  direction?: 'x' | 'y';
  magnitude?: number;
  easing?: 'spring' | 'timing';
  type?: 'scale' | 'translate';
  delay?: number;
  duration?: number;
  noAnimate?: boolean;
  loop?: boolean;
}

const _REPAnimate: FC<REPAnimateProps> = ({
  style,
  contentStyle,
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

    const { style: childStyle } = child.props;
    const { animationDelay, animationDuration } = childStyle || {};
    const isX = direction === 'x';
    const isScale = type === 'scale';
    let childNewStyle = {};

    if ('0' in (childStyle || {})) {
      for (const [, _style] of Object.entries(childStyle)) {
        childNewStyle = { ...(_style || ({} as any)), ...childNewStyle };
      }
    } else {
      childNewStyle = { ...(childStyle || ({} as any)) };
    }

    if (contentStyle) {
      if ('0' in contentStyle) {
        for (const [, _style] of Object.entries(contentStyle)) {
          childNewStyle = { ...(_style || ({} as any)), ...childNewStyle };
        }
      } else {
        childNewStyle = { ...(contentStyle || ({} as any)), ...childNewStyle };
      }
    }

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
        {cloneElement(child, { style: childNewStyle })}
      </MotiView>
    );
  });
};

export const REPAnimate: FC<REPAnimateProps> = memo(_REPAnimate);
