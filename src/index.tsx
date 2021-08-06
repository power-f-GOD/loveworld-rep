import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react';
// import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';

import { AuthProps } from 'src/types';
import { Login, Splash, Register, Main } from 'src/screens';
import { dispatch } from 'src/state/store';
import { auth } from 'src/state/actions';

const Stack = createNativeStackNavigator();

const _App: FC<{ auth: AuthProps }> = ({ auth: _auth }) => {
  const { authenticated, status: authStatus } = _auth;

  useEffect(() => {
    setTimeout(() => {
      dispatch(auth({ status: 'fulfilled' }));
    }, 2000);
  }, []);

  // if (authStatus !== 'fulfilled') {
  //   return <Splash />;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {(() => {
          if (authStatus !== 'fulfilled') {
            return (
              <Stack.Screen
                name='Splash'
                component={Splash}
                options={{
                  headerShown: false
                }}
              />
            );
          } else if (!authenticated) {
            return (
              <>
                <Stack.Screen
                  name='Login'
                  component={Login}
                  options={{
                    headerShown: false,
                    animation: 'slide_from_left'
                  }}
                />
                <Stack.Screen
                  name='Register'
                  component={Register}
                  options={{
                    headerShown: false,
                    animation: 'slide_from_left'
                  }}
                />
              </>
            );
          } else {
            return (
              <>
                <Stack.Screen
                  name='Main'
                  component={Main}
                  options={{
                    headerShown: false
                  }}
                />
              </>
            );
          }
        })()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect((state: { auth: AuthProps }) => ({ auth: state.auth }))(
  _App
);
