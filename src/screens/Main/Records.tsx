import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import { REPText } from 'src/components';
import { fonts } from 'src/constants';
import { mainStyles } from 'src/styles';

const _Records = () => {
  return (
    <ScrollView style={mainStyles.Tab}>
      <REPText
        style={[fonts.h1, { lineHeight: fonts.h1.fontSize + 5 }]}
        size={fonts.h1.fontSize}
        bold>
        Records
      </REPText>
      <REPText>Coming soon!</REPText>
    </ScrollView>
  );
};

export const Records = memo(_Records);
