import React, {
  useRef,
  useEffect,
  useState,
  FC,
  memo,
  useMemo,
  useCallback
} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle
} from 'react-native';
import { View as MotiView, useAnimationState } from 'moti';
import { colors, space, fonts, fontFamily } from 'src/constants';
import { REPText } from './REPText';

const _REPTextInput: FC<
  { [P in keyof TextInput['props']]: TextInput['props'][P] } & {
    label?: string;
    helperText?: string;
    err?: boolean;
    style?: StyleProp<ViewStyle>;
  }
> = ({
  onFocus,
  onBlur,
  onLayout,
  onKeyPress,
  err,
  style,
  value,
  label,
  helperText,
  ...props
}) => {
  const hasValue = !!value;
  const [height, setHeight] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const labelAnimState = useAnimationState({
    from: {
      translateY: height / 2 - 12
    },
    focused: {
      translateY: -11
    }
  });
  const helperTextAnimState = useAnimationState({
    from: {
      translateY: -35,
      opacity: 0.9
    },
    invalid: {
      translateY: 0,
      opacity: 1
    }
  });
  const viewStyle = useMemo(() => {
    return {
      ...S.wrapper,
      ...((style as any) || {}),
      backgroundColor: isFocused ? '#eee' : 'transparent',
      borderBottomWidth: isFocused ? 2 : 1,
      borderBottomColor: err ? colors.red : colors.black
    };
  }, [isFocused]);
  const labelStyle = useMemo(() => {
    return {
      ...S.label,
      backgroundColor: isFocused ? '#eee' : colors.white
    };
  }, [isFocused]);
  const inputStyle = useMemo(() => {
    return {
      ...S.input,
      backgroundColor: isFocused ? '#eee' : colors.white
    };
  }, [isFocused]);

  const handleViewLayout = useCallback(
    (e) => {
      if (onLayout) {
        onLayout(e);
      }

      setHeight(e.nativeEvent.layout.height);
    },
    [onLayout]
  );

  const handleInputFocus = useCallback(
    (e) => {
      if (onFocus) {
        onFocus(e);
      }

      setIsFocused(true);
    },
    [onFocus]
  );

  const handleInputBlur = useCallback(
    (e) => {
      if (onBlur) {
        onBlur(e);
      }

      setIsFocused(false);
    },
    [onBlur]
  );

  const handleInputKeypress = useCallback(
    (e) => {
      if (onKeyPress) {
        onKeyPress(e);
      }
    },
    [onKeyPress]
  );

  useEffect(() => {
    setTimeout(() => {
      labelAnimState.transitionTo(isFocused || hasValue ? 'focused' : 'from');
    }, 20);
  }, [isFocused, labelAnimState, hasValue]);

  useEffect(() => {
    setTimeout(() => {
      helperTextAnimState.transitionTo(!err ? 'from' : 'invalid');
    }, 20);
  }, [helperTextAnimState, err]);

  return (
    <View style={viewStyle} onLayout={handleViewLayout}>
      {label && (
        <MotiView
          pointerEvents='none'
          style={labelStyle}
          state={labelAnimState}
          transition={{ type: 'timing' as any, duration: 250 }}>
          <REPText color={err ? colors.red : colors.grey}>{label}</REPText>
        </MotiView>
      )}

      <TextInput
        {...props}
        style={inputStyle}
        value={value}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyPress={handleInputKeypress}
      />

      {helperText && (
        <MotiView
          style={{
            ...S.helperText,
            top: height
          }}
          state={helperTextAnimState}
          transition={{ type: 'timing', duration: 300 }}>
          <Text style={{ color: err ? colors.red : colors.black }}>
            {helperText}
          </Text>
        </MotiView>
      )}
    </View>
  );
};

export const REPTextInput = memo(_REPTextInput);

const S = StyleSheet.create({
  wrapper: {
    height: 45,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    maxWidth: 500,
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
    paddingLeft: space.xs + 6,
    paddingRight: space.xs + 6,
    ...fontFamily
  },
  label: {
    position: 'absolute',
    top: 0,
    left: space.sm - 10,
    justifyContent: 'center',
    backgroundColor: colors.white,
    color: colors.grey,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: space.sm,
    zIndex: 2,
    ...fontFamily
  },
  input: {
    alignSelf: 'center',
    height: '100%',
    padding: 0,
    paddingTop: 2,
    width: '100%',
    zIndex: 1,
    backgroundColor: 'white',
    ...fontFamily
  },
  helperText: {
    position: 'absolute',
    zIndex: 0,
    left: space.sm,
    ...fontFamily
  }
});
