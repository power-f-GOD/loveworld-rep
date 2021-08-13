import React, { FC, memo } from 'react';
import { Image, View, ImageSourcePropType, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { REPAnimate, REPText } from 'src/components';
import { MainInfo } from './MainInfo';
import { eventsStyles } from 'src/styles';
import { space, colors, fonts } from 'src/constants';
import { Actions } from './Actions';
import { SharedElement } from 'react-navigation-shared-element';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { APIEventsResponse } from 'src/types';
import { TextInput, Button } from 'react-native-paper';
import { REPButton } from 'src/components/shared';
import { displaySnackbar, dispatch } from 'src/state';

interface EventInviteRouteProps {
  event: APIEventsResponse[0];
  imageSrc: ImageSourcePropType;
}

const _EventInvite: FC<{
  navigation: StackNavigationProp<
    {
      EventInvite: EventInviteRouteProps;
    },
    'EventInvite'
  >;
  route: RouteProp<{ EventInvite: EventInviteRouteProps }, 'EventInvite'>;
}> = ({ navigation, route }) => {
  const event = route.params?.event;
  const imageSrc = route?.params.imageSrc;

  if (!event) {
    return null;
  }

  return (
    <ScrollView
      style={{
        paddingBottom: space.xs * 1.5,
        backgroundColor: colors.white,
        height: '100%'
      }}>
      <SharedElement
        id={`event.${event._id}.banner`}
        style={{
          height: 110,
          marginBottom: space.xs * 1.5,
          paddingHorizontal: 0,
          justifyContent: 'flex-end'
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            zIndex: 1,
            position: 'absolute',
            top: 0,
            backgroundColor: colors.green,
            opacity: 0.4
          }}
        />
        <Image
          style={[
            eventsStyles.cardBanner,
            {
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0
            }
          ]}
          source={imageSrc}
        />
        <REPText
          style={{
            zIndex: 2,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            elevation: 1,
            textShadowRadius: 2,
            textShadowOffset: { width: 0.5, height: 0.5 }
          }}
          size={fonts.h2.fontSize}
          mx={space.sm * 0.75}
          mb={space.xs}
          bold
          color={colors.white}>
          {event.title}
        </REPText>
      </SharedElement>

      <View style={{ paddingHorizontal: space.sm }}>
        <REPText
          // size={fonts.h2.fontSize}
          my={space.xs}
          style={{ marginBottom: space.xxs }}
          size={space.sm * 0.75}>
          {event.details}
        </REPText>

        {Object.keys(event.form?.points || {}).map((field) => (
          <TextInput
            label={field}
            style={{
              fontSize: space.sm,
              marginBottom: space.xs,
              backgroundColor: 'transparent'
            }}
            key={field}
            keyboardType={
              (event.form.points as any)[field].type === 'number'
                ? 'number-pad'
                : 'ascii-capable'
            }
          />
        ))}

        {!event.form ? (
          <View
            style={{
              marginVertical: space.lg,
              paddingHorizontal: space.md,
              alignItems: 'center'
            }}>
            <MaterialIcons
              name='folder-open-outline'
              color={colors.grey}
              size={space.lg}
              style={eventsStyles.cardInfoIcon}
            />

            <REPText alignment='center' mt={space.sm} color={colors.grey}>
              There is no data/invite form for this Event.
            </REPText>
            <REPText alignment='center' color={colors.grey}>
              Kindly reach out to the OP [original poster] of this Event so they
              might add one.
            </REPText>
          </View>
        ) : (
          <Button
            color={colors.green}
            style={{ marginTop: space.md }}
            mode='contained'
            onPress={() =>
              dispatch(
                displaySnackbar({
                  open: true,
                  message:
                    'Form submitted. ✅ ... PS. This is a dummy and is still under development.',
                  severity: 'success'
                })
              )
            }>
            Submit
            <MaterialIcons
              name='send'
              color={colors.white}
              size={space.sm}
              style={{ ...eventsStyles.cardInfoIcon, marginStart: 5 }}
            />
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

export const EventInvite = memo(_EventInvite);
