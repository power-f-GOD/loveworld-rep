import React, { FC, memo, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { eventsStyles } from 'src/styles';
import { REPText } from 'src/components';
import { fonts, space, colors } from 'src/constants';
import { APIEventsResponse } from 'src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDaysLeft } from 'src/utils';

export const _EventInfo: FC<{
  event: APIEventsResponse[0];
  renderPartial?: boolean;
  style?: StyleProp<ViewStyle>;
  handleDisplayDetails?(): void;
}> = ({ event, renderPartial, style, handleDisplayDetails }) => {
  const daysLeft = getDaysLeft(event.date);

  return (
    <View style={style}>
      {renderPartial && (
        <TouchableOpacity onPress={handleDisplayDetails}>
          <View style={{ flexDirection: 'row' }}>
            <REPText
              size={fonts.h4.fontSize}
              bold
              style={{ flex: 1, flexWrap: 'wrap' }}>
              {event.title}
            </REPText>
          </View>
        </TouchableOpacity>
      )}

      <View style={useMemo(() => ({ flexDirection: 'row' }), [])}>
        <MaterialIcons
          name='map-marker'
          color={colors.grey}
          style={eventsStyles.cardInfoIcon}
        />
        <REPText size={space.xs + 4} color={colors.grey}>
          {event.organization.name}
        </REPText>
      </View>

      <View
        style={useMemo(
          () => ({
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderBottomColor: '#eee',
            ...(!renderPartial
              ? { borderBottomWidth: 1, paddingBottom: space.xs }
              : {})
          }),
          []
        )}>
        {!renderPartial && event && (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginRight: space.sm * 1.75
              }}>
              <MaterialIcons
                name='calendar'
                color={colors.grey}
                style={eventsStyles.cardInfoIcon}
              />
              <REPText size={space.xs + 4} color={colors.grey}>
                {new Date(event.date || Date.now()).toDateString()}
              </REPText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginRight: space.sm * 1.75
              }}>
              <MaterialIcons
                name='timer'
                color={colors.grey}
                style={eventsStyles.cardInfoIcon}
              />
              <REPText size={space.xs + 4} color={colors.grey}>
                {new Date(event.date || Date.now()).getHours()}
                :00
              </REPText>
            </View>
          </>
        )}

        <View style={useMemo(() => ({ flexDirection: 'row' }), [])}>
          <MaterialIcons
            name='timer-sand'
            color={colors.grey}
            style={eventsStyles.cardInfoIcon}
          />

          <REPText size={space.xs + 4} color={colors.grey} bold>
            {daysLeft >= 1 ? (
              <>
                {daysLeft === 1 ? 'a' : daysLeft} day
                {daysLeft === 1 ? '' : 's'} away
              </>
            ) : (
              <>
                {daysLeft === 0
                  ? 'today'
                  : 'happened on ' + new Date(event.date).toDateString()}
              </>
            )}
          </REPText>
        </View>
      </View>
    </View>
  );
};

export const EventInfo = memo(_EventInfo);
