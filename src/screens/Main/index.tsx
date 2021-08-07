import React, { FC, useState, useEffect } from 'react';
import { Appbar, FAB, Menu } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Dashboard } from './Dashboard';
import { MainStackParamList, REPStackScreenProps, UserData } from 'src/types';
import { Records } from './Records';
import { Events } from './Events';
import { Projects } from './Projects';
import { Logo, REPText, REPAnimate } from 'src/components';
import { colors, space } from 'src/constants';
import { connect } from 'react-redux';
import { useAnimationState, MotiView } from 'moti';
import { dispatch, displayModal, triggerSignout } from 'src/state';

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

      <MotiView
        state={FABAnimState}
        pointerEvents={currentTabIsDash ? 'none' : undefined}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 50
        }}
        transition={{ type: 'timing', duration: 300 }}>
        <FAB
          style={{
            backgroundColor: barColor
          }}
          icon='plus'
          onPress={() =>
            dispatch(
              displayModal({
                open: true,
                title: `${
                  currentTab === 'Records' ? 'Add' : 'Create'
                } ${currentTab.replace(/s$/, '')}` as any,
                children: [
                  <REPAnimate magnitude={0} key={0}>
                    <REPText>COMING SOON!</REPText>
                  </REPAnimate>
                ]
              })
            )
          }
        />
      </MotiView>
    </>
  );
};

export const Main = connect((state: { userData: UserData }) => ({
  userData: state.userData
}))(_Main);
