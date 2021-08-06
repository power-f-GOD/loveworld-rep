import { combineReducers } from 'redux';

import * as auth from './auth';
// import * as profile from './profile';
// import * as notifications from './notifications';

import { USER_SIGNOUT } from 'src/constants';
import { ActionProps } from 'src/types';

export default function reducers(state: any, action: ActionProps<any>) {
  // if (action.type === USER_SIGNOUT) {
  //   state = { windowWidth: state.windowWidth };
  // }

  return combineReducers({
    ...auth
    // ...profile,
    // ...notifications
  })(state, action);
}
