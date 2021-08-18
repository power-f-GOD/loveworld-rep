import 'react-native-gesture-handler';
import React, { FC, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { Portal } from 'react-native-paper';
import { View, Modal, TouchableNativeFeedback, StyleSheet } from 'react-native';

import { REPModalProps } from 'src/types';
import { dispatch } from 'src/state/store';
import { displayModal } from 'src/state/actions';
import { colors, space } from 'src/constants';
import { REPAnimate } from './REPAnimate';

const _REPModal: FC<{
  modal: REPModalProps;
}> = ({ modal }) => {
  const handleModalClose = useCallback(() => {
    dispatch(displayModal({ open: false }));
  }, []);

  return (
    <Portal>
      <Modal
        visible={!!modal.open}
        animationType={modal.fade ? 'fade' : 'slide'}
        transparent={true}
        presentationStyle='overFullScreen'
        onRequestClose={handleModalClose}>
        <TouchableNativeFeedback onPress={handleModalClose}>
          <View style={S.backDrop}></View>
        </TouchableNativeFeedback>

        <View
          style={useMemo(
            () => [
              S.contentWrapper,
              {
                height: modal.full ? '100%' : '87.5%',
                ...(!modal.full
                  ? {
                      borderTopStartRadius: space.sm,
                      borderTopEndRadius: space.sm
                    }
                  : {})
              }
            ],
            [modal.full]
          )}>
          <REPAnimate magnitude={10}>{modal.children}</REPAnimate>
        </View>
      </Modal>
    </Portal>
  );
};

export const REPModal = connect((state: { modal: REPModalProps }) => ({
  modal: state.modal
}))(_REPModal);

const S = StyleSheet.create({
  backDrop: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    opacity: 0.5,
    backgroundColor: colors.black
  },
  contentWrapper: {
    padding: 0,
    backgroundColor: colors.white,
    maxHeight: '100%',
    minHeight: 400,
    bottom: 0,
    width: '100%',
    position: 'absolute'
  }
});
