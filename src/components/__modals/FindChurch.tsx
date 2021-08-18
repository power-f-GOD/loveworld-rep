import 'react-native-gesture-handler';
import React, { FC, useState, useCallback, useMemo, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Searchbar, List } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableNativeFeedback } from 'react-native';

import { FetchState, APIOrgQueryResponse } from 'src/types';
import { dispatch } from 'src/state/store';
import { displayModal, fetchOrganizations } from 'src/state/actions';
import { colors, space, fonts } from 'src/constants';
import { REPText, REPAnimate } from '../shared';

let searchTimeout: NodeJS.Timeout;

const _FindChurch: FC<{
  organizations: FetchState<APIOrgQueryResponse>;
  setOrg: Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
    }>
  >;
}> = ({ organizations: _orgs, setOrg }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: orgsData, status: searchStatus } = _orgs;

  const onChangeSearch = useCallback((keyword) => {
    clearTimeout(searchTimeout);
    setSearchQuery(keyword);
    searchTimeout = setTimeout(() => {
      dispatch(fetchOrganizations(keyword));
    }, 650);
  }, []);

  return (
    <View style={useMemo(() => ({ paddingHorizontal: space.xs * 1.5 }), [])}>
      <REPText size={fonts.h3.fontSize} mt={space.xs * 2} mb={space.xs} bold>
        Find your Church
      </REPText>

      <View>
        <Searchbar
          placeholder='Enter keyword...'
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={useMemo(() => ({ fontSize: 15 }), [])}
        />
        <REPText mt={5} color={colors.grey}>
          {searchStatus === 'pending' ? 'Finding matching Churches...' : ''}
        </REPText>
        {!orgsData?.length && (
          <View
            style={{
              marginBottom: 20,
              marginTop: 10,
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
      </View>

      <REPAnimate magnitude={10}>
        {orgsData?.map((org) => {
          const zone = org.org_directory.find((org) => org.office === 'zone');

          return (
            <TouchableNativeFeedback
              onPress={() => {
                dispatch(displayModal({ open: false }));
                setOrg({ name: org.name, id: org._id });
              }}
              key={org._id}>
              <View>
                <List.Item
                  title={org.name}
                  description={`Zone: ${zone?.name || '...'}`}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      style={{ margin: 0 }}
                      icon='map-marker'
                    />
                  )}></List.Item>
              </View>
            </TouchableNativeFeedback>
          );
        })}
      </REPAnimate>
    </View>
  );
};

export const FindChurch = connect(
  (state: { organizations: FetchState<APIOrgQueryResponse> }) => ({
    organizations: state.organizations
  })
)(_FindChurch);
