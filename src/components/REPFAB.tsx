import React, { FC, useEffect, useCallback, useMemo } from 'react';
import { FAB, Button } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { connect } from 'react-redux';
import { useAnimationState, MotiView } from 'moti';
import { StyleSheet } from 'react-native';

import { MainStackParamList, REPStackScreenProps, UserData } from 'src/types';
import { REPText } from './REPText';
import { REPAnimate } from './REPAnimate';
import { colors } from 'src/constants';
import { dispatch, displayModal, displayActionSheet } from 'src/state';

const _REPFAB: FC<{
  barColor: string;
  currentTabIsDash: boolean;
  is_admin: boolean;
  currentTab: keyof MainStackParamList;
}> = ({ barColor, currentTabIsDash, is_admin, currentTab }) => {
  const FABAnimState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0
    },
    to: {
      opacity: 1,
      scale: 1
    }
  });
  const FABTransition = useMemo(() => {
    return { type: 'spring', duration: 250 };
  }, []);
  const FABStyle = useMemo(() => {
    return {
      backgroundColor: barColor
    };
  }, [barColor]);

  const handleActionPress = useCallback(
    (action: string) => {
      dispatch(displayActionSheet({ open: false }));
      dispatch(
        displayModal({
          open: true,
          title:
            action?.replace('a new ', '') ||
            (`${
              currentTab === 'Records' ? 'Add' : 'Create'
            } ${currentTab.replace(/s$/, '')}` as any),
          children: [
            <REPAnimate magnitude={0} key={0}>
              <REPText>COMING SOON!</REPText>
            </REPAnimate>
          ]
        })
      );
    },
    [currentTab]
  );

  const handleSetTargetPress = useCallback(() => {
    handleActionPress('Create a new Target');
  }, [handleActionPress]);

  const handleAddRecordPress = useCallback(() => {
    handleActionPress('Add a new Record');
  }, [handleActionPress]);

  const handleFABPress = useCallback(() => {
    dispatch(
      displayActionSheet({
        open: true,
        options: [
          <Button
            mode='text'
            onPress={handleSetTargetPress}
            style={{ width: '100%' }}
            contentStyle={{ height: '100%' }}>
            <REPText color={colors.black} bold>
              Set a new Target
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handleAddRecordPress}
            style={{ width: '100%' }}
            contentStyle={{ height: '100%' }}>
            <REPText color={colors.black} bold>
              Add a new Record
            </REPText>
          </Button>
        ],
        title: 'What would you like to do?'
      })
    );
  }, []);

  useEffect(() => {
    FABAnimState.transitionTo(
      currentTabIsDash || (!is_admin && currentTab !== 'Records')
        ? 'from'
        : 'to'
    );
  }, [currentTab, currentTabIsDash, is_admin]);

  return (
    <MotiView
      state={FABAnimState}
      pointerEvents={currentTabIsDash ? 'none' : undefined}
      style={S.FABWrapper}
      transition={FABTransition as any}>
      <FAB style={FABStyle} icon='plus' onPress={handleFABPress} />
    </MotiView>
  );
};

const S = StyleSheet.create({
  FABWrapper: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50
  }
});

export const REPFAB = connect(() => ({
  // userData: state.userData
}))(_REPFAB);
