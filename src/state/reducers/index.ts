import { combineReducers } from 'redux';

import * as auth from './auth';
import * as app from './app';
import * as main from './main';

import { USER_SIGNOUT } from 'src/constants';
import { ActionProps } from 'src/types';

export default function reducers(state: any, action: ActionProps<any>) {
  if (action.type === USER_SIGNOUT) {
    state = {
      userData: state.userData
    }; // windowWidth: state.windowWidth };
  }

  return combineReducers({
    ...auth,
    ...app,
    ...main
  })(state, action);
}
