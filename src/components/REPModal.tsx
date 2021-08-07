import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Portal, Modal, Text, Searchbar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

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

  const onChangeSearch = useCallback((keyword) => {
    clearTimeout(searchTimeout);
    setSearchQuery(keyword);
    searchTimeout = setTimeout(() => {
      dispatch(fetchOrganizations(keyword));
    }, 750);
  }, []);

  return (
    <Portal>
      <Modal
        visible={!!modal.open}
        dismissable
        onDismiss={() => dispatch(displayModal({ open: false }))}
        style={{ padding: space.sm }}
        contentContainerStyle={{
          padding: space.sm + 5,
          backgroundColor: colors.white,
          borderRadius: space.xs,
          maxHeight: '80%'
        }}>
        <REPText
          size={fonts.h3.fontSize}
          style={{ marginBottom: space.xs }}
          bold>
          {modal.title || 'Modal'}
        </REPText>
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
            <REPText style={{ marginTop: 5, height: 20 }}>
              {searchStatus === 'pending' ? 'Finding Churches...' : ''}
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
                    style={{ marginTop: 10 }}
                    color={colors.grey}>
                    Searched and found no match.
                  </REPText>
                )}
              </View>
            )}
          </>
        )}
        <ScrollView>
          <REPAnimate magnitude={10}>{modal.children}</REPAnimate>
        </ScrollView>
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
