import React, { FC, useEffect, useCallback, useMemo, memo } from 'react';
import { FAB, Button } from 'react-native-paper';
import { useAnimationState, MotiView } from 'moti';
import { StyleSheet } from 'react-native';

import { MainStackParamList } from 'src/types';
import { REPText } from './REPText';
import { REPAnimate } from './REPAnimate';
import { colors } from 'src/constants';
import { dispatch, displayModal, displayActionSheet } from 'src/state';
import { actionSheetOptionsStyles } from 'src/styles';

const _REPFAB: FC<{
  barColor: string;
  currentTabIsDash: boolean;
  is_admin: boolean;
  currentTab: keyof MainStackParamList;
}> = ({ barColor, currentTabIsDash, is_admin, currentTab }) => {
  const canActivateFAB = !(
    currentTabIsDash ||
    (!is_admin && currentTab !== 'Records')
  );
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

  const handleActionPress = useCallback(
    (action: string) => {
      dispatch(displayActionSheet({ open: false }));
      dispatch(
        displayModal({
          open: true,
          title:
            action ||
            (`${
              currentTab === 'Records' ? 'Add a new' : 'Set a'
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
    handleActionPress('Set a new Target');
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
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}>
            <REPText color={colors.black} bold>
              Set a new Target
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handleAddRecordPress}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}>
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
    FABAnimState.transitionTo(canActivateFAB ? 'to' : 'from');
  }, [canActivateFAB]);

  return (
    <MotiView
      state={FABAnimState}
      pointerEvents={canActivateFAB ? undefined : 'none'}
      style={S.FABWrapper}
      transition={
        useMemo(() => {
          return { type: 'spring', duration: 250 };
        }, []) as any
      }>
      <FAB
        style={useMemo(() => {
          return {
            backgroundColor: barColor
          };
        }, [barColor])}
        icon='plus'
        onPress={canActivateFAB ? handleFABPress : undefined}
      />
    </MotiView>
  );
};

const S = StyleSheet.create({
  FABWrapper: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 55
  }
});

export const REPFAB = memo(_REPFAB);
