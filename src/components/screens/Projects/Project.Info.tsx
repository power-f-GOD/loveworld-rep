import React, { FC, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { eventsStyles } from 'src/styles';
import { REPText } from '../../shared';
import { fonts, space, colors } from 'src/constants';
import { APIProjectsResponse } from 'src/types';

export const _ProjectInfo: FC<{
  project: APIProjectsResponse[0];
  renderPartial?: boolean;
  style?: StyleProp<ViewStyle>;
  handleDisplayDetails?(): void;
}> = ({ project, renderPartial, style, handleDisplayDetails }) => {
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

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons
          name='account-circle'
          color={colors.grey}
          style={eventsStyles.cardInfoIcon}
        />
        <REPText size={space.xs + 4} color={colors.grey}>
          {project.organization.name}
        </REPText>
      </View>

      <View>
        <View
          style={{
            backgroundColor: 'transparent',
            borderRadius: space.xs,
            borderWidth: 1,
            borderColor: '#ddd',
            height: 6,
            marginTop: space.xs
          }}>
          <View
            style={{
              height: '100%',
              width: `${completion}%`,
              backgroundColor: completionColor,
              borderRadius: space.xs
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
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
