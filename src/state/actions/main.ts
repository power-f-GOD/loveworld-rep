import {
  ActionProps,
  FetchState,
  APIEventsResponse,
  APIProjectsResponse
} from 'src/types';
import { Http, logHttpError } from 'src/utils';
import { displaySnackbar } from './app';
import { EVENTS_FETCH, PROJECTS_FETCH } from 'src/constants/main';

export const fetchEvents = () => (dispatch: (arg: any) => {}) => {
  if (!Http.token) return;

  dispatch(events({ status: 'pending', err: false }));

  Http.get<APIEventsResponse>('/event/current', true)
    .then(({ data, message }) => {
      if (!data) {
        return dispatch(
          displaySnackbar({
            message: `Events: ${message}`,
            open: true,
            severity: 'info'
          })
        );
      }

      dispatch(events({ status: 'fulfilled', err: !data, data: data || [] }));
    })
    .catch(logHttpError(events));
};

export const events = (
  payload: FetchState<APIEventsResponse>
): ActionProps<FetchState<APIEventsResponse>> => {
  return {
    type: EVENTS_FETCH,
    payload
  };
};

export const fetchProjects = () => (dispatch: (arg: any) => {}) => {
  if (!Http.token) return;

  dispatch(projects({ status: 'pending', err: false }));

  Http.get<APIProjectsResponse>('/project/current', true)
    .then(({ data, message }) => {
      if (!data) {
        return dispatch(
          displaySnackbar({
            message: `Projects: ${message}`,
            open: true,
            severity: 'info'
          })
        );
      }

      dispatch(projects({ status: 'fulfilled', err: !data, data: data || [] }));
    })
    .catch(logHttpError(projects));
};

export const projects = (
  payload: FetchState<APIProjectsResponse>
): ActionProps<FetchState<APIProjectsResponse>> => {
  return {
    type: PROJECTS_FETCH,
    payload
  };
};
