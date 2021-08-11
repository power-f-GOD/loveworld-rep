import React, { FC } from 'react';
import { Image, View } from 'react-native';

import { REPAnimate, REPText } from 'src/components';
import { MainInfo } from './MainInfo';
import { eventsStyles } from 'src/styles';
import { space, colors, fonts } from 'src/constants';
import { Actions } from './Actions';

export const EventDetails: FC<any> = ({ navigation, route }) => {
  const event = route.params.event;
  const imageSrc = route.params.imageSrc;

  return (
    <View
      style={{
        padding: space.xs,
        backgroundColor: colors.white
      }}>
      <REPAnimate magnitude={space.xs}>
        <REPText
          size={fonts.h3.fontSize}
          style={{ marginBottom: space.xs }}
          bold>
          {event.title}
        </REPText>

        <MainInfo event={event} />

        <View style={{ minHeight: 200, marginVertical: space.sm }}>
          <Image
            style={[
              eventsStyles.cardBanner,
              {
                width: '100%',
                height: '100%',
                borderRadius: space.xs
              }
            ]}
            source={imageSrc}
          />
        </View>

        <Actions event={event} onDetailsScreen={true} />

        <REPText size={space.xs + 4} color={colors.grey}>
          More info and actions would appear here...
        </REPText>
      </REPAnimate>
    </View>
  );
};
