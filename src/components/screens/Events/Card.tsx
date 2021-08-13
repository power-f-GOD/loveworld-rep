import React, { FC, useCallback, memo } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

import { eventsStyles } from 'src/styles';
import { REPText, REPAnimate } from 'src/components';
import { space, colors } from 'src/constants';
import { APIEventsResponse, EventDetailsHandler } from 'src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MainInfo } from './MainInfo';
import { Actions } from './Actions';
import { SharedElement } from 'react-navigation-shared-element';
import { useRoute, useNavigation } from '@react-navigation/native';

const _Card: FC<
  { index: number; event: APIEventsResponse[0] } & EventDetailsHandler
> = ({ index: i, event, handleEventDetailsPress }) => {
  const navigation = useNavigation();
  const imageSrc: ImageSourcePropType = event.banner
    ? { uri: event.banner }
    : require('src/assets/green-leaves.png');

  const handleDisplayDetails = useCallback(
    () => navigation.navigate('EventDetails', { event, imageSrc }), // handleEventDetailsPress!(event, imageSrc),
    [navigation]
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
            </REPText>{' '}
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
          <MainInfo
            event={event}
            handleDisplayDetails={handleDisplayDetails}
            renderPartial
          />

          <Actions
            handleDisplayDetails={handleDisplayDetails}
            imageSrc={imageSrc}
            event={event}
          />
        </View>
      </View>
    </REPAnimate>
  );
};

export const Card = memo(_Card);
