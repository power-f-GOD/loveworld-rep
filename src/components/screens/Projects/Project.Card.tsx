import React, { FC, useCallback, memo } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ProjectInfo } from './Project.Info';
import { ProjectActions } from './Project.Actions';
import { REPText, REPAnimate } from '../../shared';
import { eventsStyles } from 'src/styles';
import { space, colors } from 'src/constants';
import { APIProjectsResponse } from 'src/types';

const _ProjectCard: FC<{
  index: number;
  project: APIProjectsResponse[0];
}> = ({ index: i, project }) => {
  const navigation = useNavigation();
  const imageSrc: ImageSourcePropType = project.banner
    ? { uri: project.banner }
    : require('src/assets/money-seed.jpeg');

  const handleDisplayDetails = useCallback(
    () => navigation.navigate('ProjectDetails', { project, imageSrc }),
    [project, imageSrc]
  );

  return (
    <REPAnimate key={i} magnitude={space.sm} delay={200 * i}>
      {!false && i < 3 && (
        <View style={eventsStyles.cardTopTextContainer}>
          <REPText size={10} color={colors.grey}>
            {i === 0 || i === 2 ? 'Bro. ' : ''}
            <REPText bold size={9.5} color={colors.grey}>
              {i === 0
                ? 'Godspower Inemesit Sunday'
                : i === 1
                ? 'The Thriving Church'
                : 'Emmanuel Sunday'}
            </REPText>
            {i === 0 ? ' gave' : ' pledged'}
          </REPText>
        </View>
      )}

      <View style={eventsStyles.eventCard}>
        <TouchableOpacity
          onPress={handleDisplayDetails}
          style={eventsStyles.cardBannerWrapperTouchable}>
          <SharedElement
            id={`project.${project?._id}.banner`}
            style={eventsStyles.cardBannerWrapper}>
            <Image style={eventsStyles.cardBanner} source={imageSrc} />
          </SharedElement>
        </TouchableOpacity>

        <View style={eventsStyles.cardInfoWrapper}>
          <ProjectInfo
            project={project}
            handleDisplayDetails={handleDisplayDetails}
            renderPartial
          />

          <ProjectActions
            handleDisplayDetails={handleDisplayDetails}
            // imageSrc={imageSrc}
            project={project}
          />
        </View>
      </View>
    </REPAnimate>
  );
};

export const ProjectCard = memo(_ProjectCard);
