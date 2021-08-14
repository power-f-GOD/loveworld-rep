import React, { useEffect, useState, FC, useCallback } from 'react';
import { View, ScrollView, TouchableNativeFeedback } from 'react-native';
import { TextInput, List } from 'react-native-paper';

import {
  Logo,
  REPTextInput,
  REPButton,
  REPText,
  REPLink
} from 'src/components';
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
  const [full_name, setFullname] = useState('' || userData.full_name || '');
  const [email, setEmail] = useState('' || userData.email || '');
  const [password, setPassword] = useState('' || userData.password || '');
  const [org, setOrg] = useState({ name: '', id: '' });
  const { data: orgsData, status: orgsStatus } = _orgs;

  const handleChurchInputPress = useCallback(() => {
    dispatch(
      displayModal({
        open: true,
        title: 'Find your Church'
      })
    );
  }, []);

  const handleRegisterPress = useCallback(() => {
    if (full_name && email && password && org.id) {
      return dispatch(
        triggerRegister({
          full_name: full_name
            .split(' ')
            .map((name) => name[0].toUpperCase() + name.slice(1))
            .join(' '),
          email: email.toLowerCase(),
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
  }, [full_name, email, password, org.id]);

  const handleLoginHerePress = useCallback(() => {
    navigation.navigate('Login' as any);
  }, []);

  const handleFullNameChange = useCallback((text: string) => {
    setFullname(text);
  }, []);

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
  }, []);

  useEffect(() => {
    if (orgsStatus !== 'fulfilled') return void 0;

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
  }, [orgsStatus, orgsData]);

  return (
    <View style={authStyles.Auth}>
      <Logo />

      <ScrollView showsVerticalScrollIndicator={false}>
        <REPText style={authStyles.h1} size={24} bold>
          Register
        </REPText>
        <REPText>Welcome! Join your Church now.</REPText>

        <REPTextInput
          label='Full name'
          value={full_name}
          style={authStyles.inputFirstOfType}
          onChangeText={handleFullNameChange}
        />

        <REPTextInput
          label='Email'
          value={email}
          style={authStyles.input}
          onChangeText={handleEmailChange}
        />

        <REPTextInput
          label='Password'
          value={password}
          secureTextEntry={true}
          style={authStyles.input}
          onChangeText={handlePasswordChange}
        />

        <View style={authStyles.churchWrapper}>
          <TouchableNativeFeedback onPress={handleChurchInputPress}>
            <View>
              <TextInput
                label='Church'
                value={org.name}
                pointerEvents='none'
                disabled={true}
                style={authStyles.church}
              />
            </View>
          </TouchableNativeFeedback>
        </View>

        <REPButton
          style={authStyles.actionButton}
          onPress={handleRegisterPress}>
          REGISTER
        </REPButton>

        <View style={authStyles.actionButtonRider}>
          <REPText>Already a member?</REPText>
          <REPLink
            bold
            style={authStyles.actionButtonRiderLink}
            onPress={handleLoginHerePress}>
            Login here.
          </REPLink>
        </View>
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
