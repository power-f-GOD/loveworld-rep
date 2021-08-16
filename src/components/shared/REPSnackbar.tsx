import 'react-native-gesture-handler';
import React, { FC, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from 'react-native-paper';

import { REPSnackbarProps } from 'src/types';
import { dispatch } from 'src/state/store';
import { displaySnackbar } from 'src/state/actions';
import { colors } from 'src/constants';

const _REPSnackbar: FC<{
  snackbar: REPSnackbarProps;
}> = ({ snackbar }) => {
  return (
    <Snackbar
      visible={!!snackbar.open}
      style={useMemo(
        () => ({
          backgroundColor: colors[snackbar.severity || 'info']
          // borderRadius: 0,
          // margin: 0
        }),
        [snackbar.severity]
      )}
      onDismiss={useCallback(() => {
        dispatch(displaySnackbar({ open: false }));
      }, [])}
      action={useMemo(
        () => ({
          label: snackbar.label || 'OK',
          labelStyle: { color: 'rgba(255, 255, 255, 0.75)' },
          onPress: () => {
            // Do something
          }
        }),
        []
      )}>
      {snackbar.message}
    </Snackbar>
  );
};

export const REPSnackbar = connect((state: { snackbar: REPSnackbarProps }) => ({
  snackbar: state.snackbar
}))(_REPSnackbar);
