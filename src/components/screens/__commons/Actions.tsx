import React, { FC, useCallback, memo, useState, useMemo } from 'react';
import { View, ImageSourcePropType } from 'react-native';

import {
  dispatch,
  displaySnackbar,
  displayActionSheet,
  displayModal
} from 'src/state';
import { eventsStyles, actionSheetOptionsStyles } from 'src/styles';
import { REPText } from 'src/components';
import { colors, space } from 'src/constants';
import { APIEventsResponse, APIProjectsResponse } from 'src/types';
import { Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const _Actions: FC<{
  event?: APIEventsResponse[0];
  project?: APIProjectsResponse[0];
  handleDisplayDetails?(): void;
  onDetailsScreen?: boolean;
  imageSrc?: ImageSourcePropType;
}> = ({ event: _event, handleDisplayDetails, imageSrc, onDetailsScreen }) => {
  const navigation = useNavigation();
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
  const event = useMemo(() => _event, []);
  const buttonSize = onDetailsScreen ? 27 : 20;
  const buttonLabelTextSize = onDetailsScreen ? 12 : 10;

  const handleLoveActionPress = useCallback(() => {
    setActions((prevActionsState) => ({
      ...prevActionsState,
      love: !prevActionsState.love
    }));

    if (actions.love) return;

    if (event) {
      dispatch(
        displaySnackbar({
          open: true,
          duration,
          message:
            'You love this event! ... (PS. This is a dummy and is still in development.) 😎'
        })
      );
    } else {
      dispatch(
        displayModal({
          open: true,
          title: 'Make a Pledge',
          children: [<REPText key='0'>Coming soon!</REPText>]
        })
      );
    }
  }, [actions.love, event]);

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
        message: `${
          event
            ? 'You will be attending this event!'
            : "Thank you for indicating to sponsor this project. You will be redirected to where you'll make payment (give)."
        } ... (PS. This is a dummy and is still under development.) 😎'`,
        severity: 'success'
      })
    );
  }, [actions.attend, event]);

  const handlePartnerActionPress = useCallback(() => {
    // if (actions.partner) {
    //   setActions((prevActionsState) => ({
    //     ...prevActionsState,
    //     partner: false
    //   }));
    //   return;
    // }

    const handlePartnershipTypePress = (
      partnershipType: 'pray' | 'give' | 'spread' | 'invite'
    ) => () => {
      let message = 'Thank you for showing interest in partnership. ';

      switch (partnershipType) {
        case 'pray':
          message +=
            'A link will be sent to your email which you can click to join the network of praying partners for the event.';
          break;
        case 'give':
          message +=
            'You will be redirected to where you will give (make payment) for the event.';
          break;
        case 'spread':
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

      if (partnershipType === 'invite') {
        navigation.navigate('EventInvite', { event, imageSrc });
      } else {
        dispatch(
          displaySnackbar({
            open: true,
            duration,
            message,
            severity: 'success'
          })
        );
      }
    };

    dispatch(
      displayActionSheet({
        open: true,
        title: 'How would you like to partner?',
        options: [
          <Button
            mode='text'
            onPress={handlePartnershipTypePress('pray')}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}
            key={'pray'}>
            <REPText color={colors.black} bold>
              PRAY
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handlePartnershipTypePress('give')}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}
            key={'give'}>
            <REPText color={colors.black} bold>
              GIVE
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handlePartnershipTypePress('spread')}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}
            key={'spread'}>
            <REPText color={colors.black} bold>
              SPREAD THE WORD
            </REPText>
          </Button>,
          <Button
            mode='text'
            onPress={handlePartnershipTypePress('invite')}
            style={actionSheetOptionsStyles.button}
            contentStyle={actionSheetOptionsStyles.buttonContent}
            key={'spread'}>
            <REPText color={colors.black} bold>
              INVITE SOMEONE
            </REPText>
          </Button>
        ]
      })
    );
  }, [actions.partner, event]);

  return (
    <View style={cardActionsStyle}>
      {event ? (
        <>
          <View style={eventsStyles.cardActionsButtonWrapper}>
            <IconButton
              icon={`heart${actions.love ? '' : '-outline'}`}
              size={buttonSize}
              animated
              color={actions.love ? colors.green : colors.grey}
              style={eventsStyles.cardActionsButton}
              onPress={handleLoveActionPress}
            />
            <REPText
              size={buttonLabelTextSize}
              color={actions.love ? colors.green : colors.grey}>
              5.1K
            </REPText>
          </View>

          <View style={eventsStyles.cardActionsButtonWrapper}>
            <IconButton
              icon={`account-check${actions.attend ? '' : '-outline'}`}
              size={buttonSize}
              animated
              color={actions.attend ? colors.green : colors.grey}
              style={eventsStyles.cardActionsButton}
              onPress={handleAttendActionPress}
            />
            <REPText
              size={buttonLabelTextSize}
              color={actions.attend ? colors.green : colors.grey}>
              2K
            </REPText>
          </View>

          <View style={eventsStyles.cardActionsButtonWrapper}>
            <IconButton
              icon='hand'
              size={buttonSize}
              animated
              color={actions.partner ? colors.green : colors.grey}
              style={eventsStyles.cardActionsButton}
              onPress={handlePartnerActionPress}
            />
            <REPText
              size={buttonLabelTextSize}
              color={actions.partner ? colors.green : colors.grey}>
              10K
            </REPText>
          </View>
        </>
      ) : (
        <>
          <View style={eventsStyles.cardActionsButtonWrapper}>
            <IconButton
              icon='hand-left'
              size={buttonSize}
              animated
              color={actions.love ? colors.purple : colors.grey}
              style={eventsStyles.cardActionsButton}
              onPress={handleLoveActionPress}
            />
            <REPText
              size={buttonLabelTextSize}
              color={actions.love ? colors.purple : colors.grey}>
              5.1K
            </REPText>
          </View>

          <View style={eventsStyles.cardActionsButtonWrapper}>
            <IconButton
              icon='cash'
              size={buttonSize}
              animated
              color={actions.attend ? colors.purple : colors.grey}
              style={eventsStyles.cardActionsButton}
              onPress={handleAttendActionPress}
            />
            <REPText
              size={buttonLabelTextSize}
              color={actions.attend ? colors.purple : colors.grey}>
              2K
            </REPText>
          </View>
        </>
      )}

      <View
        style={{
          ...eventsStyles.cardActionsButtonWrapper,
          marginLeft: 'auto'
        }}>
        <IconButton
          icon='comment-text-outline'
          size={buttonSize}
          animated
          color={colors.grey}
          style={eventsStyles.cardActionsButton}
          onPress={handleDisplayDetails}
        />
        <REPText size={buttonLabelTextSize}>57</REPText>
      </View>

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
