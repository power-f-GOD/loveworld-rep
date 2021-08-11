import 'react-native-gesture-handler';
import React, { FC, useRef, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  ActionSheetCustom as ActionSheet,
  ActionSheetCustomProps
} from '@alessiocancian/react-native-actionsheet';

import { REPActionSheetProps } from 'src/types';
import { dispatch } from 'src/state/store';
import { displaySnackbar, displayActionSheet } from 'src/state/actions';
import { colors } from 'src/constants';
import { actionSheetOptionsStyles } from 'src/styles';

const _REPActionSheet: FC<{
  actionSheet: REPActionSheetProps;
}> = ({ actionSheet }) => {
  const { open, title, options, cancelIndex, destructiveIndex } = actionSheet;
  const actionSheetRef = useRef<ActionSheet | null>(null);
  const customStyles = useMemo(() => {
    return {
      cancelButtonBox: {
        height: cancelIndex! > -1 ? 57 : 0
      },
      titleBox: {
        ...actionSheetOptionsStyles.titleBox
      },
      buttonBox: {
        borderWidth: 0
      }
    };
  }, [cancelIndex]);

  const handleOnPress = useCallback(() => {
    dispatch(displayActionSheet({ open: false }));
  }, []);

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
      styles={customStyles}
      onPress={handleOnPress}
    />
  );
};

export const REPActionSheet = connect(
  (state: { actionSheet: REPActionSheetProps }) => ({
    actionSheet: state.actionSheet
  })
)(_REPActionSheet);
