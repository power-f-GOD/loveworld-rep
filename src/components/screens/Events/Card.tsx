import React, { FC, useCallback, memo } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

import { eventsStyles } from 'src/styles';
import { REPText, REPAnimate } from 'src/components';
import { space, colors } from 'src/constants';
import { APIEventsResponse, EventDetailsHandler } from 'src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MainInfo } from './MainInfo';
import { Actions } from './Actions';

const _Card: FC<
  { index: number; event: APIEventsResponse[0] } & EventDetailsHandler
> = ({ index: i, event, handleEventDetailsPress }) => {
  const imageSrc: ImageSourcePropType = event.banner
    ? { uri: event.banner }
    : require('src/assets/green-leaves.png');

  const handleDisplayDetails = useCallback(
    handleEventDetailsPress!(event, imageSrc),
    []
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
          <View style={eventsStyles.cardBannerWrapper}>
            <Image style={eventsStyles.cardBanner} source={imageSrc} />
          </View>
        </TouchableOpacity>

        <View style={eventsStyles.cardInfoWrapper}>
          <MainInfo
            event={event}
            handleDisplayDetails={handleDisplayDetails}
            renderPartial
          />

          <Actions handleDisplayDetails={handleDisplayDetails} />
        </View>
      </View>
    </REPAnimate>
  );
};

export const Card = memo(_Card);
