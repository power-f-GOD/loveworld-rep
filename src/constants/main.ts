import { APIEventsResponse, FetchState, APIProjectsResponse } from 'src/types';

export const EVENTS_FETCH = 'EVENTS_FETCH';
export const PROJECTS_FETCH = 'PROJECTS_FETCH';

export const eventsState: FetchState<APIEventsResponse> = {
  status: 'settled',
  statusText: '',
  err: false,
  data: []
};

export const projectsState: FetchState<APIProjectsResponse> = {
  status: 'settled',
  statusText: '',
  err: false,
  data: []
};
