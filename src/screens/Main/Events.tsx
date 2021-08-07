import React, { FC, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { dispatch, displayModal } from 'src/state';
import { mainStyles } from 'src/styles';
import { REPText, REPAnimate } from 'src/components';
import { fonts, space, colors } from 'src/constants';
import { FetchState, APIEventsResponse } from 'src/types';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

const _Events: FC<{ events: FetchState<APIEventsResponse> }> = ({ events }) => {
  const { data: eventsData, status: eventsStatus } = events;

  const handleEventDetailsPress = useCallback(
    (event: APIEventsResponse[0], imageSrc: any) => () => {
      dispatch(
        displayModal({
          open: true,
          title: `Event: ${event.title}` as any,
          children: [
            <REPAnimate magnitude={space.xs} key='0'>
              <EventMainInfo event={event} />

              <Image
                style={[
                  S.banner,
                  {
                    width: '100%',
                    minHeight: 200,
                    marginVertical: space.sm
                  }
                ]}
                source={imageSrc}
              />

              <REPText size={space.xs + 4} color={colors.grey}>
                More info and actions would appear here...
              </REPText>
            </REPAnimate>
          ]
        })
      );
    },
    []
  );

  return (
    <ScrollView style={mainStyles.Tab}>
      <REPText
        style={[fonts.h1, { lineHeight: fonts.h1.fontSize + 5 }]}
        size={fonts.h1.fontSize}
        bold>
        Events
      </REPText>
      {!eventsData?.length && (
        <REPText>
          {eventsStatus === 'pending'
            ? 'Fetching current events... Please, wait a moment.'
            : 'No events at the moment.'}
        </REPText>
      )}
      {eventsData?.map((event, i) => {
        const imageSrc = event.banner
          ? { uri: event.banner }
          : require('src/assets/green-leaf.png');

        return (
          <REPAnimate
            key={i}
            magnitude={space.sm}
            delay={200 * i}
            style={{
              marginTop: space.xs
            }}>
            <View style={[S.eventCard, {}]}>
              <View
                style={[
                  {
                    width: space.xl,
                    borderRadius: space.xs,
                    borderColor: '#eee'
                  }
                ]}>
                <Image
                  style={[
                    S.banner,
                    {
                      borderRadius: space.xs,
                      width: '100%',
                      alignSelf: 'stretch'
                    }
                  ]}
                  source={imageSrc}
                />
              </View>

              <View style={{ marginLeft: space.xs + 2, flex: 1 }}>
                <EventMainInfo event={event} renderTitle />

                <Button
                  mode='outlined'
                  color={colors.green}
                  style={{ flex: 1, width: '100%', marginTop: 10 }}
                  contentStyle={{ width: '100%' }}
                  onPress={handleEventDetailsPress(event, imageSrc)}>
                  Details
                </Button>
              </View>
            </View>
          </REPAnimate>
        );
      })}
    </ScrollView>
  );
};

const EventMainInfo: FC<{
  event: APIEventsResponse[0];
  renderTitle?: boolean;
}> = ({ event, renderTitle }) => {
  return (
    <>
      {renderTitle && (
        <View style={{ flexDirection: 'row' }}>
          <REPText
            size={fonts.h4.fontSize}
            bold
            style={{ flex: 1, flexWrap: 'wrap' }}>
            {event.title}
          </REPText>
        </View>
      )}

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons name='map-marker' color={colors.grey} style={S.icon} />
        <REPText size={space.xs + 4} color={colors.grey}>
          {event.organization.name}
        </REPText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          flexWrap: 'wrap'
        }}>
        <View style={{ flexDirection: 'row', marginRight: space.sm }}>
          <MaterialIcons name='calendar' color={colors.grey} style={S.icon} />
          <REPText size={space.xs + 4} color={colors.grey}>
            {new Date(event.date).toDateString()}
          </REPText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name='timer' color={colors.grey} style={S.icon} />
          <REPText size={space.xs + 4} color={colors.grey}>
            {new Date(event.date).getHours()}:00
          </REPText>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons name='timer-sand' color={colors.grey} style={S.icon} />
        <REPText size={space.xs + 4} color={colors.grey} bold>
          {Math.floor((event.date - Date.now()) / (1000 * 60 * 60 * 24))} days
          away
        </REPText>
      </View>
    </>
  );
};

export const Events = connect(
  (state: { events: FetchState<APIEventsResponse> }) => ({
    events: state.events
  })
)(_Events);

const S = StyleSheet.create({
  eventCard: {
    padding: space.xs,
    borderRadius: space.xs,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: colors.white
  },
  banner: {
    // minWidth: space.xl,
    flex: 1,
    height: '100%',
    flexGrow: 1,
    maxWidth: '100%',
    borderRadius: space.xs,
    borderWidth: 1,
    borderColor: '#eee'
  },
  icon: { marginRight: 4, top: 2 }
});
