import React, { memo, useCallback, FC } from 'react';
import {
  ScrollView,
  FlatList,
  ImageSourcePropType,
  ListRenderItemInfo
} from 'react-native';

import { mainStyles } from 'src/styles';
import { REPText } from 'src/components';
import { fonts } from 'src/constants';
import {
  APIProjectsResponse,
  FetchState,
  REPStackScreenProps
} from 'src/types';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'src/components/screens/__commons/Card';
import { connect } from 'react-redux';

const _Projects: FC<
  { projects: FetchState<APIProjectsResponse> } & REPStackScreenProps<'Main'>
> = ({ projects }) => {
  const { data: projectsData, status: projectsStatus } = projects;
  const navigation = useNavigation();

  const listKeyExtractor = useCallback((item) => item._id, []);

  const handleProjectDetailsPress = useCallback(
    (project: APIProjectsResponse[0], imageSrc: ImageSourcePropType) => () => {
      navigation.navigate('ProjectDetails', { project, imageSrc });
      // dispatch(
      //   displayModal({
      //     open: true,
      //     title: `Event: ${event.title}` as any,
      //     children: [
      //       <REPAnimate magnitude={space.xs} key='0'>
      //         <MainInfo event={event} />

      //         <Image
      //           style={[
      //             eventsStyles.cardBanner,
      //             {
      //               width: '100%',
      //               minHeight: 200,
      //               marginVertical: space.sm
      //             }
      //           ]}
      //           source={imageSrc}
      //         />

      //         <REPText size={space.xs + 4} color={colors.grey}>
      //           More info and actions would appear here...
      //         </REPText>
      //       </REPAnimate>
      //     ]
      //   })
      // );
    },
    []
  );

  const handleRenderProjects = useCallback(
    ({
      index: i,
      item: project
    }: ListRenderItemInfo<APIProjectsResponse[0]>) => {
      return (
        <Card
          index={i}
          project={project}
          handleProjectDetailsPress={handleProjectDetailsPress}
        />
      );
    },
    [handleProjectDetailsPress]
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
