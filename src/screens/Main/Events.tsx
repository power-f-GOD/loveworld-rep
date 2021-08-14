import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { connect } from 'react-redux';

import { REPText } from 'src/components';
import { EventCard } from 'src/components/screens';
import { FetchState, APIEventsResponse, REPStackScreenProps } from 'src/types';

const _Events: FC<
  { events: FetchState<APIEventsResponse> } & REPStackScreenProps<'Main'>
> = ({ events }) => {
  const { data: eventsData, status: eventsStatus } = events;

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
        <REPText>
          {eventsStatus === 'pending'
            ? 'Fetching current events... Please, wait a moment.'
            : 'No events at the moment.'}
        </REPText>
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
