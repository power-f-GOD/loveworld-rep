import React, { FC, memo, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { eventsStyles } from 'src/styles';
import { REPText } from 'src/components/shared';
import { fonts, space, colors } from 'src/constants';
import { APIProjectsResponse } from 'src/types';
import { getDaysLeft } from 'src/utils';

export const _ProjectInfo: FC<{
  project: APIProjectsResponse[0];
  renderPartial?: boolean;
  style?: StyleProp<ViewStyle>;
  handleDisplayDetails?(): void;
}> = ({ project, renderPartial, style, handleDisplayDetails }) => {
  const daysLeft = getDaysLeft(project.date);
  const completion = Math.floor(Math.random() * 101);
  let completionColor = 'purple';

  switch (true) {
    case completion < 20:
      completionColor = colors.red;
      break;
    case completion < 40:
      completionColor = colors.orange;
      break;
    case completion < 60:
      completionColor = colors.yellow;
      break;
    case completion < 80:
      completionColor = colors.lime;
      break;
    case completion < 100:
      completionColor = colors.green;
      break;
    default:
      completionColor = colors.purple;
  }

  return (
    <View style={style}>
      {renderPartial && (
        <TouchableOpacity onPress={handleDisplayDetails}>
          <View style={{ flexDirection: 'row' }}>
            <REPText
              size={fonts.h4.fontSize}
              bold
              style={{ flex: 1, flexWrap: 'wrap' }}>
              {project.title}
            </REPText>
          </View>
        </TouchableOpacity>
      )}

      <View
        style={useMemo(() => ({ flexDirection: 'row', flexWrap: 'wrap' }), [])}>
        <View style={useMemo(() => ({ flexDirection: 'row' }), [])}>
          <MaterialIcons
            name='account-circle'
            color={colors.grey}
            style={eventsStyles.cardInfoIcon}
          />
          <REPText size={space.xs + 4} color={colors.grey} me={space.md}>
            {project.organization.name}
          </REPText>
        </View>

        {!renderPartial && (
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons
              name='timer-sand'
              color={colors.grey}
              style={eventsStyles.cardInfoIcon}
            />
            <REPText size={space.xs + 4} color={colors.grey} bold>
              {daysLeft >= 1 ? (
                <>
                  due in {daysLeft} day{daysLeft === 1 ? '' : 's'}
                </>
              ) : (
                <>due</>
              )}
            </REPText>
          </View>
        )}
      </View>

      <View>
        <View
          style={useMemo(
            () => ({
              backgroundColor: 'transparent',
              borderRadius: space.xs,
              borderWidth: 1,
              borderColor: '#ddd',
              height: 6,
              marginTop: space.xs
            }),
            []
          )}>
          <View
            style={useMemo(
              () => ({
                height: '100%',
                width: `${completion}%`,
                backgroundColor: completionColor,
                borderRadius: space.xs
              }),
              []
            )}
          />
        </View>
        <View
          style={useMemo(
            () => ({
              flexDirection: 'row',
              justifyContent: 'space-between'
            }),
            []
          )}>
          <REPText size={space.sm * 0.65}>Completion</REPText>
          <REPText size={space.sm * 0.65} bold>
            {completion}%
          </REPText>
        </View>
      </View>

      {
        <View
          style={{
            flexDirection: 'row',
            // flex: 1,
            flexWrap: 'wrap'
          }}
        />
      }
    </View>
  );
};

export const ProjectInfo = memo(_ProjectInfo);
