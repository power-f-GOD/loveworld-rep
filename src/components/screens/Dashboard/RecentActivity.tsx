import React, { FC, useMemo, memo } from 'react';
import { View } from 'react-native';

import { fonts, colors, space } from 'src/constants';
import { REPText } from 'src/components';

const _RecentActivity: FC<any> = () => {
  return (
    <>
      <REPText mt={space.sm} size={fonts.h4.fontSize} bold color='#444'>
        Recent Activity:
      </REPText>
      <View
        style={useMemo(
          () => ({
            height: space.xxl * 2,
            marginVertical: space.xs,
            backgroundColor: colors.white,
            borderRadius: space.xs,
            borderColor: '#ddd',
            borderWidth: 1,
            padding: space.sm,
            justifyContent: 'center',
            marginBottom: space.md
          }),
          []
        )}>
        <REPText alignment='center' color={colors.grey}>
          Your most recent activities will be shown here.
        </REPText>
      </View>
    </>
  );
};

export const RecentActivity = memo(_RecentActivity);
