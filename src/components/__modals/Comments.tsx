import React, { FC, memo, useCallback } from 'react';
import { View, StyleProp, ViewStyle, FlatList } from 'react-native';

import { REPText } from 'src/components';
import { space, colors } from 'src/constants';
import { TextInput } from 'react-native-paper';
import { Comment } from '../shared';

export const _Comments: FC<{
  anchor: 'Events' | 'Projects';
  style?: StyleProp<ViewStyle>;
  renderPartial?: boolean;
}> = ({ anchor }) => {
  return (
    <View
      style={{
        paddingHorizontal: space.xs * 1.5,
        marginBottom: space.xs,
        height: '100%'
      }}>
      <REPText size={space.sm} mt={space.sm} mb={space.xs} color={colors.grey}>
        Comments (5)
      </REPText>

      <FlatList
        style={{ marginBottom: space.xs * 2, flex: 1 }}
        data={Array(5)
          .fill('')
          .map((_, i) => i)}
        renderItem={useCallback(
          () => (
            <Comment anchor={anchor} />
          ),
          []
        )}
        keyExtractor={useCallback((i) => i, [])}
        showsVerticalScrollIndicator={false}
      />

      <TextInput
        style={{
          fontSize: space.xs * 1.75,
          bottom: space.xs * 2,
          width: '100%',
          left: 0,
          maxHeight: 150,
          borderTopEndRadius: 0,
          borderTopStartRadius: 0,
          backgroundColor: colors.white
        }}
        multiline
        placeholder='Say something...'
      />
    </View>
  );
};

export const Comments = memo(_Comments);
