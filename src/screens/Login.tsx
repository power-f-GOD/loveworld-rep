import React, { useRef, useEffect, useState, FC } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TextInput,
  ScrollView
} from 'react-native';
import { View as MotiView } from 'moti';
import { Button } from 'react-native-paper';

import {
  Logo,
  REPAnimate,
  REPTextInput,
  REPButton,
  REPText,
  REPLink
} from 'src/components';
import { colors, fonts, space } from 'src/constants';
import { REPStackScreenProps } from 'src/types';
import { dispatch, signin, auth, triggerSignin } from 'src/state';
import { authStyles } from 'src/styles';

export const Login: FC<REPStackScreenProps<'Login'>> = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={authStyles.Auth}>
      <Logo />

      <ScrollView showsVerticalScrollIndicator={false}>
        <REPAnimate noAnimate>
          <REPText style={authStyles.h1} size={fonts.h1.fontSize} bold>
            Login
          </REPText>
          <REPText>Welcome! Let's meet on the other side.</REPText>

          <REPTextInput
            label='Email'
            value={email}
            style={{ marginTop: 50 }}
            onChangeText={(email) => setEmail(email)}
          />

          <REPTextInput
            label='Password'
            value={password}
            secureTextEntry={true}
            style={{
              marginTop: 35
            }}
            onChangeText={(password) => setPassword(password)}
          />

          {/* <REPLink
            style={{
              fontFamily: fonts.regular,
              alignSelf: 'flex-end',
              marginTop: 20
            }}
            onPress={() => {}}>
            Forgot Password?
          </REPLink> */}

          <REPButton
            style={{ marginTop: 130 }}
            onPress={() => {
              dispatch(triggerSignin());
            }}>
            LOGIN
          </REPButton>

          <View style={authStyles.actionButtonRider}>
            <REPText>New beloved?</REPText>
            <REPLink
              bold
              style={{ marginStart: space.xxs }}
              onPress={() => navigation.navigate('Register' as any)}>
              Register here.
            </REPLink>
          </View>
        </REPAnimate>
      </ScrollView>
    </View>
  );
};
