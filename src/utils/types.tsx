export interface ApiClientDetails {
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
  dateOfBirth: string;
  addresses: BaseAddress[];
  defaultShippingAddress?: number;
  shippingAddresses: number[];
  defaultBillingAddress?: number;
  billingAddresses: number[];
}

export interface BaseAddress {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
}

export interface EmailCheck {
  emailDoesExist: boolean;
  message: string;
}

export interface ProductProjectionsQueryParameters {
  text: string | undefined;
  fuzzy: boolean | undefined;
  limit: number | undefined;
  offset: number | undefined;
  filter: string | string[] | undefined;
  sort: string | undefined;
  currency: Currency | undefined;
}

export interface Currency {
  currency: string;
  country: string;
}
