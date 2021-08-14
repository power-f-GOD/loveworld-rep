import React, { FC, useCallback, memo } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { eventsStyles } from 'src/styles';
import { REPText, REPAnimate } from 'src/components/shared';
import { space, colors } from 'src/constants';
import { APIEventsResponse } from 'src/types';
import { EventInfo } from './Event.Info';
import { EventActions } from './Event.Actions';

const _EventCard: FC<{
  index: number;
  event: APIEventsResponse[0];
}> = ({ index: i, event }) => {
  const navigation = useNavigation();
  const imageSrc: ImageSourcePropType = event.banner
    ? { uri: event.banner }
    : require('src/assets/green-leaves.png');

  const handleDisplayDetails = useCallback(
    () => navigation.navigate('EventDetails', { event, imageSrc }),
    [event, imageSrc]
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
            {i === 0
              ? 'partnered in giving'
              : i === 1
              ? 'partners in prayer'
              : 'will be attending'}
          </REPText>
        </View>
      )}

      <View style={eventsStyles.eventCard}>
        <TouchableOpacity
          onPress={handleDisplayDetails}
          style={eventsStyles.cardBannerWrapperTouchable}>
          <SharedElement
            id={`event.${event._id}.banner`}
            style={eventsStyles.cardBannerWrapper}>
            <Image style={eventsStyles.cardBanner} source={imageSrc} />
          </SharedElement>
        </TouchableOpacity>

        <View style={eventsStyles.cardInfoWrapper}>
          <EventInfo
            event={event}
            handleDisplayDetails={handleDisplayDetails}
            renderPartial
          />

          <EventActions
            handleDisplayDetails={handleDisplayDetails}
            imageSrc={imageSrc}
            event={event}
          />
        </View>
      </View>
    </REPAnimate>
  );
};

export const EventCard = memo(_EventCard);
