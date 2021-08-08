import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import { mainStyles } from 'src/styles';
import { REPText } from 'src/components';
import { fonts } from 'src/constants';

const _Projects = () => {
  return (
    <ScrollView style={mainStyles.Tab}>
      <REPText>Coming soon!</REPText>
    </ScrollView>
  );
};

export const Projects = memo(_Projects);
