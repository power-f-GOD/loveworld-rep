import React, { FC, memo } from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';

import { REPAnimate, REPText } from 'src/components';
import { MainInfo } from './MainInfo';
import { eventsStyles } from 'src/styles';
import { space, colors, fonts } from 'src/constants';
import { Actions } from './Actions';
import { SharedElement } from 'react-navigation-shared-element';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { APIEventsResponse } from 'src/types';

interface EventDetailsRouteProps {
  event: APIEventsResponse[0];
  imageSrc: ImageSourcePropType;
}

const _EventDetails: FC<{
  navigation: StackNavigationProp<
    {
      EventDetails: EventDetailsRouteProps;
    },
    'EventDetails'
  >;
  route: RouteProp<{ EventDetails: EventDetailsRouteProps }, 'EventDetails'>;
}> = ({ navigation, route }) => {
  const event = route.params?.event;
  const imageSrc = route?.params.imageSrc;

  if (!event) {
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
        contentStyle={{ paddingHorizontal: space.xs }}>
        <REPText size={fonts.h2.fontSize} mb={space.xs} bold>
          {event.title}
        </REPText>

        <MainInfo event={event} />

        <REPText
          // size={fonts.h2.fontSize}
          mt={space.xs}
          style={{ marginBottom: space.xxs }}>
          {event.details}
        </REPText>

        <SharedElement
          id={`event.${event._id}.banner`}
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

        <Actions event={event} onDetailsScreen={true} imageSrc={imageSrc} />

        <REPText size={space.xs + 4} my={space.sm} color={colors.grey}>
          Comments will appear below...
        </REPText>
      </REPAnimate>
    </View>
  );
};

export const EventDetails = memo(_EventDetails);
