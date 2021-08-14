import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import React, { FC, useEffect } from 'react';
// import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import {
  TransitionPresets,
  createStackNavigator
} from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { AuthProps, REPSnackbarProps } from 'src/types';
import { Login, Splash, Register, Main } from 'src/screens';
import { dispatch } from 'src/state/store';
import { verifyAuth } from 'src/state/actions';
import { REPModal, REPSnackbar, REPActionSheet } from './components';
import { colors, fontFamily, fonts, space } from './constants';
import { EventDetails } from './components/screens/Events/EventDetails';
import { EventInvite } from './components/screens/Events/EventInvite';
import { ProjectDetails } from './components/screens/Projects/ProjectDetails';

enableScreens();

const Stack = createStackNavigator();
// createNativeStackNavigator();
// createSharedElementStackNavigator();

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
      <StatusBar
        animated={true}
        backgroundColor={colors.black}
        translucent={true}
        // barStyle={'light-content'}
        showHideTransition='slide'
        // hidden={true}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            snackbarMessage?.includes('Register') ? 'Register' : undefined
          }
          screenOptions={
            {
              // gestureEnabled: false
              // cardOverlayEnabled: true,
              // cardStyle: { backgroundColor: 'transparent' }
            }
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

                      // animation: 'slide_from_left',
                    }}
                  />
                  <Stack.Screen
                    name='Register'
                    component={Register}
                    options={{
                      headerShown: false,
                      gestureEnabled: true,
                      // animation: 'slide_from_left'
                      // ...TransitionPresets.ModalPresentationIOS
                      ...TransitionPresets.RevealFromBottomAndroid
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
                      title: 'Event Details',
                      headerStyle: {
                        backgroundColor: colors.green
                      },
                      headerTitleStyle: {
                        color: colors.white,
                        fontFamily: fonts.regular,
                        fontWeight: '500',
                        fontSize: fonts.h3.fontSize,
                        marginTop: space.xxs,
                        left: -space.sm
                      },
                      headerTintColor: 'white',
                      // gestureEnabled: false,
                      ...TransitionPresets.SlideFromRightIOS
                    }}
                    // sharedElementsConfig={(route, otherRoute, showing) => {
                    //   const { event } = route.params;

                    //   return [
                    //     `event.${event._id}.banner`,
                    //     `event.${event._id}.title`,
                    //     `event.${event._id}.info`,
                    //     `event.${event._id}.actions`
                    //   ];
                    // }}
                  />
                  <Stack.Screen
                    name='EventInvite'
                    component={EventInvite}
                    options={{
                      title: 'Event: Invite',
                      headerStyle: {
                        backgroundColor: colors.green
                      },
                      headerTitleStyle: {
                        color: colors.white,
                        fontFamily: fonts.regular,
                        fontWeight: '500',
                        fontSize: fonts.h3.fontSize,
                        marginTop: space.xxs,
                        left: -space.sm
                      },
                      headerTintColor: 'white',
                      gestureEnabled: true,
                      ...TransitionPresets.ModalSlideFromBottomIOS
                    }}
                  />
                  <Stack.Screen
                    name='ProjectDetails'
                    component={ProjectDetails}
                    options={{
                      title: 'Project Details',
                      headerStyle: {
                        backgroundColor: colors.purple
                      },
                      headerTitleStyle: {
                        color: colors.white,
                        fontFamily: fonts.regular,
                        fontWeight: '500',
                        fontSize: fonts.h3.fontSize,
                        marginTop: space.xxs,
                        left: -space.sm
                      },
                      headerTintColor: 'white',
                      // gestureEnabled: false,
                      ...TransitionPresets.SlideFromRightIOS
                    }}
                    // sharedElementsConfig={(route, otherRoute, showing) => {
                    //   const { event } = route.params;

                    //   return [
                    //     `event.${event._id}.banner`,
                    //     `event.${event._id}.title`,
                    //     `event.${event._id}.info`,
                    //     `event.${event._id}.actions`
                    //   ];
                    // }}
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
