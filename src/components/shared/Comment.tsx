import React, { FC, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { REPText } from 'src/components/shared';
import { space, colors } from 'src/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, IconButton } from 'react-native-paper';
import { dispatch, displayModal } from 'src/state';
import { Comments } from '../__modals/Comments';

export const _Comment: FC<{
  // event: APIEventsResponse[0];
  // renderPartial?: boolean;
  anchor: 'Events' | 'Projects';
  style?: StyleProp<ViewStyle>;
  renderPartial?: boolean;
}> = ({ anchor, renderPartial }) => {
  const Component = renderPartial ? TouchableOpacity : (View as any);

  return (
    <Component
      onPress={
        renderPartial
          ? () => {
              dispatch(
                displayModal({
                  open: true,
                  fade: true,
                  children: [<Comments anchor={anchor} key={'0'} />]
                })
              );
            }
          : undefined
      }>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: space.xs
        }}>
        {/* <View></View> */}
        <Avatar.Icon
          icon='account-circle'
          size={36}
          style={{
            borderTopEndRadius: 3,
            backgroundColor: '#eaeaea',
            marginEnd: space.xxs
          }}
        />
        <View
          style={{
            backgroundColor: '#f2f2f2',
            borderRadius: 18,
            borderTopStartRadius: 3,
            minHeight: 60,
            flex: 1,
            padding: space.xs * 1.125,
            paddingBottom: renderPartial ? undefined : space.xs * 0.95
          }}>
          <REPText size={space.xs * 1.4} bold color='#555'>
            Bro. Emmanuel Sunday
          </REPText>
          {!renderPartial && (
            <REPText size={space.xs * 1.25} color='#777'>
              2 minutes ago
            </REPText>
          )}
          <REPText size={space.xs * 1.55}>
            {anchor === 'Events'
              ? "Glory! It promises to be exciting and full of glory! I can't way! Hoof!"
              : 'This project is a success!'}
          </REPText>

          {!renderPartial && (
            <View
              style={{
                borderTopWidth: 1,
                marginTop: space.xs * 0.75,
                borderTopColor: '#e2e2e2',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <IconButton
                icon='heart-outline'
                color={colors.grey}
                size={space.sm * 0.85}
                style={{ marginBottom: 0 }}
              />
              <REPText
                size={space.xs * 1.4}
                me={space.md}
                mt={space.xs}
                color={colors.grey}>
                4
              </REPText>
              <IconButton
                icon='reply'
                color={colors.grey}
                size={space.sm * 0.85}
                style={{ marginBottom: 0 }}
              />
              <REPText
                size={space.xs * 1.4}
                me={space.md}
                mt={space.xs}
                color={colors.grey}>
                2
              </REPText>
            </View>
          )}
        </View>
      </View>
    </Component>
  );
};

export const Comment = memo(_Comment);
