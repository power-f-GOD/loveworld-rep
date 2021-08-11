import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import React, { FC, useEffect } from 'react';
// import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import { AuthProps, REPSnackbarProps } from 'src/types';
import { Login, Splash, Register, Main } from 'src/screens';
import { dispatch } from 'src/state/store';
import { verifyAuth } from 'src/state/actions';
import { REPModal, REPSnackbar, REPActionSheet } from './components';
import { EventDetails } from './components/screens/Events/EventDetails';

enableScreens();

const Stack = createSharedElementStackNavigator();

const _App: FC<{
  auth: AuthProps;
  snackbarMessage: string;
}> = ({ auth: _auth, snackbarMessage }) => {
  const { authenticated, status: authStatus, err: authErr } = _auth;

  useEffect(() => {
    dispatch(verifyAuth());
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            snackbarMessage?.includes('Register') ? 'Register' : undefined
          }>
          {(() => {
            if (authStatus === 'pending' && !authErr) {
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
                      headerShown: false
                      // animation: 'slide_from_left'
                    }}
                  />
                  <Stack.Screen
                    name='Register'
                    component={Register}
                    options={{
                      headerShown: false
                      // animation: 'slide_from_left'
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
                  <Stack.Screen
                    name='EventDetails'
                    component={EventDetails}
                    options={{
                      title: 'Event Details'
                      // headerShown: false
                    }}
                  />
                </>
              );
            }
          })()}
        </Stack.Navigator>
      </NavigationContainer>

      <REPSnackbar />
      <REPModal />
      <REPActionSheet />
    </>
  );
};

export default connect(
  (state: { auth: AuthProps; snackbar: REPSnackbarProps }) =>
    ({
      auth: state.auth,
      snackbarMessage: state.snackbar.message
    } as any)
)(_App);
