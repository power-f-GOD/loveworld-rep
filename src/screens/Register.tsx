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
import {
  dispatch,
  signin,
  auth,
  triggerSignin,
  triggerRegister
} from 'src/state';
import { authStyles } from 'src/styles';

export const Register: FC<REPStackScreenProps<'Register'>> = ({
  navigation
}) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={authStyles.Auth}>
      <Logo />

      <ScrollView showsVerticalScrollIndicator={false}>
        <REPAnimate noAnimate>
          <REPText style={authStyles.h1} size={24} bold>
            Register
          </REPText>
          <REPText>Welcome! Join your Church now.</REPText>

          <REPTextInput
            label='Full name'
            value={fullname}
            style={{ marginTop: 50 }}
            onChangeText={(text) => setFullname(text)}
          />

          <REPTextInput
            label='Email'
            value={email}
            style={{ marginTop: 35 }}
            onChangeText={(text) => setEmail(text)}
          />

          <REPTextInput
            label='Password'
            value={password}
            secureTextEntry={true}
            style={{ marginTop: 35 }}
            onChangeText={(text) => setPassword(text)}
          />

          <REPButton
            style={{ marginTop: 50 }}
            onPress={() => {
              dispatch(triggerRegister());
            }}>
            REGISTER
          </REPButton>

          <View style={authStyles.actionButtonRider}>
            <REPText>Already a member?</REPText>
            <REPLink
              bold
              style={{ marginStart: space.xxs }}
              onPress={() => navigation.navigate('Login' as any)}>
              Login here.
            </REPLink>
          </View>
        </REPAnimate>
      </ScrollView>
    </View>
  );
};
