import { EVENTS_FETCH } from 'src/constants';
import { ActionProps, FetchState, APIEventsResponse } from 'src/types';
import { eventsState } from 'src/constants';

export const events = (
  state: FetchState<APIEventsResponse> = eventsState,
  action: ActionProps<FetchState<APIEventsResponse>>
): FetchState<APIEventsResponse> => {
  return action.type === EVENTS_FETCH ? { ...state, ...action.payload } : state;
};
