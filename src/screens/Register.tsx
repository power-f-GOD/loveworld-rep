import React, { useEffect, useState, FC } from 'react';
import { View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { TextInput, List } from 'react-native-paper';

import {
  Logo,
  REPAnimate,
  REPTextInput,
  REPButton,
  REPText,
  REPLink
} from 'src/components';
import { colors, space } from 'src/constants';
import {
  REPStackScreenProps,
  FetchState,
  APIOrgQueryResponse,
  UserData
} from 'src/types';
import {
  dispatch,
  triggerRegister,
  displaySnackbar,
  displayModal
} from 'src/state';
import { authStyles } from 'src/styles';
import { connect } from 'react-redux';

const _Register: FC<
  REPStackScreenProps<'Register'> & {
    organizations: FetchState<APIOrgQueryResponse>;
    userData: UserData;
  }
> = ({ navigation, organizations: _orgs, userData }) => {
  const [full_name, setFullname] = useState(userData.full_name || '');
  const [email, setEmail] = useState(userData.email || '');
  const [password, setPassword] = useState(userData.password || '');
  const [org, setOrg] = useState({ name: '', id: '' });
  const { data: orgsData, status: orgsStatus } = _orgs;

  useEffect(() => {
    if (orgsStatus === 'fulfilled') {
      dispatch(
        displayModal({
          children: orgsData?.map((org) => {
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
          })
        })
      );
    }
  }, [orgsStatus, orgsData]);

  return (
    <View style={authStyles.Auth}>
      <Logo />

      <ScrollView showsVerticalScrollIndicator={false}>
        <REPAnimate noAnimate>
          <REPText style={authStyles.h1} size={24} bold>
            Register
          </REPText>
          <REPText>Welcome! Join your Church now.</REPText>

          <REPTextInput
            label='Full name'
            value={full_name}
            style={{ marginTop: 50 }}
            onChangeText={(text) => setFullname(text)}
          />

          <REPTextInput
            label='Email'
            value={email}
            style={{ marginTop: 35 }}
            onChangeText={(text) => setEmail(text)}
          />

          <REPTextInput
            label='Password'
            value={password}
            secureTextEntry={true}
            style={{ marginTop: 35 }}
            onChangeText={(text) => setPassword(text)}
          />

          <View style={{ marginTop: 20 }}>
            <TouchableNativeFeedback
              onPress={() => {
                dispatch(
                  displayModal({
                    open: true,
                    title: 'Find Church'
                  })
                );
              }}>
              <View>
                <TextInput
                  label='Church'
                  value={org.name}
                  pointerEvents='none'
                  disabled={true}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomColor: colors.black,
                    borderBottomWidth: 1
                  }}
                />
              </View>
            </TouchableNativeFeedback>
          </View>

          <REPButton
            style={{ marginTop: 50 }}
            onPress={() => {
              if (full_name && email && password && org.id) {
                return dispatch(
                  triggerRegister({
                    full_name,
                    email,
                    password,
                    organization: org.id
                  })
                );
              }

              dispatch(
                displaySnackbar({
                  open: true,
                  message: 'All fields are required.'
                })
              );
            }}>
            REGISTER
          </REPButton>

          <View style={authStyles.actionButtonRider}>
            <REPText>Already a member?</REPText>
            <REPLink
              bold
              style={{ marginStart: space.xxs }}
              onPress={() => navigation.navigate('Login' as any)}>
              Login here.
            </REPLink>
          </View>
        </REPAnimate>
      </ScrollView>
    </View>
  );
};

export const Register = connect(
  (state: {
    organizations: FetchState<APIOrgQueryResponse>;
    userData: UserData;
  }) => ({
    organizations: state.organizations,
    userData: state.userData
  })
)(_Register);
