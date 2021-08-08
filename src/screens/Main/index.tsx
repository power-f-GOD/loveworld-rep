import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { Appbar, FAB, Menu, Button } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { useAnimationState, MotiView } from 'moti';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';

import { Dashboard } from './Dashboard';
import { MainStackParamList, REPStackScreenProps, UserData } from 'src/types';
import { Records } from './Records';
import { Events } from './Events';
import { Projects } from './Projects';
import { Logo, REPText, REPAnimate, REPFAB } from 'src/components';
import { colors, space } from 'src/constants';
import {
  dispatch,
  displayModal,
  triggerSignout,
  displayActionSheet
} from 'src/state';

const Tab = createMaterialBottomTabNavigator();

const _Main: FC<REPStackScreenProps<'Main'> & { userData: UserData }> = ({
  userData
}) => {
  const [currentTab, setCurrentTab] = useState<keyof MainStackParamList>(
    'Dashboard'
  );
  const currentTabIsDash = currentTab === 'Dashboard';
  const is_admin = userData.is_admin;
  let barColor = colors.black;
  const [openMenu, setOpenMenu] = useState(false);
  const FABAnimState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0
    },
    to: {
      opacity: 1,
      scale: 1
    }
  });

  const handleActionPress = useCallback(
    (action: string) => {
      dispatch(displayActionSheet({ open: false }));
      dispatch(
        displayModal({
          open: true,
          title:
            action?.replace('a new ', '') ||
            (`${
              currentTab === 'Records' ? 'Add' : 'Create'
            } ${currentTab.replace(/s$/, '')}` as any),
          children: [
            <REPAnimate magnitude={0} key={0}>
              <REPText>COMING SOON!</REPText>
            </REPAnimate>
          ]
        })
      );
    },
    [currentTab]
  );

  const handleSetTargetPress = useCallback(() => {
    handleActionPress('Create a new Target');
  }, [handleActionPress]);

  const handleAddRecordPress = useCallback(() => {
    handleActionPress('Add a new Record');
  }, [handleActionPress]);

  const handleFABPress = useCallback(() => {
    dispatch(
      displayActionSheet({
        open: true,
        options: [
          <Button
            mode='text'
            onPress={handleSetTargetPress}
            style={{ width: '100%' }}
            contentStyle={{ height: '100%' }}>
            <REPText color={colors.black} bold>
              Set a new Target
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handleAddRecordPress}
            style={{ width: '100%' }}
            contentStyle={{ height: '100%' }}>
            <REPText color={colors.black} bold>
              Add a new Record
            </REPText>
          </Button>
        ],
        title: 'What would you like to do?'
      })
    );
  }, []);

  useEffect(() => {
    FABAnimState.transitionTo(
      currentTabIsDash || (!is_admin && currentTab !== 'Records')
        ? 'from'
        : 'to'
    );
  }, [currentTab, currentTabIsDash, is_admin]);

  switch (currentTab) {
    case 'Records':
      barColor = colors.red;
      break;
    case 'Events':
      barColor = colors.green;
      break;
    case 'Projects':
      barColor = colors.purple;
      break;
    default:
      barColor = colors.black;
  }

  return (
    <>
      <Appbar.Header style={{ marginTop: 0 }}>
        <Appbar.Content
          title={
            <Logo
              style={{
                transform: [{ scale: 0.6 }, { translateX: -10 }],
                marginLeft: 0
              }}
              currentTab={currentTab}
            />
          }
          style={{ paddingStart: 0 }}
        />
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        {is_admin && (
          <REPText color={colors.green} style={{ top: 2 }}>
            ADMIN
          </REPText>
        )}

        <Menu
          visible={openMenu}
          style={{ marginTop: space.md }}
          onDismiss={() => setOpenMenu(false)}
          anchor={
            <Appbar.Action
              icon='account-circle'
              onPress={() => setOpenMenu(true)}
            />
          }>
          {/* <Menu.Item onPress={() => {}} title='Item 2' /> */}
          {/* <Divider /> */}
          <Menu.Item
            onPress={() => dispatch(triggerSignout())}
            title='Log out'
            icon='logout'
          />
        </Menu>
      </Appbar.Header>

      <Tab.Navigator
        barStyle={{ backgroundColor: barColor }}
        screenListeners={{
          focus: (e: any) => {
            setTimeout(() => setCurrentTab(e.target.split('-')[0] || 0), 0);
          }
        }}>
        <Tab.Screen
          name='Dashboard'
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name='view-dashboard' color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name='Records'
          component={Records}
          options={{
            tabBarLabel: 'Records',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name='database' color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name='Events'
          component={Events}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name='calendar-month' color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name='Projects'
          component={Projects}
          options={{
            tabBarLabel: 'Projects',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name='cash' color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>

      <REPFAB
        currentTab={currentTab}
        currentTabIsDash={currentTabIsDash}
        barColor={barColor}
        is_admin={!!is_admin}
      />
    </>
  );
};

const S = StyleSheet.create({
  FABWrapper: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50
  }
});

export const Main = connect((state: { userData: UserData }) => ({
  userData: state.userData
}))(_Main);
