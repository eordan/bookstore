import {
  API_VIEW_CUSTOMERS_SCOPE,
  API_MANAGE_PROFILE_SCOPE,
  API_ADMIN_SCOPE,
  PROJECT_KEY,
  REGION,
} from '../../src/services/helpers/apiClientDetailsSetter';

describe('API_VIEW_CUSTOMERS_SCOPE constant', () => {
  it('should have a valid clientSecret', () => {
    expect(typeof API_VIEW_CUSTOMERS_SCOPE.clientSecret).toBe('string');
  });

  it('should have a valid clientId', () => {
    expect(typeof API_VIEW_CUSTOMERS_SCOPE.clientId).toBe('string');
  });

  it('should have a valid authUrl', () => {
    expect(typeof API_VIEW_CUSTOMERS_SCOPE.authUrl).toBe('string');
  });

  it('should have a valid apiUrl', () => {
    expect(typeof API_VIEW_CUSTOMERS_SCOPE.apiUrl).toBe('string');
  });

  it('should have a valid scopes', () => {
    expect(typeof API_VIEW_CUSTOMERS_SCOPE.scopes).toBe('string');
  });

  it('should have a valid region', () => {
    expect(typeof API_VIEW_CUSTOMERS_SCOPE.region).toBe('string');
  });
});

describe('API_MANAGE_PROFILE_SCOPE constant', () => {
  it('should have a valid clientSecret', () => {
    expect(typeof API_MANAGE_PROFILE_SCOPE.clientSecret).toBe('string');
  });

  it('should have a valid clientId', () => {
    expect(typeof API_MANAGE_PROFILE_SCOPE.clientId).toBe('string');
  });

  it('should have a valid authUrl', () => {
    expect(typeof API_MANAGE_PROFILE_SCOPE.authUrl).toBe('string');
  });

  it('should have a valid apiUrl', () => {
    expect(typeof API_MANAGE_PROFILE_SCOPE.apiUrl).toBe('string');
  });

  it('should have a valid scopes', () => {
    expect(typeof API_MANAGE_PROFILE_SCOPE.scopes).toBe('string');
  });

  it('should have a valid region', () => {
    expect(typeof API_MANAGE_PROFILE_SCOPE.region).toBe('string');
  });
});

describe('API_ADMIN_SCOPE constant', () => {
  it('should have a valid clientSecret', () => {
    expect(typeof API_ADMIN_SCOPE.clientSecret).toBe('string');
  });

  it('should have a valid clientId', () => {
    expect(typeof API_ADMIN_SCOPE.clientId).toBe('string');
  });

  it('should have a valid authUrl', () => {
    expect(typeof API_ADMIN_SCOPE.authUrl).toBe('string');
  });

  it('should have a valid apiUrl', () => {
    expect(typeof API_ADMIN_SCOPE.apiUrl).toBe('string');
  });

  it('should have a valid scopes', () => {
    expect(typeof API_ADMIN_SCOPE.scopes).toBe('string');
  });

  it('should have a valid region', () => {
    expect(typeof API_ADMIN_SCOPE.region).toBe('string');
  });
});

describe('PROJECT_KEY and REGION constants', () => {
  it('should have a valid PROJECT_KEY', () => {
    expect(typeof PROJECT_KEY).toBe('string');
  });

  it('should have a valid REGION', () => {
    expect(typeof REGION).toBe('string');
  });
});
