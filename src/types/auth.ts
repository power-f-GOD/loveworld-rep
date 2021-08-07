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
    organization: string;
    updated_at: string;
  }>;
  access_token: string;
}

export type UserData = APIAuthResponse['user'] & { password?: string };

export type APIOrgQueryResponse = Array<{
  officials: string[];
  org_directory: Array<APIOrgQueryResponse>;
  _id: string;
  admin: string;
  office: string;
  name: string;
  __v: number;
}>;
