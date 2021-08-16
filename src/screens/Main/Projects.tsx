import React, { useCallback, FC, useMemo } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
  View
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { REPText } from 'src/components';
import { ProjectCard } from 'src/components/screens';
import {
  APIProjectsResponse,
  FetchState,
  REPStackScreenProps
} from 'src/types';
import { space, colors } from 'src/constants';
import { eventsStyles } from 'src/styles';

const _Projects: FC<
  { projects: FetchState<APIProjectsResponse> } & REPStackScreenProps<'Main'>
> = ({ projects }) => {
  const {
    data: projectsData,
    status: projectsStatus,
    err: projectsErred,
    statusText: projectsStatusText
  } = projects;

  const listKeyExtractor = useCallback((item) => item._id, []);

  const handleRenderProjects = useCallback(
    ({
      index: i,
      item: project
    }: ListRenderItemInfo<APIProjectsResponse[0]>) => {
      return <ProjectCard index={i} project={project} />;
    },
    []
  );

  return (
    <>
      {!projectsData?.length && (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {projectsStatus === 'pending' ? (
            <ActivityIndicator
              animating={projectsStatus === 'pending'}
              size={space.md}
              color={colors.purple}
            />
          ) : (
            <MaterialIcons
              name='folder-open-outline'
              color={colors.grey}
              size={space.md}
              style={eventsStyles.cardInfoIcon}
            />
          )}
          <REPText margin={space.xs} alignment='center'>
            {projectsStatus === 'pending'
              ? 'Fetching pending Projects... Kindly wait a moment.'
              : projectsErred
              ? `Something went wrong: ${projectsStatusText || '...'}`
              : 'No pending Projects at the moment.'}
          </REPText>
        </View>
      )}

      <FlatList
        data={projectsData}
        renderItem={handleRenderProjects}
        keyExtractor={listKeyExtractor}
      />
    </>
  );
};

export const Projects = connect(
  (state: { projects: FetchState<APIProjectsResponse> }) => ({
    projects: state.projects
  })
)(_Projects);
