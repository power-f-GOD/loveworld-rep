import React, { FC, memo } from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';

import { REPAnimate, REPText } from 'src/components';
import { MainInfo } from '../__commons/MainInfo';
import { eventsStyles } from 'src/styles';
import { space, colors, fonts } from 'src/constants';
import { Actions } from '../__commons/Actions';
import { SharedElement } from 'react-navigation-shared-element';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { APIEventsResponse, APIProjectsResponse } from 'src/types';

interface ProjectDetailsRouteProps {
  project: APIProjectsResponse[0];
  imageSrc: ImageSourcePropType;
}

const _ProjectDetails: FC<{
  navigation: StackNavigationProp<
    {
      ProjectDetails: ProjectDetailsRouteProps;
    },
    'ProjectDetails'
  >;
  route: RouteProp<
    { ProjectDetails: ProjectDetailsRouteProps },
    'ProjectDetails'
  >;
}> = ({ navigation, route }) => {
  const project = route.params?.project;
  const imageSrc = route?.params.imageSrc;

  if (!project) {
    return null;
  }

  return (
    <View
      style={{
        paddingVertical: space.xs * 1.5,
        backgroundColor: colors.white,
        height: '100%'
      }}>
      <REPAnimate
        magnitude={space.xs}
        delay={0}
        contentStyle={{ paddingHorizontal: space.xs }}>
        <REPText size={fonts.h2.fontSize} mb={space.xs} bold>
          {project.title}
        </REPText>

        <MainInfo project={project} />

        <REPText
          // size={fonts.h2.fontSize}
          mt={space.xs}
          style={{ marginBottom: space.xxs }}>
          {project.details}
        </REPText>

        <SharedElement
          id={`project.${project._id}.banner`}
          style={{
            minHeight: 250,
            marginVertical: space.xs * 1.5,
            paddingHorizontal: 0
          }}>
          <Image
            style={[
              eventsStyles.cardBanner,
              {
                width: '100%',
                height: '100%'
              }
            ]}
            source={imageSrc}
          />
        </SharedElement>

        <Actions project={project} onDetailsScreen={true} imageSrc={imageSrc} />

        <REPText size={space.xs + 4} my={space.sm} color={colors.grey}>
          Comments will appear below...
        </REPText>
      </REPAnimate>
    </View>
  );
};

export const ProjectDetails = memo(_ProjectDetails);
