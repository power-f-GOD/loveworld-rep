import React, { FC, memo, useMemo } from 'react';
import { Image, ImageSourcePropType, ScrollView } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { REPAnimate, REPText } from 'src/components/shared';
import { EventInfo, EventActions } from 'src/components/screens/Events';
import { eventsStyles } from 'src/styles';
import { space, colors, fonts } from 'src/constants';
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
}> = ({ route }) => {
  const event = route.params?.event;
  const imageSrc = route?.params.imageSrc;

  // if (!event) {
  //   return null;
  // }

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
          {event.title}
        </REPText>

        <EventInfo event={event} />

        <REPText
          // size={fonts.h2.fontSize}
          mt={space.xs}
          style={useMemo(() => ({ marginBottom: space.xxs }), [])}>
          {event.details}
        </REPText>

        <SharedElement
          id={`event.${event._id}.banner`}
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

        <EventActions
          event={event}
          onDetailsScreen={true}
          imageSrc={imageSrc}
        />

        <REPText size={space.xs + 4} my={space.sm} color={colors.grey}>
          Comments will appear below...
        </REPText>

        <REPText size={space.xs + 4} my={space.sm} color={colors.grey} italic>
          PS. Kindly, note that some of the data currently on the app are dummy
          and their features are not totally functional yet. We're still in
          development.
        </REPText>
      </REPAnimate>
    </ScrollView>
  );
};

export const EventDetails = memo(_EventDetails);
