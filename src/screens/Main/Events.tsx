import React, { FC, useCallback } from 'react';
import {
  Image,
  FlatList,
  ListRenderItemInfo,
  ImageSourcePropType,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { dispatch, displayModal } from 'src/state';
import { eventsStyles } from 'src/styles';
import { REPText, REPAnimate } from 'src/components';
import { space, colors } from 'src/constants';
import { FetchState, APIEventsResponse, REPStackScreenProps } from 'src/types';
import { MainInfo, Card } from 'src/components/screens/Events';

const _Events: FC<
  { events: FetchState<APIEventsResponse> } & REPStackScreenProps<'Main'>
> = ({ events, navigation }) => {
  const { data: eventsData, status: eventsStatus } = events;

  const listKeyExtractor = useCallback((item) => item._id, []);

  const handleEventDetailsPress = useCallback(
    (event: APIEventsResponse[0], imageSrc: ImageSourcePropType) => () => {
      dispatch(
        displayModal({
          open: true,
          title: `Event: ${event.title}` as any,
          children: [
            <REPAnimate magnitude={space.xs} key='0'>
              <MainInfo event={event} />

              <Image
                style={[
                  eventsStyles.cardBanner,
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

  const handleRenderEvents = useCallback(
    ({ index: i, item: event }: ListRenderItemInfo<APIEventsResponse[0]>) => {
      return (
        <Card
          index={i}
          event={event}
          handleEventDetailsPress={handleEventDetailsPress}
        />
      );
    },
    [handleEventDetailsPress, navigation]
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
