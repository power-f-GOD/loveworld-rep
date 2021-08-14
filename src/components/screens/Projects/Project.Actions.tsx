import React, { FC, useCallback, memo, useState, useMemo } from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { IconButton } from 'react-native-paper';

import { dispatch, displaySnackbar, displayModal } from 'src/state';
import { eventsStyles } from 'src/styles';
import { REPText } from '../../shared';
import { colors, space } from 'src/constants';
import { APIProjectsResponse } from 'src/types';

const _ProjectActions: FC<{
  project?: APIProjectsResponse[0];
  handleDisplayDetails?(): void;
  onDetailsScreen?: boolean;
  imageSrc?: ImageSourcePropType;
}> = ({ project: _project, handleDisplayDetails, onDetailsScreen }) => {
  const duration = 3000;
  const [actions, setActions] = useState({
    pledge: false,
    give: false
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
  const project = useMemo(() => _project, []);
  const buttonSize = onDetailsScreen ? 27 : 20;
  const buttonLabelTextSize = onDetailsScreen ? 12 : 10;

  const handlePledgeActionPress = useCallback(() => {
    setActions((prevActionsState) => ({
      ...prevActionsState,
      pledge: !prevActionsState.pledge
    }));

    if (actions.pledge) return;

    dispatch(
      displayModal({
        open: true,
        title: 'Make a Pledge',
        children: [<REPText key='0'>Coming soon!</REPText>]
      })
    );
  }, [actions.pledge, project]);

  const handleGiveActionPress = useCallback(() => {
    setActions((prevActionsState) => ({
      ...prevActionsState,
      give: !prevActionsState.give
    }));

    if (actions.give) return;

    dispatch(
      displaySnackbar({
        open: true,
        duration,
        message:
          "Thank you for indicating to give for this project. You will be redirected to where you'll make payment (give). 😎 ... PS. This is a dummy and is still in development.",
        severity: 'success'
      })
    );
  }, [actions.give, project]);

  return (
    <View style={cardActionsStyle}>
      <View style={eventsStyles.cardActionsButtonWrapper}>
        <IconButton
          icon='hand-left'
          size={buttonSize}
          animated
          color={actions.pledge ? colors.purple : colors.grey}
          style={eventsStyles.cardActionsButton}
          onPress={handlePledgeActionPress}
        />
        <REPText
          size={buttonLabelTextSize}
          color={actions.pledge ? colors.purple : colors.grey}>
          234
        </REPText>
      </View>

      <View style={eventsStyles.cardActionsButtonWrapper}>
        <IconButton
          icon='cash'
          size={buttonSize}
          animated
          color={actions.give ? colors.purple : colors.grey}
          style={eventsStyles.cardActionsButton}
          onPress={handleGiveActionPress}
        />
        <REPText
          size={buttonLabelTextSize}
          color={actions.give ? colors.purple : colors.grey}>
          123
        </REPText>
      </View>

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

export const ProjectActions = memo(_ProjectActions);
