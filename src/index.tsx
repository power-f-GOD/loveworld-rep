import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState, useCallback } from 'react';
// import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { Snackbar, Portal, Modal, Text, Searchbar } from 'react-native-paper';

import { AuthProps, REPSnackbarProps, REPModalProps } from 'src/types';
import { Login, Splash, Register, Main } from 'src/screens';
import { dispatch } from 'src/state/store';
import {
  auth,
  displaySnackbar,
  displayModal,
  fetchOrganizations,
  verifyAuth
} from 'src/state/actions';
import { colors, space, fonts } from 'src/constants';
import { REPAnimate, REPModal } from './components';
import { REPSnackbar } from './components/REPSnackbar';
import { REPActionSheet } from './components/REPActionSheet';

const Stack = createNativeStackNavigator();

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
