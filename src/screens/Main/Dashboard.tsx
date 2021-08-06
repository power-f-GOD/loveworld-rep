import React, { memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { dispatch, triggerSignout } from 'src/state';
import { mainStyles } from 'src/styles';
import { fonts, colors, space } from 'src/constants';
import { REPText } from 'src/components';
// import { NavigationContainer } from '@react-navigation/native';

// const Stack = createNativeStackNavigator();

const _Dashboard = () => {
  return (
    <ScrollView style={mainStyles.Tab}>
      <REPText
        style={[fonts.h1, { lineHeight: fonts.h1.fontSize + 5 }]}
        size={fonts.h1.fontSize}
        bold>
        Hi, Power!
      </REPText>
      <REPText>Welcome back!</REPText>
      <ScrollView
        contentContainerStyle={S.boxGrid}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToStart>
        <View style={[S.box, S.box1]}>
          <REPText
            style={S.boxText}
            size={fonts.h1.fontSize + 5}
            color={colors.white}
            bold>
            17
          </REPText>
          <View style={S.boxCircle}>
            {/* <REPText
              style={S.boxCircleText}
              size={fonts.h2.fontSize}
              color={colors.white}
              bold>
              R
            </REPText> */}
            <MaterialIcons
              name='view-dashboard'
              color={'white'}
              size={space.md}
              style={[S.boxIcon]}
            />
          </View>
        </View>

        <View style={[S.box, S.box2]}>
          <REPText
            style={S.boxText}
            size={fonts.h1.fontSize + 5}
            color={colors.white}
            bold>
            2
          </REPText>
          <View style={S.boxCircle}>
            <MaterialIcons
              name='database'
              color={'white'}
              size={space.md}
              style={[S.boxIcon]}
            />
          </View>
        </View>

        <View style={[S.box, S.box3]}>
          <REPText
            style={S.boxText}
            size={fonts.h1.fontSize + 5}
            color={colors.white}
            bold>
            8
          </REPText>
          <View style={S.boxCircle}>
            <MaterialIcons
              name='cash'
              color={'white'}
              size={space.md}
              style={[S.boxIcon]}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        mode='contained'
        color='black'
        style={{ marginTop: 10 }}
        onPress={() => {
          dispatch(triggerSignout());
        }}>
        LOGOUT
      </Button>
    </ScrollView>
  );
};

export const Dashboard = memo(_Dashboard);

const boxSize = 105;

const S = StyleSheet.create({
  boxGrid: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between'
  },
  box: {
    width: boxSize,
    height: boxSize,
    marginRight: space.xs,
    borderRadius: space.xs + 4,
    padding: space.xs,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1
  },
  box1: {
    backgroundColor: colors.red
  },
  box2: {
    backgroundColor: colors.green
  },
  box3: {
    backgroundColor: colors.purple,
    marginRight: 0
  },
  boxCircle: {
    position: 'absolute',
    bottom: -(space.xl / 2),
    right: -(space.xl / 2),
    width: space.xl,
    height: space.xl,
    borderRadius: space.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  boxText: {
    opacity: 0.9,
    left: 5
  },
  boxIcon: {
    alignSelf: 'center',
    position: 'absolute',
    left: '22%',
    top: '20%',
    opacity: 0.45
  }
});
