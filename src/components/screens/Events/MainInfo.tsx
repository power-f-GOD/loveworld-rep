import React, { FC, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { eventsStyles } from 'src/styles';
import { REPText } from 'src/components';
import { fonts, space, colors } from 'src/constants';
import { APIEventsResponse } from 'src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const _MainInfo: FC<{
  event: APIEventsResponse[0];
  renderPartial?: boolean;
  style?: StyleProp<ViewStyle>;
  handleDisplayDetails?(): void;
}> = ({ event, renderPartial, style, handleDisplayDetails }) => {
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

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons
          name='map-marker'
          color={colors.grey}
          style={eventsStyles.cardInfoIcon}
        />
        <REPText size={space.xs + 4} color={colors.grey}>
          {event.organization.name}
        </REPText>
      </View>

      {
        <View
          style={{
            flexDirection: 'row',
            // flex: 1,
            flexWrap: 'wrap'
          }}>
          {!renderPartial && (
            <>
              <View
                style={{ flexDirection: 'row', marginRight: space.sm * 1.75 }}>
                <MaterialIcons
                  name='calendar'
                  color={colors.grey}
                  style={eventsStyles.cardInfoIcon}
                />
                <REPText size={space.xs + 4} color={colors.grey}>
                  {new Date(event.date).toDateString()}
                </REPText>
              </View>
              <View
                style={{ flexDirection: 'row', marginRight: space.sm * 1.75 }}>
                <MaterialIcons
                  name='timer'
                  color={colors.grey}
                  style={eventsStyles.cardInfoIcon}
                />
                <REPText size={space.xs + 4} color={colors.grey}>
                  {new Date(event.date).getHours()}:00
                </REPText>
              </View>
            </>
          )}
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons
              name='timer-sand'
              color={colors.grey}
              style={eventsStyles.cardInfoIcon}
            />
            <REPText size={space.xs + 4} color={colors.grey} bold>
              {Math.floor((event.date - Date.now()) / (1000 * 60 * 60 * 24))}{' '}
              days away
            </REPText>
          </View>
        </View>
      }
    </View>
  );
};

export const MainInfo = memo(_MainInfo);
