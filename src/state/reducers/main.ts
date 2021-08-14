import { EVENTS_FETCH, projectsState, PROJECTS_FETCH } from 'src/constants';
import {
  ActionProps,
  FetchState,
  APIEventsResponse,
  APIProjectsResponse
} from 'src/types';
import { eventsState } from 'src/constants';

export const events = (
  state: FetchState<APIEventsResponse> = eventsState,
  action: ActionProps<FetchState<APIEventsResponse>>
): FetchState<APIEventsResponse> => {
  return action.type === EVENTS_FETCH ? { ...state, ...action.payload } : state;
};

export const projects = (
  state: FetchState<APIProjectsResponse> = projectsState,
  action: ActionProps<FetchState<APIProjectsResponse>>
): FetchState<APIProjectsResponse> => {
  return action.type === PROJECTS_FETCH
    ? { ...state, ...action.payload }
    : state;
};
