import { APIEventsResponse, FetchState } from 'src/types';

export const EVENTS_FETCH = 'EVENTS_FETCH';

export const eventsState: FetchState<APIEventsResponse> = {
  status: 'settled',
  statusText: '',
  err: false,
  data: []
};
