import { APIOrgQueryResponse } from './auth';
import { ImageSourcePropType } from 'react-native';

export interface EventDetailsHandler {
  handleEventDetailsPress?(
    event: APIEventsResponse[0],
    imageSrc: ImageSourcePropType
  ): () => void;
}

export type APIEventsResponse = Array<{
  _id: string;
  date: number;
  title: string;
  details: string;
  banner: string;
  organization: APIOrgQueryResponse[0]['org_directory'][0];
  created_at: string;
  updated_at: string;
  __v: number;
  project: {
    _id: string;
    date: number;
    title: string;
    details: string;
    banner: string;
    organization: string;
    created_at: string;
    updated_at: string;
    __v: number;
    event: string;
  };
  form: {
    _id: string;
    points: {
      Name: {
        required: boolean;
        type: string;
      };
      Gender: {
        required: boolean;
        type: string;
        default: string;
        options: string[];
      };
    };
    created_at: string;
    updated_at: string;
    __v: number;
  };
}>;
