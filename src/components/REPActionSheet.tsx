import 'react-native-gesture-handler';
import React, { FC, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionSheetCustom as ActionSheet } from '@alessiocancian/react-native-actionsheet';

import { REPActionSheetProps } from 'src/types';
import { dispatch } from 'src/state/store';
import { displaySnackbar, displayActionSheet } from 'src/state/actions';
import { colors } from 'src/constants';

const _REPActionSheet: FC<{
  actionSheet: REPActionSheetProps;
}> = ({ actionSheet }) => {
  const { open, title, options, cancelIndex, destructiveIndex } = actionSheet;
  const actionSheetRef = useRef<ActionSheet | null>(null);

  useEffect(() => {
    if (actionSheetRef.current) {
      if (open) {
        actionSheetRef.current?.show();
      } else {
        (actionSheetRef.current as any)?.hide();
      }
    }
  }, [open]);

  return (
    <ActionSheet
      ref={(ref) => (actionSheetRef.current = ref)}
      title={title || ''}
      options={options || []}
      cancelButtonIndex={cancelIndex}
      destructiveButtonIndex={destructiveIndex}
      styles={{
        cancelButtonBox: {
          height: cancelIndex! > -1 ? 57 : 0
        }
      }}
      onPress={() => {
        dispatch(displayActionSheet({ open: false }));
      }}
    />
  );
};

export const REPActionSheet = connect(
  (state: { actionSheet: REPActionSheetProps }) => ({
    actionSheet: state.actionSheet
  })
)(_REPActionSheet);
