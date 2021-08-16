import React, { FC, useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { REPText } from 'src/components';
import { EventCard } from 'src/components/screens';
import { FetchState, APIEventsResponse, REPStackScreenProps } from 'src/types';
import { space, colors } from 'src/constants';
import { eventsStyles } from 'src/styles';

const _Events: FC<
  { events: FetchState<APIEventsResponse> } & REPStackScreenProps<'Main'>
> = ({ events }) => {
  const {
    data: eventsData,
    status: eventsStatus,
    err: eventsErred,
    statusText: eventsStatusText
  } = events;

  const listKeyExtractor = useCallback((item) => item._id, []);

  const handleRenderEvents = useCallback(
    ({ index: i, item: event }: ListRenderItemInfo<APIEventsResponse[0]>) => {
      return <EventCard index={i} event={event} />;
    },
    []
  );

  return (
    <>
      {!eventsData?.length && (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {eventsStatus === 'pending' ? (
            <ActivityIndicator
              animating={eventsStatus === 'pending'}
              size={space.md}
              color={colors.purple}
            />
          ) : (
            <MaterialIcons
              name='folder-open-outline'
              color={colors.grey}
              size={space.md}
              style={eventsStyles.cardInfoIcon}
            />
          )}
          <REPText margin={space.xs} alignment='center'>
            {eventsStatus === 'pending'
              ? 'Fetching upcoming Events... Kindly wait a moment.'
              : eventsErred
              ? `Something went wrong: ${eventsStatusText || '...'}`
              : 'No upcoming Events at the moment.'}
          </REPText>
        </View>
      )}

      <FlatList
        data={eventsData}
        renderItem={handleRenderEvents}
        keyExtractor={listKeyExtractor}
      />
    </>
  );
};

export const Events = connect(
  (state: { events: FetchState<APIEventsResponse> }) => ({
    events: state.events
  })
)(_Events);
