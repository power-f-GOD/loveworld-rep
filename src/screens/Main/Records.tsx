import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import { REPText } from 'src/components';
import { fonts } from 'src/constants';
import { mainStyles } from 'src/styles';

const _Records = () => {
  return (
    <ScrollView style={mainStyles.Tab}>
      <REPText>Coming soon!</REPText>
    </ScrollView>
  );
};

export const Records = memo(_Records);
