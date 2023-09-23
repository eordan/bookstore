export type StringUndefined = string | undefined;

export type NumberUndefined = number | undefined;

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
  text: StringUndefined;
  fuzzy: boolean | undefined;
  limit: NumberUndefined;
  offset: NumberUndefined;
  filter: string[] | StringUndefined;
  sort: StringUndefined;
  currency: Currency | undefined;
}

export interface Currency {
  currency: string;
  country: string;
}

export interface Breadcrumb {
  target: HTMLInputElement;
  name: string;
  attributesArray: string[];
  handler: (target: HTMLInputElement) => void;
}
