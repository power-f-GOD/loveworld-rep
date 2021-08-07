import React, { useState, FC } from 'react';
import { View, ScrollView } from 'react-native';

import {
  Logo,
  REPAnimate,
  REPTextInput,
  REPButton,
  REPText,
  REPLink
} from 'src/components';
import { fonts, space } from 'src/constants';
import { REPStackScreenProps, UserData } from 'src/types';
import { dispatch, triggerSignin, displaySnackbar } from 'src/state';
import { authStyles } from 'src/styles';
import { connect } from 'react-redux';

export const _Login: FC<
  REPStackScreenProps<'Login'> & { userData: UserData }
> = ({ navigation, userData }) => {
  const [email, setEmail] = useState('' || userData.email);
  const [password, setPassword] = useState('' || userData.password);

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
            onChangeText={(email) => setEmail(email.toLowerCase())}
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
              if (email && password) {
                return dispatch(triggerSignin({ email, password }));
              }

              dispatch(
                displaySnackbar({
                  open: true,
                  message: 'Input email and password.'
                })
              );
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

export const Login = connect((state: { userData: UserData }) => ({
  userData: state.userData
}))(_Login);
