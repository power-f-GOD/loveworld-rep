import React, { FC, memo, useMemo } from 'react';
import { Image, ImageSourcePropType, ScrollView, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ProjectInfo, ProjectActions } from 'src/components/screens/Projects';
import { REPAnimate, REPText, Comment } from 'src/components/shared';
import { eventsStyles } from 'src/styles';
import { space, colors, fonts } from 'src/constants';
import { APIProjectsResponse } from 'src/types';

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
}> = ({ route }) => {
  const project = route.params?.project;
  const imageSrc = route?.params.imageSrc;

  if (!project) {
    return null;
  }

  return (
    <ScrollView
      style={useMemo(
        () => ({
          paddingVertical: space.xs * 1.5,
          backgroundColor: colors.white,
          height: '100%'
        }),
        []
      )}>
      <REPAnimate
        magnitude={space.xs}
        delay={0}
        contentStyle={useMemo(
          () => ({ paddingHorizontal: space.xs * 1.5 }),
          []
        )}>
        <REPText size={fonts.h2.fontSize} bold>
          {project.title}
        </REPText>

        <ProjectInfo project={project} />

        <REPText
          // size={fonts.h2.fontSize}
          mt={space.xs}
          mb={space.xxs}>
          {project.details}
        </REPText>

        <SharedElement
          id={`project.${project._id}.banner`}
          style={useMemo(
            () => ({
              minHeight: 250,
              marginVertical: space.xs * 1.5,
              paddingHorizontal: 0
            }),
            []
          )}>
          <Image
            style={useMemo(
              () => [
                eventsStyles.cardBanner,
                {
                  width: '100%',
                  height: '100%'
                }
              ],
              []
            )}
            source={imageSrc}
          />
        </SharedElement>

        <View>
          <ProjectActions
            project={project}
            onDetailsScreen={true}
            imageSrc={imageSrc}
          />
        </View>

        <REPText
          size={space.xs + 4}
          mt={space.sm}
          mb={space.xs}
          color={colors.grey}>
          Comments (1)
        </REPText>

        <View>
          <Comment anchor='Projects' renderPartial />
        </View>

        <REPText size={space.xs + 4} my={space.sm} color={colors.grey} italic>
          PS. Kindly, note that some of the data currently on the app are dummy
          and their features are not totally functional yet. We're still in
          development.
        </REPText>
      </REPAnimate>
    </ScrollView>
  );
};

export const ProjectDetails = memo(_ProjectDetails);
