import React, { FC, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { dispatch, fetchEvents, fetchProjects } from 'src/state';
import { mainStyles } from 'src/styles';
import { fonts, colors, space } from 'src/constants';
import { REPText, REPAnimate } from 'src/components';
import { connect } from 'react-redux';
import {
  UserData,
  FetchState,
  APIEventsResponse,
  APIProjectsResponse
} from 'src/types';

const _Dashboard: FC<{
  userData: UserData;
  numEvents: number;
  numProjects: number;
}> = ({ userData, numEvents, numProjects }) => {
  useEffect(() => {
    if (!numEvents) {
      dispatch(fetchEvents());
    }
  }, [numEvents]);

  useEffect(() => {
    if (!numProjects) {
      dispatch(fetchProjects());
    }
  }, [numProjects]);

  return (
    <ScrollView style={mainStyles.Tab}>
      <REPText
        style={[fonts.h1, { lineHeight: fonts.h1.fontSize + 5 }]}
        size={fonts.h1.fontSize}
        bold>
        Hi, {userData.full_name?.split(' ')[0] || '...'}!
      </REPText>
      <REPText>Welcome!</REPText>
      <ScrollView
        contentContainerStyle={S.boxGrid}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToStart>
        <REPAnimate>
          <View style={[S.box, S.box1]}>
            <REPText
              style={S.boxText}
              size={fonts.h1.fontSize + 5}
              color={colors.white}
              bold>
              0
            </REPText>
            <View
              style={{
                bottom: space.xs * 1.5,
                left: space.xs * 1.5,
                position: 'absolute',
                opacity: 0.85
              }}>
              <REPText
                lineHeight={space.xs * 2.5}
                size={14}
                color={colors.white}
                bold>
                Records
              </REPText>
              <REPText lineHeight={space.xs * 2} size={12} color={colors.white}>
                set
              </REPText>
            </View>

            <View style={S.boxCircle}>
              {/* <REPText
              style={S.boxCircleText}
              size={fonts.h2.fontSize}
              color={colors.white}
              bold>
              R
            </REPText> */}
              <MaterialIcons
                name='database'
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
              {numEvents}
            </REPText>
            <View
              style={{
                bottom: space.xs * 1.5,
                left: space.xs * 1.5,
                position: 'absolute',
                opacity: 0.85
              }}>
              <REPText
                lineHeight={space.xs * 2.5}
                size={14}
                color={colors.white}
                bold>
                Events
              </REPText>
              <REPText lineHeight={space.xs * 2} size={12} color={colors.white}>
                upcoming
              </REPText>
            </View>

            <View style={S.boxCircle}>
              <MaterialIcons
                name='calendar-month'
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
              {numProjects}
            </REPText>
            <View
              style={{
                bottom: space.xs * 1.5,
                left: space.xs * 1.5,
                position: 'absolute',
                opacity: 0.85
              }}>
              <REPText
                lineHeight={space.xs * 2.5}
                size={14}
                color={colors.white}
                bold>
                Projects
              </REPText>
              <REPText lineHeight={space.xs * 2} size={12} color={colors.white}>
                pending
              </REPText>
            </View>

            <View style={S.boxCircle}>
              <MaterialIcons
                name='cash'
                color={'white'}
                size={space.md}
                style={[S.boxIcon]}
              />
            </View>
          </View>
        </REPAnimate>
      </ScrollView>

      <REPText mt={space.sm} size={fonts.h3.fontSize}>
        Exploits Graph:
      </REPText>
      <View
        style={{
          height: space.xxl * 2.5,
          marginVertical: space.xs,
          backgroundColor: colors.white,
          borderRadius: space.xs,
          borderColor: '#ddd',
          borderWidth: 1,
          padding: space.sm,
          justifyContent: 'center'
        }}>
        <REPText bold alignment='center' color={colors.grey}>
          Displayed here will be a graph of Records you have set per time,
          Events you have participated in, and Projects you have sponsored per
          time
        </REPText>
      </View>
    </ScrollView>
  );
};

export const Dashboard = connect(
  (state: {
    userData: UserData;
    events: FetchState<APIEventsResponse>;
    projects: FetchState<APIProjectsResponse>;
  }) =>
    ({
      userData: state.userData,
      numEvents: state.events.data?.length,
      numProjects: state.projects.data?.length
    } as any)
)(_Dashboard);

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
