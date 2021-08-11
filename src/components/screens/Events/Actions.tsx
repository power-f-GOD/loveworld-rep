import React, { FC, useCallback, memo, useState, useMemo } from 'react';
import { View } from 'react-native';

import { dispatch, displaySnackbar, displayActionSheet } from 'src/state';
import { eventsStyles, actionSheetOptionsStyles } from 'src/styles';
import { REPText } from 'src/components';
import { colors, space } from 'src/constants';
import { APIEventsResponse } from 'src/types';
import { Button, IconButton } from 'react-native-paper';

const _Actions: FC<{
  event?: APIEventsResponse[0];
  handleDisplayDetails?(): void;
  onDetailsScreen?: boolean;
}> = ({ handleDisplayDetails, onDetailsScreen }) => {
  const duration = 3000;
  const [actions, setActions] = useState({
    love: false,
    attend: false,
    partner: false
  });
  const cardActionsStyle = useMemo(
    () => ({
      ...eventsStyles.cardActions,
      ...(onDetailsScreen
        ? {
            paddingBottom: space.xs * 1.5,
            borderColor: '#eee',
            borderBottomWidth: 1,
            borderTopWidth: 0,
            marginTop: 0,
            paddingTop: 0
          }
        : {})
    }),
    [onDetailsScreen]
  );
  const buttonSize = onDetailsScreen ? 27 : 20;

  const handleLoveActionPress = useCallback(() => {
    setActions((prevActionsState) => ({
      ...prevActionsState,
      love: !prevActionsState.love
    }));

    if (actions.love) return;

    dispatch(
      displaySnackbar({
        open: true,
        duration,
        message:
          'You love this event! ... (PS. This is a dummy and is still in development.) 😎'
      })
    );
  }, [actions.love]);

  const handleAttendActionPress = useCallback(() => {
    setActions((prevActionsState) => ({
      ...prevActionsState,
      attend: !prevActionsState.attend
    }));

    if (actions.attend) return;

    dispatch(
      displaySnackbar({
        open: true,
        duration,
        message:
          'You will be attending this event! ... (PS. This is a dummy and is still under development.) 😎',
        severity: 'success'
      })
    );
  }, [actions.attend]);

  const handlePartnerActionPress = useCallback(() => {
    if (actions.partner) {
      setActions((prevActionsState) => ({
        ...prevActionsState,
        partner: false
      }));
      return;
    }

    const handlePartnershipTypePress = (
      type: 'praying' | 'giving' | 'spreading'
    ) => () => {
      let message = 'Thank you for showing interest in partnership. ';

      switch (type) {
        case 'praying':
          message +=
            'A link will be sent to your email which you can click to join the network of praying partners for the event.';
          break;
        case 'giving':
          message +=
            'You will be redirected to where you will give (make payment) for the event.';
          break;
        case 'spreading':
          message +=
            'A link will be sent to your email which you can share to friends and family for the event.';
          break;
      }

      message +=
        ' ... (PS. This is a dummy and is still under development. 😎)';
      setActions((prevActionsState) => ({
        ...prevActionsState,
        partner: true
      }));
      dispatch(displayActionSheet({ open: false }));
      dispatch(
        displaySnackbar({
          open: true,
          duration,
          message,
          severity: 'success'
        })
      );
    };

    dispatch(
      displayActionSheet({
        open: true,
        title: 'How would you like to partner?',
        options: [
          <Button
            mode='text'
            onPress={handlePartnershipTypePress('praying')}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}
            key={'praying'}>
            <REPText color={colors.black} bold>
              BY PRAYING
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handlePartnershipTypePress('giving')}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}
            key={'giving'}>
            <REPText color={colors.black} bold>
              BY GIVING
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handlePartnershipTypePress('spreading')}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}
            key={'spreading'}>
            <REPText color={colors.black} bold>
              SPREAD THE WORD
            </REPText>
          </Button>
        ]
      })
    );
  }, [actions.partner]);

  return (
    <View style={cardActionsStyle}>
      <IconButton
        icon={`heart${actions.love ? '' : '-outline'}`}
        size={buttonSize}
        animated
        color={actions.love ? colors.green : colors.grey}
        style={eventsStyles.cardActionsButton}
        onPress={handleLoveActionPress}
      />
      <IconButton
        icon={`account-check${actions.attend ? '' : '-outline'}`}
        size={buttonSize}
        animated
        color={actions.attend ? colors.green : colors.grey}
        style={eventsStyles.cardActionsButton}
        onPress={handleAttendActionPress}
      />
      <IconButton
        icon='hand-left'
        size={buttonSize}
        animated
        color={actions.partner ? colors.green : colors.grey}
        style={eventsStyles.cardActionsButton}
        onPress={handlePartnerActionPress}
      />

      <IconButton
        icon='comment-text-outline'
        size={buttonSize}
        animated
        color={colors.grey}
        style={{
          ...eventsStyles.cardActionsButton,
          marginLeft: 'auto'
        }}
        onPress={handleDisplayDetails}
      />
      {!onDetailsScreen && (
        <IconButton
          icon='information-outline'
          size={buttonSize}
          animated
          color={colors.grey}
          style={eventsStyles.cardActionsButton}
          onPress={handleDisplayDetails}
        />
      )}
    </View>
  );
};

export const Actions = memo(_Actions);
