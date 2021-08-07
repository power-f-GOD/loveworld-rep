import React, { memo, FC, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { dispatch, triggerSignout, displayModal } from 'src/state';
import { mainStyles } from 'src/styles';
import { REPText, REPAnimate } from 'src/components';
import { fonts, space, colors } from 'src/constants';
import { FetchState, APIEventsResponse } from 'src/types';
import { connect } from 'react-redux';
import { fetchEvents } from 'src/state';
import { Button } from 'react-native-paper';

const _Events: FC<{ events: FetchState<APIEventsResponse> }> = ({ events }) => {
  const { data: eventsData, status: eventsStatus } = events;

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
              <Image
                style={[
                  S.banner,
                  {
                    borderRadius: space.xs,
                    maxHeight: 100,
                    alignSelf: 'stretch'
                  }
                ]}
                source={imageSrc}
              />

              <View style={{ marginLeft: space.xs + 2 }}>
                <View style={{ flexDirection: 'row' }}>
                  <REPText
                    size={fonts.h4.fontSize}
                    bold
                    style={{ flex: 1, flexWrap: 'wrap' }}>
                    {event.title}
                  </REPText>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcons
                    name='map-marker'
                    color={colors.grey}
                    style={S.icon}
                  />
                  <REPText size={space.xs + 4} color={colors.grey}>
                    {event.organization.name}
                  </REPText>
                </View>

                <Button
                  mode='outlined'
                  color={colors.green}
                  style={{ flex: 1, width: '100%', marginTop: 10 }}
                  contentStyle={{ width: '100%' }}
                  onPress={() =>
                    dispatch(
                      displayModal({
                        open: true,
                        title: `Event: ${event.title}` as any,
                        children: [
                          <REPAnimate magnitude={space.xs} key='0'>
                            <View style={{ flexDirection: 'row' }}>
                              <MaterialIcons
                                name='map-marker'
                                color={colors.grey}
                                style={S.icon}
                              />
                              <REPText size={space.xs + 4} color={colors.grey}>
                                {event.organization.name}
                              </REPText>
                            </View>

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
                    )
                  }>
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
    minWidth: space.xl,
    flex: 0.25,
    borderRadius: space.xs,
    borderWidth: 1,
    borderColor: '#eee'
  },
  icon: { marginRight: 4, top: 2 }
});
