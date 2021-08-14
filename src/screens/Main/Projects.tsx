import React, { useCallback, FC } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { connect } from 'react-redux';

import { REPText } from 'src/components';
import { ProjectCard } from 'src/components/screens';
import {
  APIProjectsResponse,
  FetchState,
  REPStackScreenProps
} from 'src/types';

const _Projects: FC<
  { projects: FetchState<APIProjectsResponse> } & REPStackScreenProps<'Main'>
> = ({ projects }) => {
  const { data: projectsData, status: projectsStatus } = projects;

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
        <REPText>
          {projectsStatus === 'pending'
            ? 'Fetching current projects... Please, wait a moment.'
            : 'No projects at the moment.'}
        </REPText>
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
