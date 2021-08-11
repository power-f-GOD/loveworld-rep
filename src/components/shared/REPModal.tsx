import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Portal, Modal as M, Text, Searchbar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Modal, TouchableNativeFeedback, StyleSheet } from 'react-native';

import {
  AuthProps,
  REPSnackbarProps,
  REPModalProps,
  FetchState,
  APIOrgQueryResponse,
  HttpStatusProps
} from 'src/types';
import { dispatch } from 'src/state/store';
import { displayModal, fetchOrganizations } from 'src/state/actions';
import { colors, space, fonts } from 'src/constants';
import { REPAnimate } from './REPAnimate';
import { REPText } from './REPText';
import { ScrollView } from 'react-native-gesture-handler';

let searchTimeout: NodeJS.Timeout;

const _REPModal: FC<{
  modal: REPModalProps;
  searchStatus: HttpStatusProps['status'];
}> = ({ modal, searchStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleModalClose = useCallback(() => {
    dispatch(displayModal({ open: false }));
  }, []);

  const onChangeSearch = useCallback((keyword) => {
    clearTimeout(searchTimeout);
    setSearchQuery(keyword);
    searchTimeout = setTimeout(() => {
      dispatch(fetchOrganizations(keyword));
    }, 650);
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
          style={[
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
          ]}>
          {modal.title && (
            <REPText
              size={fonts.h3.fontSize}
              style={{ marginBottom: space.xs }}
              bold>
              {modal.title}
            </REPText>
          )}
          {/search|find/i.test(modal.title || '') && (
            <>
              <Searchbar
                placeholder='Enter keyword...'
                onChangeText={onChangeSearch}
                value={searchQuery}
                inputStyle={{
                  fontSize: 15
                }}
              />
              <REPText style={{ marginTop: 5, height: 20 }} color={colors.grey}>
                {searchStatus === 'pending'
                  ? 'Finding matching Churches...'
                  : ''}
              </REPText>
              {!modal.children?.length && (
                <View
                  style={{
                    marginBottom: 20,
                    marginTop: 15,
                    alignItems: 'center'
                  }}>
                  <MaterialIcons
                    name='book-open-page-variant'
                    color={colors.grey}
                    size={35}
                  />
                  {searchStatus === 'fulfilled' && (
                    <REPText
                      size={16}
                      style={{ marginTop: 10, textAlign: 'center' }}
                      color={colors.grey}>
                      Searched and found no matching Church.
                    </REPText>
                  )}
                </View>
              )}
            </>
          )}
          <ScrollView>
            <REPAnimate magnitude={10}>{modal.children}</REPAnimate>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export const REPModal = connect(
  (state: {
    auth: AuthProps;
    snackbar: REPSnackbarProps;
    modal: REPModalProps;
    organizations: FetchState<APIOrgQueryResponse>;
  }) => ({
    modal: state.modal,
    searchStatus: state.organizations.status
  })
)(_REPModal);

const S = StyleSheet.create({
  backDrop: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    opacity: 0.5,
    backgroundColor: colors.black
  },
  contentWrapper: {
    padding: space.sm,
    paddingTop: space.sm + 4,
    backgroundColor: colors.white,
    maxHeight: '100%',
    minHeight: 500,
    bottom: 0,
    width: '100%',
    position: 'absolute'
  }
});
