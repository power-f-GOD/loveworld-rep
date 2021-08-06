import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  Records: undefined;
  Events: undefined;
  Projects: undefined;
};

export type REPStackScreenProps<
  T = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, T & keyof RootStackParamList>;
