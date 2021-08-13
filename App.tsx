import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import store from './src/state/store';
import App from './src';
import { fonts, colors, space } from 'src/constants';

const styles = StyleSheet.create({
  app: {
    paddingTop: StatusBar.currentHeight,
    height: '100%',
    fontFamily: fonts.regular
  }
});

const theme: typeof DefaultTheme = {
  ...DefaultTheme,
  roundness: space.xs,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.black,
    accent: colors.green
  },
  fonts: {
    regular: {
      fontFamily: fonts.regular
    },
    medium: {
      fontFamily: fonts.regular
    },
    light: {
      fontFamily: fonts.regular
    },
    thin: {
      fontFamily: fonts.regular
    }
  }
};

export default () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <View style={styles.app}>
          <App />
        </View>
      </PaperProvider>
    </ReduxProvider>
  );
};
