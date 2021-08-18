import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { useAnimationState } from 'moti';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Dashboard } from './Dashboard';
import { MainStackParamList, REPStackScreenProps, UserData } from 'src/types';
import { Records } from './Records';
import { Projects } from './Projects';
import { Logo, REPText, REPFAB } from 'src/components';
import { colors, space, fonts } from 'src/constants';
import { dispatch, triggerSignout } from 'src/state';
import { Events } from './Events';

const Tab = createMaterialTopTabNavigator();

const _Main: FC<REPStackScreenProps<'Main'> & { userData: UserData }> = ({
  userData
}) => {
  const is_admin = userData.is_admin;
  let barColor = colors.black;
  const [currentTab, setCurrentTab] = useState<keyof MainStackParamList>(
    'Dashboard'
  );
  const [openMenu, setOpenMenu] = useState(false);
  const currentTabIsDash = currentTab === 'Dashboard';
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
  const screenListeners = useMemo(() => {
    return {
      tabPress: (e: any) => {
        setTimeout(
          () => setCurrentTab(e.target.split('-')[0] || 'Dashboard'),
          0
        );
      },
      focus: (e: any) => {
        const tab = e.target.split('-')[0] || 'Dashboard';

        if (tab !== currentTab) {
          setCurrentTab(tab);
        }
      }
    };
  }, [currentTab]);

  const screenOptions = useCallback(
    (tabBarLabel: keyof MainStackParamList, iconName: string) => {
      return {
        tabBarLabel,
        tabBarIcon: ({ color }: any) => (
          <MaterialIcons name={iconName} color={color} size={26} />
        )
      };
    },
    []
  );

  const dashboardOptions = useMemo(
    () => screenOptions('Dashboard', 'view-dashboard'),
    [screenOptions]
  );
  const recordsOptions = useMemo(() => screenOptions('Records', 'database'), [
    screenOptions
  ]);
  const eventsOptions = useMemo(
    () => screenOptions('Events', 'calendar-month'),
    [screenOptions]
  );
  const projectsOptions = useMemo(() => screenOptions('Projects', 'cash'), [
    screenOptions
  ]);

  useEffect(() => {
    FABAnimState.transitionTo(
      currentTabIsDash || (!is_admin && currentTab !== 'Records')
        ? 'from'
        : 'to'
    );
  }, [currentTabIsDash, is_admin]);

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
      barColor = colors.white;
  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={currentTabIsDash ? colors.white : barColor}
        translucent={true}
        barStyle={currentTabIsDash ? 'dark-content' : 'light-content'}
        showHideTransition='slide'
      />
      <Appbar.Header
        style={useMemo(
          () => ({ marginTop: 0, backgroundColor: colors.white }),
          []
        )}>
        <Appbar.Content
          title={
            <Logo
              style={useMemo(
                () => ({
                  transform: [
                    { scale: 0.6 },
                    { translateX: -10 },
                    { translateY: 4 }
                  ],
                  marginLeft: 0
                }),
                []
              )}
              currentTab={currentTab}
            />
          }
          style={useMemo(() => ({ paddingStart: 0 }), [])}
        />
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        {is_admin && (
          <REPText color={colors.green} style={{ top: 2 }}>
            ADMIN
          </REPText>
        )}

        <Menu
          visible={openMenu}
          style={useMemo(() => ({ marginTop: space.md }), [])}
          onDismiss={useCallback(() => setOpenMenu(false), [])}
          anchor={
            <Appbar.Action
              icon='account-circle'
              onPress={useCallback(() => setOpenMenu(true), [])}
            />
          }>
          {/* <Menu.Item onPress={() => {}} title='Item 2' /> */}
          {/* <Divider /> */}
          <Menu.Item
            onPress={useCallback(() => dispatch(triggerSignout()), [])}
            title='Log out'
            icon='logout'
          />
        </Menu>
      </Appbar.Header>

      <Tab.Navigator
        barStyle={useMemo(() => ({ backgroundColor: colors.white }), [])}
        tabBarPosition='bottom'
        // initialRouteName='Events'
        screenOptions={useMemo(
          () => ({
            tabBarItemStyle: {
              maxHeight: 65,
              paddingTop: space.xs * 0.75,
              paddingBottom: 0
            },
            tabBarLabelStyle: {
              fontSize: 10,
              textTransform: 'capitalize',
              fontFamily: fonts.regular
            },
            tabBarIndicatorStyle: {
              backgroundColor: currentTabIsDash ? colors.black : colors.white
            },
            tabBarPressColor: colors.white,
            tabBarBounces: true,
            tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.3)',
            tabBarActiveTintColor: currentTabIsDash ? colors.black : barColor
            // lazy: true
          }),
          [currentTabIsDash, barColor]
        )}>
        <Tab.Screen
          name='Dashboard'
          component={Dashboard}
          options={dashboardOptions}
          listeners={screenListeners}
        />
        <Tab.Screen
          name='Records'
          component={Records}
          options={recordsOptions}
          listeners={screenListeners}
        />
        <Tab.Screen
          name='Events'
          component={Events}
          options={eventsOptions}
          listeners={screenListeners}
        />
        <Tab.Screen
          name='Projects'
          component={Projects}
          options={projectsOptions}
          listeners={screenListeners}
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

export const Main = connect((state: { userData: UserData }) => ({
  userData: state.userData
}))(_Main);
