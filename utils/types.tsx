export interface ApiClientDetails {
  readonly projectKey: string;
  readonly clientSecret: string;
  readonly clientId: string;
  readonly authUrl: string;
  readonly apiUrl: string;
  readonly scopes: string;
  readonly region: string;
}

export interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
