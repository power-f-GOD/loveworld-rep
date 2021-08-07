export interface RegisterProps {
  full_name: string;
  email: string;
  password: string;
  organization: string;
}

export interface SigninProps {
  email: string;
  password: string;
}

export interface APIAuthResponse {
  user: Partial<{
    _id: string;
    email: string;
    full_name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    created_at: string;
    organization: Partial<APIOrgQueryResponse[0]['org_directory'][0]>;
    updated_at: string;
  }>;
  access_token: string;
}

export type APIOrgQueryResponse = Array<{
  officials: string[];
  org_directory: Array<{
    officials: string[];
    org_directory: string[];
    _id: string;
    admin: string;
    office: 'zone' | 'group' | 'church';
    name: string;
    __v: number;
  }>;
  _id: string;
  admin: string;
  office: string;
  name: string;
  __v: number;
}>;
