import { ApiClientDetails } from '../../utils/types';

// View Customers Scope
export const API_VIEW_CUSTOMERS_CLIENT_DETAILS: ApiClientDetails = {
  clientSecret: process.env.REACT_APP_VIEW_CUSTOMERS_CTP_CLIENT_SECRET as string,
  clientId: process.env.REACT_APP_VIEW_CUSTOMERS_CTP_CLIENT_ID as string,
  authUrl: process.env.REACT_APP_VIEW_CUSTOMERS_CTP_AUTH_URL as string,
  apiUrl: process.env.REACT_APP_VIEW_CUSTOMERS_CTP_API_URL as string,
  scopes: process.env.REACT_APP_VIEW_CUSTOMERS_CTP_SCOPES as string,
  region: process.env.REACT_APP_CTP_REGION as string,
};

// Manage My Profile Scope
export const API_MANAGE_MY_PROFILE_CLIENT_DETAILS: ApiClientDetails = {
  clientSecret: process.env.REACT_APP_MANAGE_MY_PROFILE_CTP_CLIENT_SECRET as string,
  clientId: process.env.REACT_APP_MANAGE_MY_PROFILE_CTP_CLIENT_ID as string,
  authUrl: process.env.REACT_APP_MANAGE_MY_PROFILE_CTP_AUTH_URL as string,
  apiUrl: process.env.REACT_APP_MANAGE_MY_PROFILE_CTP_API_URL as string,
  scopes: process.env.REACT_APP_MANAGE_MY_PROFILE_CTP_SCOPES as string,
  region: process.env.REACT_APP_CTP_REGION as string,
};

// Admin Scope
export const API_ADMIN_CLIENT_DETAILS: ApiClientDetails = {
  clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET as string,
  clientId: process.env.REACT_APP_CTP_CLIENT_ID as string,
  authUrl: process.env.REACT_APP_CTP_AUTH_URL as string,
  apiUrl: process.env.REACT_APP_CTP_API_URL as string,
  scopes: process.env.REACT_APP_CTP_SCOPES as string,
  region: process.env.REACT_APP_CTP_REGION as string,
};

export const PROJECT_KEY: string = process.env.REACT_APP_CTP_PROJECT_KEY as string;
