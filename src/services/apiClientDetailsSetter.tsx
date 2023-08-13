import { ApiClientDetails } from '../../utils/types';

export const API_CLIENT_DETAILS: ApiClientDetails = {
  projectKey: process.env.REACT_APP_CTP_PROJECT_KEY as string,
  clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET as string,
  clientId: process.env.REACT_APP_CTP_CLIENT_ID as string,
  authUrl: process.env.REACT_APP_CTP_AUTH_URL as string,
  apiUrl: process.env.REACT_APP_CTP_API_URL as string,
  scopes: process.env.REACT_APP_CTP_SCOPES as string,
  region: process.env.REACT_APP_CTP_REGION as string,
};
