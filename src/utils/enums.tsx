export enum RoutesEnum {
  MAIN_ROUTE = '/',
  LOGIN_ROUTE = '/login',
  REGISTRATION_ROUTE = '/registration',
  PROFILE_ROUTE = '/profile',
  ABOUT_ROUTE = '/about',
  PRODUCTS_ROUTE = '/products',
  CART_ROUTE = '/cart',
  PAGE_404 = '/*',
}

export enum ProfileActions {
  changeEmail = 'changeEmail',
  setFirstName = 'setFirstName',
  setLastName = 'setLastName',
  addAddress = 'addAddress',
  changeAddress = 'changeAddress',
  removeAddress = 'removeAddress',
  setDefaultShippingAddress = 'setDefaultShippingAddress',
  addShippingAddressId = 'addShippingAddressId',
  removeShippingAddressId = 'removeShippingAddressId',
  setDefaultBillingAddress = 'setDefaultBillingAddress',
  addBillingAddressId = 'addBillingAddressId',
  removeBillingAddressId = 'removeBillingAddressId',
  setDateOfBirth = 'setDateOfBirth',
}

export enum CartActions {
  addLineItem = 'addLineItem',
  removeLineItem = 'removeLineItem',
  addDiscountCode = 'addDiscountCode',
  removeDiscountCode = 'removeDiscountCode',
  addPayment = 'addPayment',
  removePayment = 'removePayment',
  changeTaxMode = 'changeTaxMode',
  setBillingAddress = 'setBillingAddress',
  setShippingAddress = 'setShippingAddress',
  recalculate = 'recalculate',
}

export enum LineItemActions {
  changeLineItemQuantity = 'changeLineItemQuantity',
}
