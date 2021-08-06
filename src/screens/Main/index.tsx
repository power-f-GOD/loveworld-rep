import React, { FC, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomNavigation, Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { dispatch, triggerSignout } from 'src/state';
import { Dashboard } from './Dashboard';
import { MainStackParamList, REPStackScreenProps } from 'src/types';
import { Records } from './Records';
import { Events } from './Events';
import { Projects } from './Projects';
import { Logo } from 'src/components';
import { colors } from 'src/constants';

const Tab = createMaterialBottomTabNavigator();

export const Main: FC<REPStackScreenProps<'Main'>> = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState<keyof MainStackParamList>(
    'Dashboard'
  );
  let barColor = colors.black;

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
        {/* <Appbar.Action icon='dots-vertical' onPress={() => {}} /> */}
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
    </>
  );
};
