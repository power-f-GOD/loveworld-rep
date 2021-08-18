import React, { FC, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';

import { dispatch, fetchEvents, fetchProjects } from 'src/state';
import { mainStyles } from 'src/styles';
import { fonts } from 'src/constants';
import { REPText } from 'src/components';
import { connect } from 'react-redux';
import {
  UserData,
  FetchState,
  APIEventsResponse,
  APIProjectsResponse
} from 'src/types';
import { REPSummary, ExploitsGraph } from 'src/components/screens/Dashboard';
import { RecentActivity } from 'src/components/screens/Dashboard/RecentActivity';

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
        style={useMemo(
          () => [fonts.h1, { lineHeight: fonts.h1.fontSize + 5 }],
          []
        )}
        size={fonts.h1.fontSize}
        bold>
        Hi, {userData.full_name?.split(' ')[0] || '...'}!
      </REPText>
      <REPText>Welcome!</REPText>

      <REPSummary />
      <ExploitsGraph />
      <RecentActivity />
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
