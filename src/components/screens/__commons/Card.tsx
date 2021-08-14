import React, { FC, useCallback, memo } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

import { eventsStyles } from 'src/styles';
import { REPText, REPAnimate } from 'src/components';
import { space, colors } from 'src/constants';
import {
  APIEventsResponse,
  EventDetailsHandler,
  ProjectDetailsHandler,
  APIProjectsResponse
} from 'src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MainInfo } from './MainInfo';
import { Actions } from './Actions';
import { SharedElement } from 'react-navigation-shared-element';
import { useRoute, useNavigation } from '@react-navigation/native';

const _Card: FC<
  {
    index: number;
    event?: APIEventsResponse[0];
    project?: APIProjectsResponse[0];
  } & EventDetailsHandler &
    ProjectDetailsHandler
> = ({
  index: i,
  event,
  project,
  handleEventDetailsPress,
  handleProjectDetailsPress
}) => {
  // const navigation = useNavigation();
  const localImageUri = `src/assets/${
    event ? 'green-leaves.png' : 'money-seed.jpeg'
  }`;
  const imageSrc: ImageSourcePropType =
    event?.banner || project?.banner
      ? { uri: event?.banner || project?.banner }
      : event
      ? require('src/assets/green-leaves.png')
      : require('src/assets/money-seed.jpeg');

  // const handleDisplayDetails = useCallback(
  //   () => navigation.navigate('EventDetails', { event, imageSrc }), // handleEventDetailsPress!(event, imageSrc),
  //   [navigation]
  // );

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
            </REPText>{' '}
            {i === 0
              ? event
                ? 'partnered in giving'
                : 'gave'
              : i === 1
              ? event
                ? 'partners in prayer'
                : 'pledged'
              : 'will be attending'}
          </REPText>
        </View>
      )}

      <View style={eventsStyles.eventCard}>
        <TouchableOpacity
          onPress={
            handleEventDetailsPress
              ? handleEventDetailsPress(event!, imageSrc)
              : handleProjectDetailsPress
              ? handleProjectDetailsPress(project!, imageSrc)
              : undefined
          }
          style={eventsStyles.cardBannerWrapperTouchable}>
          <SharedElement
            id={
              event
                ? `event.${event._id}.banner`
                : `project.${project?._id}.banne`
            }
            style={eventsStyles.cardBannerWrapper}>
            <Image style={eventsStyles.cardBanner} source={imageSrc} />
          </SharedElement>
        </TouchableOpacity>

        <View style={eventsStyles.cardInfoWrapper}>
          <MainInfo
            event={event}
            project={project}
            handleDisplayDetails={
              event
                ? handleEventDetailsPress!(event!, imageSrc)
                : project
                ? handleProjectDetailsPress!(project!, imageSrc)
                : undefined
            }
            renderPartial
          />

          <Actions
            handleDisplayDetails={
              event
                ? handleEventDetailsPress!(event!, imageSrc)
                : project
                ? handleProjectDetailsPress!(project!, imageSrc)
                : undefined
            }
            imageSrc={imageSrc}
            event={event}
            project={project}
          />
        </View>
      </View>
    </REPAnimate>
  );
};

export const Card = memo(_Card);
